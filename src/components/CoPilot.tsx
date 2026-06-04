import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Recipe, RecipeStep, CookingSession } from "../types";
import { 
  ChevronLeft, ChevronRight, CheckSquare, Square, Check, 
  Volume2, VolumeX, RefreshCw, ChefHat, Sparkles, AlertCircle, 
  ArrowLeft, Eye, Activity, Play, Pause, RotateCcw, Plus, Clock, 
  Sliders, Award, X
} from "lucide-react";

interface CoPilotProps {
  recipe: Recipe;
  onExit: () => void;
  onCookFinalize: (session: CookingSession) => void;
}

interface ManualTimer {
  id: string;
  label: string;
  duration: number; // original duration
  secondsLeft: number;
  isRunning: boolean;
}

export default function CoPilot({ recipe, onExit, onCookFinalize }: CoPilotProps) {
  const [currentPage, setCurrentPage] = useState<"overview" | "cooking">("overview");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(recipe.steps.length).fill(false)
  );
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Gamified point indicator systems
  const [floatingXPs, setFloatingXPs] = useState<Array<{ id: number; text: string; left: number; top: number }>>([]);
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: number; top: number; size: number; delay: number }>>([]);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    setTransitionKey(prev => prev + 1);
  }, [activeStepIndex]);

  const triggerConfettiExplosion = () => {
    const colors = ["#F1C40F", "#E67E22", "#E74C3C", "#9B59B6", "#3498DB", "#2ECC71"];
    const items = Array.from({ length: 40 }).map((_, i) => ({
      id: Math.random() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: 10 + Math.random() * 80, 
      top: 10 + Math.random() * 80, 
      size: 8 + Math.random() * 12,
      delay: Math.random() * 0.4
    }));
    setConfetti(items);
    setTimeout(() => {
      setConfetti([]);
    }, 4000);
  };

  const playPerfectStepSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15); 
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch { /* ignored */ }
  };

  // Ingredient checkbox tracking per step
  const [stepIngredientsChecked, setStepIngredientsChecked] = useState<Record<string, boolean>>({});

  // TTS speaker state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Active cooking timer state (main step timer)
  const [stepSecondsLeft, setStepSecondsLeft] = useState(0);
  const [isStepTimerRunning, setIsStepTimerRunning] = useState(false);
  const mainTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manual extra side-timers list
  const [sideTimers, setSideTimers] = useState<ManualTimer[]>([]);
  const [newTimerLabel, setNewTimerLabel] = useState("");
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  const sideTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Session tracking statistics for XP calculation
  const [sessionStartTime] = useState<number>(Date.now());
  const [pausedCount, setPausedCount] = useState(0);
  const [redosCount, setRedosCount] = useState(0);
  const [timerAdjusted, setTimerAdjusted] = useState(false);

  const currentStep: RecipeStep = recipe.steps[activeStepIndex];

  // Initialize main step timer whenever step index changes
  useEffect(() => {
    if (currentPage === "cooking") {
      setStepSecondsLeft(currentStep.durationSeconds);
      setIsStepTimerRunning(currentStep.durationSeconds > 0);
      setStepIngredientsChecked({});
      stopSpeaking();
    }
  }, [activeStepIndex, currentPage]);

  // Handle main step timer ticking down
  useEffect(() => {
    if (isStepTimerRunning && stepSecondsLeft > 0) {
      mainTimerIntervalRef.current = setInterval(() => {
        setStepSecondsLeft(prev => {
          if (prev <= 1) {
            setIsStepTimerRunning(false);
            triggerBuzzerSound();
            triggerConfettiExplosion();
            // Automatically check off current step
            const updated = [...completedSteps];
            updated[activeStepIndex] = true;
            setCompletedSteps(updated);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (mainTimerIntervalRef.current) {
        clearInterval(mainTimerIntervalRef.current);
      }
    }

    return () => {
      if (mainTimerIntervalRef.current) clearInterval(mainTimerIntervalRef.current);
    };
  }, [isStepTimerRunning, stepSecondsLeft, activeStepIndex, completedSteps]);

  // Handle side-timers ticking down (simultaneous timers!)
  useEffect(() => {
    const hasRunningTimer = sideTimers.some(t => t.isRunning && t.secondsLeft > 0);
    if (hasRunningTimer) {
      sideTimerIntervalRef.current = setInterval(() => {
        setSideTimers(prev => prev.map(t => {
          if (t.isRunning && t.secondsLeft > 0) {
            const nextSecs = t.secondsLeft - 1;
            if (nextSecs === 0) {
              triggerBuzzerSound(true);
              return { ...t, secondsLeft: 0, isRunning: false };
            }
            return { ...t, secondsLeft: nextSecs };
          }
          return t;
        }));
      }, 1000);
    } else {
      if (sideTimerIntervalRef.current) {
        clearInterval(sideTimerIntervalRef.current);
      }
    }

    return () => {
      if (sideTimerIntervalRef.current) clearInterval(sideTimerIntervalRef.current);
    };
  }, [sideTimers]);

  // Clean speaking on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Web Audio synth double bell chime buzzer
  const triggerBuzzerSound = (isSideTimer = false) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Pleasant double chime: D5 then G5 for main, E5 then C6 for side
      const f1 = isSideTimer ? 659.25 : 587.33; // E5 or D5
      const f2 = isSideTimer ? 1046.50 : 783.99; // C6 or G5
      
      osc.frequency.setValueAtTime(f1, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(f2, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.55);
    } catch (e) {
      console.warn("Could not fire chemical buzzer chord: ", e);
    }
  };

  // Text-To-Speech Step Audio Assistant
  const speakStep = () => {
    if (!window.speechSynthesis) {
      alert("TTS speaker support is limited in this browser context, but look at readable steps below!");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let spoken = `Step ${currentStep.stepNumber}. ${currentStep.instruction}. `;
    if (currentStep.ingredientsNeeded.length > 0) {
      spoken += "Ingredients needed here: ";
      currentStep.ingredientsNeeded.forEach(ing => {
        spoken += `${ing.amount} of ${ing.name}. `;
      });
    }

    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleMainTimerPlay = () => {
    if (isStepTimerRunning) {
      setPausedCount(prev => prev + 1);
    }
    setIsStepTimerRunning(!isStepTimerRunning);
  };

  const resetMainTimer = () => {
    setIsStepTimerRunning(false);
    setStepSecondsLeft(currentStep.durationSeconds);
  };

  // SNOOZE OPTION: Add minutes to timer!
  const snoozeMainTimer = (minutes: number) => {
    setStepSecondsLeft(prev => prev + minutes * 60);
    setTimerAdjusted(true);
  };

  // Side timer commands
  const addSideTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const label = newTimerLabel.trim() || `Timer ${sideTimers.length + 1}`;
    const newTimer: ManualTimer = {
      id: Math.random().toString(36).substr(2, 9),
      label,
      duration: newTimerMinutes * 60,
      secondsLeft: newTimerMinutes * 60,
      isRunning: true
    };
    setSideTimers([...sideTimers, newTimer]);
    setNewTimerLabel("");
    triggerBuzzerSound(true);
  };

  const removeSideTimer = (id: string) => {
    setSideTimers(sideTimers.filter(t => t.id !== id));
  };

  const toggleSideTimer = (id: string) => {
    setSideTimers(sideTimers.map(t => {
      if (t.id === id) {
        return { ...t, isRunning: !t.isRunning };
      }
      return t;
    }));
  };

  const resetSideTimer = (id: string) => {
    setSideTimers(sideTimers.map(t => {
      if (t.id === id) {
        return { ...t, secondsLeft: t.duration, isRunning: false };
      }
      return t;
    }));
  };

  // Stepper handlers
  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setRedosCount(prev => prev + 1);
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleNext = () => {
    const updated = [...completedSteps];
    updated[activeStepIndex] = true;
    setCompletedSteps(updated);

    if (activeStepIndex < recipe.steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      finalizeSession();
    }
  };

  const handleStepJump = (idx: number) => {
    if (idx < activeStepIndex) {
      setRedosCount(prev => prev + 1);
    }
    setActiveStepIndex(idx);
  };

  const toggleIngredientChecked = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowChecked = !stepIngredientsChecked[name];

    setStepIngredientsChecked(prev => ({
      ...prev,
      [name]: isNowChecked
    }));

    if (isNowChecked) {
      playPerfectStepSound();

      // Spawn floating point bubble
      const clickX = e.clientX || (window.innerWidth / 2);
      const clickY = e.clientY || (window.innerHeight / 2);

      const newXP = {
        id: Math.random(),
        text: "+5 XP Cabinet Bonus",
        left: clickX,
        top: clickY - 25
      };

      setFloatingXPs(prev => [...prev, newXP]);
      setTimeout(() => {
        setFloatingXPs(prev => prev.filter(x => x.id !== newXP.id));
      }, 1000);
    }
  };

  // Calculate XP bonuses and emit finalize session log
  const finalizeSession = () => {
    stopSpeaking();
    const totalTimeTakenSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
    
    // XP scoring constants
    const diffMultiplier = recipe.difficultyNumber || 1;
    const baseXP = 50 + (10 * diffMultiplier);

    // Bonus Calculations
    const didAdjust = timerAdjusted;
    const isFirstTimeClean = redosCount === 0 && pausedCount === 0;
    const isPerfectClock = !didAdjust && pausedCount <= 1;

    let bonusXP = 0;
    if (isPerfectClock) bonusXP += 25; // Perfect timer accuracy (+25 XP)
    if (isFirstTimeClean) bonusXP += 15; // First attempt clean (+15 XP)
    if (recipe.difficultyNumber >= 3) bonusXP += 10; // Difficult recipe bonus (+10 XP)

    const session: CookingSession = {
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      totalTimeTaken: totalTimeTakenSeconds,
      stepsCompletedCount: recipe.steps.length,
      pausedCount,
      timerAccuracyBonus: isPerfectClock,
      firstAttemptBonus: isFirstTimeClean,
      xpEarned: baseXP + bonusXP,
      rating: 5, // overwritten dynamically on summary screen
      feedbackNotes: "",
      timestamp: new Date().toISOString()
    };

    onCookFinalize(session);
  };

  const formatSecsToClock = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPct = Math.round((completedSteps.filter(Boolean).length / recipe.steps.length) * 100);

  // Return Overview / Mise en Place checklist preview first
  if (currentPage === "overview") {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm transition-all animate-fade-in block overflow-hidden text-slate-800">
        <div className="sticky top-0 z-40 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-[#F1EDE4]/95 backdrop-blur-sm rounded-t-3xl gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A0855B] hover:text-[#8C734E] uppercase tracking-wider focus:outline-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Pantry Cabinet</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase tracking-widest focus:outline-none cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Session</span>
            </button>
          </div>

          <button
            onClick={() => setCurrentPage("cooking")}
            id="start-cooking-copilot"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase rounded-2xl shadow-sm transition-all transform hover:scale-[1.01] pointer-cursor focus:outline-none flex items-center gap-1.5"
          >
            <ChefHat className="w-4 h-4" />
            <span>Engage Cooking Step-by-Step</span>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-serif font-black text-slate-900 leading-tight select-all">{recipe.title}</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#FAF9F6] border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Complexity Level</span>
              <span className="text-xs font-bold text-slate-800 uppercase">{recipe.difficulty}</span>
            </div>
            <div className="bg-[#FAF9F6] border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Prep Effort</span>
              <span className="text-xs font-bold font-mono text-slate-800">{recipe.prepTime} mins</span>
            </div>
            <div className="bg-[#F1EDE4] border border-[#E5E1D8] p-4 rounded-2xl text-center shadow-sm">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#A0855B] block mb-1">Cooking Clock</span>
              <span className="text-xs font-bold font-mono text-[#A0855B]">{recipe.cookTime} mins</span>
            </div>
            <div className="bg-[#FFE5D9] border border-[#F2C6B4] p-4 rounded-2xl text-center shadow-sm">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#D44D5C] block mb-1">Feast Output</span>
              <span className="text-xs font-bold font-mono text-[#D44D5C]">{recipe.servings} Servings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase font-mono border-b border-slate-100 pb-2 flex items-center gap-1">
                <span>Basket Checklist</span>
              </h3>
              <ul className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-dashed border-slate-150 last:border-0 text-slate-700">
                    <span className="flex items-center gap-2.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A0855B]" />
                      <span>{ing.name}</span>
                    </span>
                    <span className="font-serif font-bold bg-[#FAF9F6] px-2.5 py-1 border border-slate-200 rounded-xl text-xs text-slate-800">
                      {ing.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase font-mono border-b border-slate-100 pb-2">
                  Assumed Base Spices
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.pantryStaplesNeeded && recipe.pantryStaplesNeeded.length > 0 ? (
                    recipe.pantryStaplesNeeded.map(staple => (
                      <span key={staple} className="text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-slate-200 text-slate-650 rounded-xl font-bold">{staple}</span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-450 italic">None extra needed besides Salt, Pepper and Water.</span>
                  )}
                </div>
              </div>

              <div className="bg-[#FAF9F6] border border-slate-200 rounded-3xl p-5 md:p-6 space-y-2">
                <span className="text-xs font-bold text-[#A0855B] flex items-center gap-1.5 uppercase tracking-wider">
                  <ChefHat className="w-4 h-4 text-[#A0855B]" />
                  <span>Interactive Cooking Tip</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  We formulate automatic step-by-step guidance timers, hand-free speech assistants, and simultaneous component timers. Toggle checkboxes on each step as you complete cooking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active cooking HUD sequence view
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm transition-all animate-fade-in text-slate-800 overflow-hidden">
      
      {/* HUD TIMELINE PROGRESS HEADER */}
      <div className="sticky top-0 z-40 p-4 md:p-5 border-b border-[#E5E1D8] flex flex-col md:flex-row justify-between items-center bg-[#F1EDE4]/95 backdrop-blur-sm gap-4 rounded-t-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage("overview")}
            title="Return to ingredients checklist"
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#A0855B] transition-colors focus:outline-none cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowCancelConfirm(true)}
            title="Cancel cooking session"
            className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors focus:outline-none cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <div className="bg-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-[#A0855B] border border-[#E5E1D8] inline-block mb-0.5 animate-pulse">Kitchen Active</div>
            <h3 className="text-xs font-bold text-slate-900 truncate max-w-xs">{recipe.title}</h3>
          </div>
        </div>

        {/* Dynamic step links checklist */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {recipe.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isDone = completedSteps[idx];
            return (
              <button
                key={idx}
                onClick={() => handleStepJump(idx)}
                className={`w-8 h-8 rounded-full text-[11px] font-mono font-bold flex items-center justify-center border transition-all focus:outline-none ${
                  isActive 
                    ? "bg-[#A0855B] border-[#A0855B] text-white ring-4 ring-[#A0855B]/15"
                    : isDone
                    ? "bg-[#6B705C] border-[#6B705C] text-white"
                    : "bg-white border-slate-250 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.stepNumber}
              </button>
            );
          })}
        </div>

        {/* Core Progress percentages tracking */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-black leading-none">Simmer Index</span>
            <span className="text-[11px] font-bold text-slate-900 font-mono">{progressPct}% Completed</span>
          </div>
          <div className={`w-24 h-3 bg-white/70 rounded-full overflow-hidden border border-slate-200/50 relative ${
            progressPct === 100 ? "shadow-[0_0_12px_#eab308] border-amber-300 animate-pulse" : ""
          }`}>
            <div 
              className="h-full transition-all duration-500 ease-out" 
              style={{ 
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, #f97316 0%, #ef4444 50%, #eab308 100%)`
              }} 
            />
            {/* Glossy shine overlay element */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 animate-pulse pointer-events-none" />
          </div>
        </div>
      </div>

      {/* THREE-COLUMN BENTO: STEP & INSTRUCTION ON LEFT, STEP INGREDIENTS IN MIDDLE, ACTIVE PROGRESS TIMERS ON RIGHT */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COMPONENT: LARGE EASY-TO-READ STEPS HUD */}
        <div key={transitionKey} className="lg:col-span-4 space-y-6 bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm min-h-[340px] flex flex-col justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono font-black text-slate-400 tracking-wider uppercase block bg-slate-50 px-2 py-1 rounded border border-slate-100">
                Instruction {currentStep.stepNumber} / {recipe.steps.length}
              </span>

              {/* TTS SPEAK VOICE BUTTON */}
              <button
                onClick={speakStep}
                className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border transition-all ${
                  isSpeaking
                    ? "bg-rose-500 border-rose-500 text-white uppercase font-black"
                    : "bg-[#FAF9F6] border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3 h-3" />
                    <span>Mute Speaker</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span>Speaker Read</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-black text-slate-900 leading-snug select-all">
              {currentStep.instruction}
            </h2>
          </div>

          <div className="pt-4 border-t border-slate-50">
            {/* Completed check in screen */}
            <button
              onClick={() => {
                const nextVal = [...completedSteps];
                nextVal[activeStepIndex] = !nextVal[activeStepIndex];
                setCompletedSteps(nextVal);
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-xl border transition-all ${
                completedSteps[activeStepIndex]
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-[#FAF9F6] border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {completedSteps[activeStepIndex] ? (
                <>
                  <CheckSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  <span>Checked & complete</span>
                </>
              ) : (
                <>
                  <Square className="w-4 h-4 text-slate-350" />
                  <span>Mark stage done</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* MIDDLE COMPONENT: INGREDIENTS SPECIFIC TO THIS STEP ONLY */}
        <div className="lg:col-span-4 space-y-4 bg-[#6B705C] text-white p-5 md:p-6 rounded-3xl shadow-sm min-h-[340px]">
          <div>
            <span className="text-[9px] font-mono font-black tracking-widest uppercase opacity-75 block">Stage Ingredient Measures</span>
            <p className="text-[10px] opacity-70 leading-relaxed font-semibold mt-0.5">Use only these quantities for this specific step action.</p>
          </div>

          {currentStep.ingredientsNeeded.length === 0 ? (
            <div className="py-12 border border-white/10 rounded-2xl bg-white/5 text-center text-xs opacity-75 italic">
              No new ingredients are added on this instruction.
            </div>
          ) : (
            <div className="space-y-2.5">
              {currentStep.ingredientsNeeded.map((ing, ingIdx) => {
                const isCheckedOff = !!stepIngredientsChecked[ing.name];
                return (
                  <div
                    key={ingIdx}
                    onClick={(e) => toggleIngredientChecked(ing.name, e)}
                    className={`flex items-center justify-between p-3 border rounded-xl select-none cursor-pointer transition-all ${
                      isCheckedOff 
                        ? "bg-white/15 border-white/20 opacity-60 line-through text-white/70"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 font-bold text-xs truncate max-w-[150px]">
                      {isCheckedOff ? (
                        <Check className="w-3.5 h-3.5 stroke-[3] text-green-300" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/40" />
                      )}
                      <span>{ing.name}</span>
                    </div>
                    <span className="text-xs font-serif font-black underline underline-offset-4 tracking-wide">
                      {ing.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: INTEGRATED SMART TIMER + SNOOZE PANEL */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* 1. STEP SPECIFIC TIMER */}
          {currentStep.durationSeconds > 0 ? (
            <div className="bg-[#FFE5D9] border border-[#F2C6B4] rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-sm relative overflow-hidden min-h-[220px]">
              <div className="text-[9px] uppercase tracking-widest font-black text-[#D44D5C] opacity-75">
                Instruction stopwatch timer
              </div>

              {/* Central clock */}
              {(() => {
                const rVal = 26;
                const circumVal = 2 * Math.PI * rVal;
                const strokeOffsetVal = currentStep.durationSeconds > 0 
                  ? circumVal - (stepSecondsLeft / currentStep.durationSeconds) * circumVal 
                  : 0;

                return (
                  <div className="py-2 flex flex-col items-center relative my-1">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 60 60">
                        {/* Background track circle */}
                        <circle
                          cx="30"
                          cy="30"
                          r={rVal}
                          fill="transparent"
                          stroke="#F2C6B4"
                          strokeWidth="3"
                          className="opacity-40"
                        />
                        {/* Animated progress circle */}
                        <circle
                          cx="30"
                          cy="30"
                          r={rVal}
                          fill="transparent"
                          stroke="#D44D5C"
                          strokeWidth="3"
                          strokeDasharray={circumVal}
                          strokeDashoffset={strokeOffsetVal}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-linear"
                        />
                      </svg>

                      {/* Tick timer digits pulsing size every 5 seconds when stopwatch runs */}
                      <div className={`flex flex-col items-center justify-center z-10 transition-transform ${
                        isStepTimerRunning && stepSecondsLeft > 0 && stepSecondsLeft % 5 === 0 
                          ? "scale-110" 
                          : "scale-100"
                      }`}>
                        <span className="text-xl font-mono font-black text-[#D44D5C] leading-none">
                          {formatSecsToClock(stepSecondsLeft)}
                        </span>
                        <span className="text-[7px] font-bold text-[#D44D5C]/60 uppercase tracking-widest font-mono mt-0.5">
                          {isStepTimerRunning ? "Sizzling" : "Paused"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Snooze Options row */}
              <div className="w-full bg-white/15 border border-dashed border-[#F2C6B4] p-2 rounded-xl text-center space-y-1.5 mb-2.5">
                <span className="text-[8px] font-mono uppercase text-[#D44D5C]/80 block font-bold">⏱️ SNOOZE ADD MORE TIME</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 5].map(m => (
                    <button
                      key={m}
                      onClick={() => snoozeMainTimer(m)}
                      className="px-2 py-1 bg-[#D44D5C] hover:bg-[#B53E4C] text-white text-[9px] font-bold font-mono rounded"
                    >
                      +{m} Min
                    </button>
                  ))}
                </div>
              </div>

              {/* Player control pads */}
              <div className="flex gap-2">
                <button
                  onClick={resetMainTimer}
                  title="Reload Step Time"
                  className="p-2 border border-[#F2C6B4] rounded-full bg-white text-[#D44D5C] hover:bg-slate-50 transition-all focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleMainTimerPlay}
                  className={`px-4 py-2 font-black text-[10px] uppercase tracking-wider text-white rounded-full flex items-center gap-1 shadow-sm transition-all ${
                    isStepTimerRunning ? "bg-[#D44D5C] hover:bg-[#B53E4C]" : "bg-[#6B705C] hover:bg-[#525647]"
                  }`}
                >
                  {isStepTimerRunning ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Cook</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF9F6] border border-slate-200 rounded-3xl p-5 text-center text-xs text-slate-500 flex flex-col items-center justify-center min-h-[220px] shadow-inner">
              <Activity className="w-6 h-6 text-[#A0855B] mb-2" />
              <span className="font-bold text-slate-800 uppercase tracking-widest text-[9px] block mb-1">Untimed Action</span>
              <p className="px-4 text-[10px] text-slate-400 font-semibold leading-relaxed">
                This action covers basic chopping or cold assembly. Savor each measure at your own relaxation pace!
              </p>
            </div>
          )}

          {/* 2. SIMULTANEOUS SIDE TIMERS COMPONENT PANEL */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Simultaneous Timers ({sideTimers.length})</span>
              </span>
            </div>

            {/* Timers list */}
            {sideTimers.length > 0 && (
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {sideTimers.map(t => (
                  <div key={t.id} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                    <div className="truncate max-w-[80px]">
                      <div className="text-[10px] font-semibold text-slate-700 truncate block">{t.label}</div>
                      <div className="text-[11px] font-mono font-bold text-indigo-600 block leading-tight mt-0.5">
                        {formatSecsToClock(t.secondsLeft)}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleSideTimer(t.id)}
                        className={`p-1.5 rounded-lg text-white ${t.isRunning ? "bg-amber-500" : "bg-emerald-600"}`}
                      >
                        {t.isRunning ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                      </button>
                      <button
                        onClick={() => resetSideTimer(t.id)}
                        className="p-1.5 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300"
                        title="Reload Timer"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeSideTimer(t.id)}
                        className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-bold"
                        title="Remove Timer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick launch helper Form */}
            <form onSubmit={addSideTimer} className="flex gap-1">
              <input
                type="text"
                placeholder="Side dish timer (rice, soup)"
                value={newTimerLabel}
                onChange={(e) => setNewTimerLabel(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] bg-[#FAF9F6]"
              />
              <select
                value={newTimerMinutes}
                onChange={(e) => setNewTimerMinutes(parseInt(e.target.value))}
                className="px-1 py-1.5 border border-slate-200 rounded-lg text-[10px] bg-white font-mono"
              >
                {[1, 2, 3, 5, 10, 15, 20, 30].map(m => (
                  <option key={m} value={m}>{m}m</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
              >
                +Add
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* CO-PILOT NAVIGATION ACTIVE FOOTER BOARD */}
      <div className="p-5 border-t border-slate-100 bg-[#FAF9F6] flex justify-between items-center rounded-b-3xl gap-4">
        <button
          onClick={handlePrev}
          disabled={activeStepIndex === 0}
          className={`px-4 py-3 rounded-xl border text-[11px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 transition-all ${
            activeStepIndex === 0
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 Pointer-cursor"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Stage</span>
        </button>

        <button
          onClick={handleNext}
          id="copilot-next-step"
          className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] tracking-widest uppercase rounded-xl flex items-center justify-center gap-1 transition-all pointer-cursor shadow-sm"
        >
          {activeStepIndex === recipe.steps.length - 1 ? (
            <>
              <span>Plate and Serve Feast</span>
              <Sparkles className="w-4 h-4 text-white" />
            </>
          ) : (
            <>
              <span>Next Stage Instruction</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Drifting Floating Score tags */}
      {floatingXPs.map(fx => (
        <div
          key={fx.id}
          className="fixed pointer-events-none text-emerald-700 font-sans font-black text-xs px-3 py-1 bg-white border-2 border-emerald-500/20 rounded-full shadow-xl z-200 animate-float-xp flex items-center gap-1"
          style={{
            left: `${fx.left}px`,
            top: `${fx.top}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <Sparkles className="w-3 h-3 text-emerald-500 fill-emerald-500" />
          <span>{fx.text}</span>
        </div>
      ))}

      {/* Real-time falling Confetti elements */}
      {confetti.map(c => {
        const dx = `${-150 + Math.random() * 300}px`;
        const dy = `${150 + Math.random() * 300}px`;
        const rot = `${-360 + Math.random() * 720}deg`;
        const duration = `${1.5 + Math.random() * 2}s`;
        return (
          <div 
            key={c.id}
            className="fixed pointer-events-none z-200 animate-drift-particle"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              opacity: 0.85,
              "--dx": dx,
              "--dy": dy,
              "--rot": rot,
              "--duration": duration
            } as React.CSSProperties}
          />
        );
      })}

      {/* Cancel confirmation modal overlay */}
      {showCancelConfirm && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4">
            <div className="flex gap-3 items-start col-span-1">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                <AlertCircle className="w-6 h-6 animate-bounce" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-serif font-black text-slate-900 leading-tight">Abort Cooking Session?</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">
                  Are you sure you want to cancel this active cooking session? You will lose all current timers and progress.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-3 border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
              >
                No, Resume
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelConfirm(false);
                  onExit();
                }}
                className="flex-1 py-3 bg-[#e63946] hover:bg-[#d62828] text-white font-extrabold rounded-2xl text-xs transition-transform cursor-pointer shadow-md hover:-translate-y-0.5"
              >
                Yes, Abandon
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

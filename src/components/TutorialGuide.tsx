import React, { useState } from "react";
import { 
  Carrot, BookOpen, Heart, Sparkles, Check, 
  ArrowRight, ArrowLeft, X, Trophy, ChefHat, Info, HelpCircle
} from "lucide-react";

interface TutorialGuideProps {
  onSelectTab: (tab: "dashboard" | "pantry" | "recipes" | "favorites" | "profile") => void;
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  tabTrigger: "dashboard" | "pantry" | "recipes" | "favorites" | "profile";
  label: string;
  icon: React.ReactNode;
  description: string;
  instructions: string[];
}

export default function TutorialGuide({ onSelectTab, onClose }: TutorialGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TutorialStep[] = [
    {
      title: "Your Kitchen Home Cockpit",
      tabTrigger: "dashboard",
      label: "Home",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      description: "First up, this is your Home screen! It serves as your main cockpit to check your active level, view a visual calorie wheel, and track your daily cooking streak at a glance.",
      instructions: [
        "Check your current daily nutrition breakdown and calorie counts instantly.",
        "Keep your hot cooking streak alive by cooking at least once every 24 hours!",
        "Level up your ranking by completing recipes, and unlock fresh theme styles."
      ]
    },
    {
      title: "Your Intelligent Pantry Shelf",
      tabTrigger: "pantry",
      label: "Pantry",
      icon: <Carrot className="w-4 h-4 text-emerald-550" />,
      description: "Here is your smart digital fridge! Tap the ingredients you have on hand in real life, and let CookMate organize them for you. No more wasted food in the back of the shelf!",
      instructions: [
        "Tap simple tags to load what ingredients you currently have at home.",
        "Click 'Formulate Custom Dishes' to instantly generate recipes with those items.",
        "Easily scale weight values so the app knows exactly how much food is left."
      ]
    },
    {
      title: "Your Gourmet Recipe Shelf",
      tabTrigger: "recipes",
      label: "Shelf",
      icon: <BookOpen className="w-4 h-4 text-indigo-500" />,
      description: "This is your cookbook bookshelf! Browse through delicious default classics or dynamically generated meals that fit your exact dietary preferences.",
      instructions: [
        "Inspect required prep times, difficulty levels, and necessary ingredients.",
        "Tap a card to start the voice-guided Interactive cooking session.",
        "Let the voice helper read steps out loud while you focus hands-free!"
      ]
    },
    {
      title: "Save Favorite Meals",
      tabTrigger: "favorites",
      label: "Favorites",
      icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
      description: "Found a recipe that hits the spot? Tap the heart icon anywhere to stash it in your favorites so you can cook it again without searching!",
      instructions: [
        "Tap the heart on any card to immediately book a spot in this vault.",
        "Skip stocking ingredients next time and launch your favorite cooks instantly."
      ]
    },
    {
      title: "Customize Personal Profile",
      tabTrigger: "profile",
      label: "Profile",
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      description: "And here is your personal cooking station! Go here to inspect your lifetime career achievements, track earned badges, and swap between premium kitchen themes.",
      instructions: [
        "Select Slate, Sage, Coral, or Saffron themes to customize your workspace.",
        "Review your lifetime chef metrics and safely secure or lock your account parameters."
      ]
    }
  ];

  const handleStepTransition = (direction: "next" | "prev") => {
    let target = currentStep;
    if (direction === "next" && currentStep < steps.length - 1) {
      target = currentStep + 1;
    } else if (direction === "prev" && currentStep > 0) {
      target = currentStep - 1;
    }

    setCurrentStep(target);
    onSelectTab(steps[target].tabTrigger);
  };

  const handleSelectTabStep = (index: number) => {
    setCurrentStep(index);
    onSelectTab(steps[index].tabTrigger);
  };

  const active = steps[currentStep];

  const arrowOffsets = [
    "left-[10%] sm:left-[10%]",
    "left-[30%] sm:left-[30%]",
    "left-[50%] sm:left-[50%]",
    "left-[70%] sm:left-[70%]",
    "left-[90%] sm:left-[90%]",
  ];

  return (
    <div className="fixed inset-x-0 bottom-24 z-[9999] pointer-events-none flex justify-center p-4">
      {/* Semi-transparent focal overlay backdrop */}
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs pointer-events-auto z-[-1]" onClick={onClose} />

      {/* Floating Tutorial Popover */}
      <div className="bg-white border border-[#A0855B]/45 rounded-3xl p-5 md:p-6 shadow-2xl max-w-md w-full pointer-events-auto relative z-10 animate-fade-in space-y-4 text-slate-800">
        
        {/* Pointing arrow indicator */}
        <div className={`absolute -bottom-2 w-4 h-4 bg-white border-r border-b border-[#A0855B]/40 rotate-45 transition-all duration-300 pointer-events-none ${arrowOffsets[currentStep]}`} />

        {/* Dismiss trigger */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Exit helper tour"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>

        {/* STEP HEADER */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-black text-[#A0855B] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Guide • Step {currentStep + 1} of 5</span>
          </div>
          <h4 className="text-base font-serif font-black text-slate-900 leading-tight flex items-center gap-2">
            <span>{active.title}</span>
          </h4>
        </div>

        {/* NAVIGATION ACCESS SELECTOR BUTTON DECK */}
        <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-150">
          <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block text-center">
            Tap a button to tour that screen:
          </span>
          <div className="flex items-center justify-between gap-1">
            {steps.map((step, idx) => {
              const isSelected = idx === currentStep;
              return (
                <button
                  key={step.tabTrigger}
                  type="button"
                  onClick={() => handleSelectTabStep(idx)}
                  className={`flex-1 flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#A0855B] border-[#A0855B] text-white font-black scale-102 shadow-xs" 
                      : "bg-white hover:bg-slate-100 border-slate-200 text-slate-505"
                  }`}
                  title={`Go straight to ${step.label} guide`}
                >
                  {step.icon}
                  <span className="text-[9px] font-bold tracking-tight">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* OVERHEAD DECORATIVE CAPTION */}
        <div className="bg-amber-50/40 border border-amber-200/50 p-3 rounded-2xl text-xs text-slate-600 leading-relaxed font-semibold">
          {active.description}
        </div>

        {/* BULLETED ACTION ITEMS */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            What you can do here:
          </span>
          <ul className="space-y-1.5 text-xs">
            {active.instructions.map((inst, index) => (
              <li key={index} className="flex gap-2 items-start leading-snug">
                <span className="inline-flex w-4.5 h-4.5 rounded-full bg-slate-900 text-amber-300 text-[9px] font-bold items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-600 font-semibold">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
          <div>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => handleStepTransition("prev")}
                className="text-xs font-bold text-slate-500 hover:text-slate-850 transition-colors cursor-pointer py-1 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => handleStepTransition("next")}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-transform shadow-sm"
              >
                <span>Next Screen</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#A0855B] hover:bg-[#856C42] text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Start Cooking</span>
              </button>
            )}
          </div>
        </div>

        {/* POINTER TIP ELEMENT ON BOTTOM SHIELD */}
        <div className="text-[10px] text-center text-slate-400 font-mono flex items-center justify-center gap-1 pt-0.5">
          <Info className="w-3.5 h-3.5 text-amber-500" />
          <span>Notice: The app changes background tabs automatically!</span>
        </div>

      </div>
    </div>
  );
}

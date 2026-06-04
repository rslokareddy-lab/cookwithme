import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertTriangle } from "lucide-react";

interface TimerProps {
  durationSeconds: number;
  onComplete: () => void;
  stepNumber: number;
}

export default function Timer({ durationSeconds, onComplete, stepNumber }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state if duration changes (e.g. stepping forward/backward)
  useEffect(() => {
    setSecondsLeft(durationSeconds);
    setIsRunning(false);
  }, [durationSeconds, stepNumber]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            triggerChime();
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onComplete]);

  const triggerChime = () => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // A pleasant double bell chime (D5 followed by A5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Could not play sound chime:", e);
    }
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(durationSeconds);
  };

  const testChime = () => {
    triggerChime();
  };

  // Calculate visual progress proportion
  const progressRatio = durationSeconds > 0 ? (durationSeconds - secondsLeft) / durationSeconds : 1;
  const strokeDashoffset = 282.7 - 282.7 * progressRatio; // 2 * pi * 45 radius

  return (
    <div id="kitchen-timer-widget" className="relative flex flex-col items-center bg-[#FFE5D9] border border-[#F2C6B4] rounded-3xl p-6 shadow-sm max-w-sm w-full mx-auto">
      <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#D44D5C] opacity-70 mb-2">
        Active step timer
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* SVG Circular Progress Bar */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="45"
            className="stroke-[#F2C6B4]/40 fill-none"
            strokeWidth="6"
            style={{ cx: '80px', cy: '80px' }}
          />
          <circle
            cx="80"
            cy="80"
            r="45"
            className="stroke-[#D44D5C] fill-none transition-all duration-1000 ease-linear"
            strokeWidth="6"
            strokeDasharray="282.7"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ cx: '80px', cy: '80px' }}
          />
        </svg>

        {/* Digital Time Reading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-mono font-bold text-[#D44D5C] tracking-tighter">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#D44D5C]/70 mt-0.5">
            {isRunning ? "Simmering" : "Paused"}
          </span>
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="flex items-center justify-center gap-3 mt-4 w-full">
        <button
          onClick={resetTimer}
          id="btn-timer-reset"
          title="Reset timer"
          className="p-2.5 rounded-full bg-white hover:bg-[#FFE5D9] border border-[#F2C6B4] text-[#D44D5C] transition-colors pointer-cursor focus:outline-none"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleTimer}
          id="btn-timer-toggle"
          className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 text-white shadow-sm transition-all transform hover:scale-[1.02] focus:outline-none ${
            isRunning
              ? "bg-[#D44D5C] hover:bg-[#B53E4C]"
              : "bg-[#6B705C] hover:bg-[#525647]"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Cook</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          id="btn-timer-mute"
          title={isMuted ? "Unmute Timer Chime" : "Mute Timer Chime"}
          className={`p-2.5 rounded-full border transition-colors focus:outline-none ${
            isMuted
              ? "bg-[#D44D5C] border-transparent text-white"
              : "bg-white border-[#F2C6B4] text-[#D44D5C] hover:bg-[#FFE5D9]"
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#D44D5C]/70">
        <button 
          onClick={testChime} 
          className="hover:underline underline-offset-2 font-mono flex items-center gap-1 focus:outline-none"
        >
          <span>🎵 Test alert buzzer</span>
        </button>
      </div>
    </div>
  );
}

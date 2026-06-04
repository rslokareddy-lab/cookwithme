import React from "react";
import { Sparkles, Award, Zap, ChevronRight, Trophy } from "lucide-react";

interface LevelUpCelebrationProps {
  oldLevel: number;
  newLevel: number;
  onClose: () => void;
}

export default function LevelUpCelebration({ oldLevel, newLevel, onClose }: LevelUpCelebrationProps) {
  // Helper to determine what is newly unlocked at this specific milestone
  const getUnlockedRewards = (lvl: number) => {
    const rewards = [];
    if (lvl >= 5 && lvl < 10) {
      rewards.push({
        type: "Cosmetic Theme",
        title: "Sage Garden Theme",
        desc: "Unlocks a soothing light cream and sage-green foliage theme in Settings!"
      });
    }
    if (lvl >= 10 && lvl < 15) {
      rewards.push({
        type: "Cosmetic Theme",
        title: "Cosmic Dark Theme",
        desc: "Unlocks an immersive, deep-night galactic style preset!"
      });
    }
    if (lvl >= 15 && lvl < 20) {
      rewards.push({
        type: "Cosmetic Theme",
        title: "Warm Coral Peach Theme",
        desc: "Unlocks a high-contrast energetic morning peach theme!"
      });
    }
    if (lvl >= 20) {
      rewards.push({
        type: "Cosmetic Theme",
        title: "Golden Saffron Curry Theme",
        desc: "Unlocks an exquisite gold-saffron and turmeric styling!"
      });
    }

    // Recipe level unlock details
    if (lvl === 6) {
      rewards.push({
        type: "Recipe Complexity",
        title: "Home Chef Tiers",
        desc: "Unlocks intermediate multi-component recipes with tempering & advanced timings!"
      });
    } else if (lvl === 16) {
      rewards.push({
        type: "Recipe Complexity",
        title: "Professional Chef Tiers",
        desc: "Unlocks delicate double sears, emulsion sauces, and precision pan glazes."
      });
    } else if (lvl === 26) {
      rewards.push({
        type: "Recipe Complexity",
        title: "Master Chef Expert Quests",
        desc: "Unlocks molecular gastronomy and precision thermal baking spheres!"
      });
    }

    // Default catch-all rewards
    if (rewards.length === 0) {
      rewards.push({
        type: "Performance Badge",
        title: `Chef Badge Rank Up`,
        desc: `Earned new custom credentials. Cook more high difficulty recipes for theme triggers at Levels 5, 10, 15 and 20!`
      });
    }

    return rewards;
  };

  const rewards = getUnlockedRewards(newLevel);

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-150 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* 1. CONFETTI OVERLAY WRAPPER */}
      <div className="relative bg-gradient-to-tr from-slate-900 via-slate-800 to-[#12131C] border border-white/10 rounded-3xl p-6 md:p-10 max-w-lg w-full text-center space-y-8 shadow-2xl animate-scale-up my-auto text-white">
        
        {/* Floating decorative absolute particles */}
        <div className="absolute top-10 left-10 text-yellow-400 rotate-12 text-lg animate-pulse">✨</div>
        <div className="absolute bottom-10 right-10 text-orange-400 rotate-45 text-2xl animate-pulse">🌟</div>
        <div className="absolute top-20 right-16 text-[#A0855B] text-sm">🍒</div>
        <div className="absolute bottom-20 left-16 text-emerald-400 text-lg">🥬</div>

        {/* Level Banner */}
        <div className="space-y-3">
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce duration-1000">
            <Trophy className="w-9 h-9 text-slate-900" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight bg-gradient-to-r from-yellow-200 via-amber-200 to-coral-200 bg-clip-text text-transparent uppercase">
            Level Up!
          </h2>
          
          <p className="text-xs text-slate-300 font-mono uppercase tracking-widest">
            Culinary credentials rank updated!
          </p>
        </div>

        {/* Comparison Circles */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="text-center">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1">Old Level</div>
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xl font-mono font-bold text-slate-400">
              {oldLevel}
            </div>
          </div>

          <div className="text-yellow-400 animate-pulse">
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </div>

          <div className="text-center">
            <div className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-wider mb-1">New Rank</div>
            <div className="w-20 h-20 rounded-full border border-yellow-400/30 bg-gradient-to-tr from-yellow-400/20 to-amber-500/20 flex items-center justify-center text-3xl font-mono font-black text-yellow-300 shadow-lg shadow-yellow-500/10">
              {newLevel}
            </div>
          </div>
        </div>

        {/* UNLOCKED REWARDS DETAILS GRID */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left space-y-4">
          <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest block border-b border-white/5 pb-2">
            🎁 Locked Rewards Unlocked:
          </span>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {rewards.map((rew, rIdx) => (
              <div key={rIdx} className="flex gap-3 items-start">
                <div className="p-2 bg-white/10 rounded-lg text-amber-400 self-center">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-black">{rew.type}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{rew.title}</div>
                  <p className="text-xs text-slate-300 mt-1">{rew.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Conclude click */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-extrabold text-xs tracking-wider uppercase rounded-2xl shadow-lg transition-transform transform active:scale-98 focus:outline-none cursor-pointer"
        >
          Accept Rewards & Keep Cooking
        </button>

      </div>
    </div>
  );
}

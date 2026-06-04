import React, { useState } from "react";
import { UserProfile, CookingSession } from "../types";
import { ACHIEVEMENTS } from "../data/recipes";
import { Award, Lock, Palette, Eye, Edit2, Check, Sparkles, Sliders, MessageSquare, History, Trophy, Flame, ShieldAlert } from "lucide-react";

interface ProfileScreenProps {
  user: UserProfile;
  onChangeUser: (updatedProfile: UserProfile) => void;
  onNavigate: (tab: "pantry") => void;
}

const ALL_THEME_CHOICES = [
  { id: "Modern Slate", lvl: 1, text: "Slate & Sand", desc: "A cozy light cream and slate-charcoal profile with high contrast text." },
  { id: "Sage Garden", lvl: 5, text: "Sage & Clay", desc: "Soothing sage leafy organic greens paired with terracotta clay accents." },
  { id: "Cosmic Dark", lvl: 10, text: "Cosmic Midnight", desc: "An immersive deep space dark canvas highlighted by neon indigo." },
  { id: "Warm Coral", lvl: 15, text: "Peach Blossom", desc: "Warm energetic peach and salmon-coral highlights." },
  { id: "Golden Saffron", lvl: 20, text: "Turmeric Gold", desc: "Cozy bright golden spices paired with deep warm wood grays." }
];

export default function ProfileScreen({ user, onChangeUser, onNavigate }: ProfileScreenProps) {
  const [userName, setUserName] = useState(user.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"achievements" | "themes" | "history">("achievements");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    onChangeUser({
      ...user,
      level: 1,
      xp: 0,
      streak: 0,
      completedSessions: []
    });
    setShowResetConfirm(false);
  };

  const saveName = () => {
    if (!userName.trim()) return;
    onChangeUser({ ...user, name: userName.trim() });
    setIsEditingName(false);
  };

  const handleThemeChange = (themeId: string, requiredLvl: number) => {
    if (user.level < requiredLvl) return; // Locked!
    
    // Auto unlock the theme list if it wasn't there
    const unlocked = [...user.unlockedThemes];
    if (!unlocked.includes(themeId)) {
      unlocked.push(themeId);
    }
    
    onChangeUser({ 
      ...user, 
      activeTheme: themeId,
      unlockedThemes: unlocked
    });
  };

  // Compile statistics from finished sessions logs
  const calculateStats = () => {
    const totalCooks = user.completedSessions.length;
    let totalMinutes = 0;
    const cuisineCounts: Record<string, number> = {};

    user.completedSessions.forEach(s => {
      totalMinutes += Math.round(s.totalTimeTaken / 60);
    });

    // Dummy values if they haven't cooked anything yet
    const favCuisine = totalCooks > 0 ? "American Fusion" : "None";

    return {
      totalCooks,
      totalMinutes,
      favCuisine
    };
  };

  const { totalCooks, totalMinutes, favCuisine } = calculateStats();

  const handleUpdateDiet = (diet: string) => {
    let list = [...user.dietPreferences];
    if (list.includes(diet)) {
      list = list.filter(d => d !== diet);
    } else {
      list.push(diet);
    }
    onChangeUser({ ...user, dietPreferences: list });
  };

  const handleUpdateAllergy = (allergy: string) => {
    let list = user.allergies ? [...user.allergies] : [];
    if (list.includes(allergy)) {
      list = list.filter(a => a !== allergy);
    } else {
      list.push(allergy);
    }
    onChangeUser({ ...user, allergies: list });
  };

  // Check which achievements are unlocked
  const isAchievementUnlocked = (badgeId: string): boolean => {
    // Dynamic rules
    if (badgeId === "first_steps") {
      return user.completedSessions.length >= 1;
    }
    if (badgeId === "steady_cook") {
      return user.xp >= 1000;
    }
    if (badgeId === "perfect_tempo") {
      return user.completedSessions.some(c => c.timerAccuracyBonus);
    }
    if (badgeId === "expert_plates") {
      return user.level >= 6;
    }
    if (badgeId === "flawless_run") {
      return user.completedSessions.some(c => c.firstAttemptBonus);
    }
    if (badgeId === "favorites_lock") {
      return user.favorites.length >= 3;
    }
    return false;
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 pb-12">
      
      {/* 1. HERO IDENTITY CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#A0855B] to-[#6B705C] rounded-full border border-slate-200 flex items-center justify-center text-3xl text-white font-serif tracking-tight font-black shadow-inner">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1.5">
            {isEditingName ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3 py-1.5 border border-slate-250 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] font-bold"
                />
                <button
                  onClick={saveName}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h2 className="text-xl font-serif font-black tracking-tight text-slate-900">{user.name}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 text-slate-400 hover:text-slate-800 focus:outline-none"
                  title="Rename Profile Name"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            
            <p className="text-xs text-slate-500">
              Kitchen Authority: <span className="font-bold text-[#A0855B]">Level {user.level} Chef</span>
            </p>
          </div>
        </div>

        {/* Level stats */}
        <div className="flex gap-3 text-center">
          <div className="bg-[#FAF9F6] border border-slate-200 px-5 py-3 rounded-2xl shadow-inner min-w-[90px]">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block">Rank Level</span>
            <span className="text-lg font-mono font-black text-slate-800 leading-tight block">{user.level}</span>
          </div>
          <div className="bg-[#FAF9F6] border border-slate-200 px-5 py-3 rounded-2xl shadow-inner min-w-[90px]">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block">Total XP</span>
            <span className="text-lg font-mono font-black text-[#A0855B] leading-tight block">{user.xp}</span>
          </div>
          <div className="bg-[#FFE5D9] border border-[#F2C6B4] px-5 py-3 rounded-2xl shadow-inner min-w-[90px]">
            <span className="text-[9px] font-mono font-black text-[#D44D5C] uppercase tracking-widest block">Flame Streak</span>
            <span className="text-lg font-mono font-black text-[#D44D5C] leading-tight block">{user.streak} Days</span>
          </div>
        </div>
      </div>

      {/* DIETARY PREFERENCES & ALLERGIES CARD */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-mono font-black text-[#A0855B] block tracking-widest uppercase">
            🥗 Dietary Profile & Health Guards
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Toggle your customized diet plans and check target allergens to keep your kitchen profile up to date.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-slate-100">
          {/* Diet preferences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wide flex items-center gap-1.5 uppercase font-mono">
              🥦 Active Diets
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"].map((diet) => {
                const isSelected = user.dietPreferences?.includes(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => handleUpdateDiet(diet)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#E8F0FE] border-[#1A73E8] text-[#1A73E8] font-bold"
                        : "bg-stone-50 border-slate-200 text-slate-600 hover:bg-stone-100"
                    }`}
                  >
                    <span>{diet}</span>
                    {isSelected && <span className="text-sm font-black">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Allergies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wide flex items-center gap-1.5 uppercase font-mono text-rose-700">
              <ShieldAlert className="w-4 h-4 text-rose-505" /> Custom Allergies
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Dairy", "Gluten", "Eggs", "Soy", "Peanuts", "Tree Nuts", "Shellfish", "Fish", "Sesame"].map((allergy) => {
                const isSelected = user.allergies?.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => handleUpdateAllergy(allergy)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-rose-50 border-rose-400 text-rose-700 font-bold shadow-xs"
                        : "bg-stone-50 border-slate-200 text-slate-605 text-slate-600 hover:bg-stone-100"
                    }`}
                  >
                    <span>{allergy}</span>
                    {isSelected && <span className="text-sm font-black text-rose-700">✕</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE TAB ROW DESIGN SECTORS */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-1 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1">
          <button
            onClick={() => setActiveSubTab("achievements")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 focus:outline-none transition-all ${
              activeSubTab === "achievements" 
                ? "bg-white text-slate-900 shadow-sm font-black border border-slate-100" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-300" />
            <span>Badges Shelf</span>
          </button>
          <button
            onClick={() => setActiveSubTab("themes")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 focus:outline-none transition-all ${
              activeSubTab === "themes" 
                ? "bg-white text-slate-900 shadow-sm font-black border border-slate-100" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Palette className="w-4 h-4 text-[#A0855B]" />
            <span>Appearance Skins</span>
          </button>
          <button
            onClick={() => setActiveSubTab("history")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 focus:outline-none transition-all ${
              activeSubTab === "history" 
                ? "bg-white text-slate-900 shadow-sm font-black border border-slate-100" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <History className="w-4 h-4 text-indigo-600" />
            <span>Cookbook History</span>
          </button>
        </div>

        {/* 3. SUB TAB ACTIVE VIEWPORTS */}
        <div className="p-6 md:p-8">
          
          {/* ACH VIEWPORT */}
          {activeSubTab === "achievements" && (
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-black text-slate-400 block tracking-widest uppercase">
                🏆 Culinary Achievements Checklist
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((badge) => {
                  const unlocked = isAchievementUnlocked(badge.id);
                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 border rounded-2xl flex items-center gap-4 transition-all ${
                        unlocked 
                          ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                          : "bg-[#FAF9F6] border-slate-200 text-slate-400"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm ${
                        unlocked 
                          ? "bg-emerald-100 border border-emerald-250 animate-pulse text-emerald-800"
                          : "bg-slate-100 border border-slate-200"
                      }`}>
                        {unlocked ? badge.icon : "🔒"}
                      </div>

                      <div className="space-y-1 select-none">
                        <div className={`text-sm font-bold ${unlocked ? "text-slate-900" : "text-slate-500"}`}>
                          {badge.title}
                        </div>
                        <p className="text-[11px] leading-snug">{badge.description}</p>
                        {unlocked && (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded">
                            Unlocked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SKIN APPEARANCES VIEWPORT */}
          {activeSubTab === "themes" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-black text-[#A0855B] block tracking-widest uppercase">
                  🎨 Switch Cosmetic Customizations
                </span>
                <p className="text-xs text-slate-500 mt-1">Skins map across level milestones. Rank up by preparing cuisines to unlock luxury presets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_THEME_CHOICES.map((choice) => {
                  const isLocked = user.level < choice.lvl;
                  const isActive = user.activeTheme === choice.id;
                  
                  return (
                    <div
                      key={choice.id}
                      onClick={() => handleThemeChange(choice.id, choice.lvl)}
                      className={`p-4 border rounded-2xl flex items-start justify-between select-none relative overflow-hidden ${
                        isLocked 
                          ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed" 
                          : "bg-white border-slate-200 hover:border-[#A0855B] cursor-pointer"
                      } ${isActive ? "ring-2 ring-indigo-600 bg-indigo-50/5" : ""}`}
                    >
                      {/* Indicator Locks overlays */}
                      {isLocked && (
                        <div className="absolute right-3.5 top-3.5 p-1 px-2.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-[9px] font-mono uppercase font-black tracking-wider flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Level {choice.lvl}</span>
                        </div>
                      )}

                      <div className="space-y-1 flex-1 pr-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#A0855B] block">COSMETIC PROFILE PRESET</span>
                        <div className="text-sm font-extrabold text-slate-800">{choice.text}</div>
                        <p className="text-xs text-slate-500 pr-12">{choice.desc}</p>
                        
                        {/* Swatch color indicators demonstrating color themes */}
                        <div className="flex gap-1.5 pt-3">
                          {choice.id === "Modern Slate" && (
                            <>
                              <div className="w-4 h-4 rounded-full bg-[#FAF9F6] border border-slate-350 shadow-sm cursor-help" title="Canvas Base: #FAF9F6" />
                              <div className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-slate-350 shadow-sm cursor-help" title="White Overlay: #FFFFFF" />
                              <div className="w-4 h-4 rounded-full bg-[#0F172A] border border-slate-350 shadow-sm cursor-help" title="Primary Text: #0F172A" />
                              <div className="w-4 h-4 rounded-full bg-[#A0855B] border border-slate-350 shadow-sm cursor-help" title="Gold Sand: #A0855B" />
                            </>
                          )}
                          {choice.id === "Sage Garden" && (
                            <>
                              <div className="w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#d2cbbf] shadow-sm cursor-help" title="Herbal Mint Base: #FAF7F2" />
                              <div className="w-4 h-4 rounded-full bg-[#D4DDD5] border border-[#b2bfb3] shadow-sm cursor-help" title="Herbal Sage: #D4DDD5" />
                              <div className="w-4 h-4 rounded-full bg-[#2C332E] border border-slate-950 shadow-sm cursor-help" title="Forest Charcoal: #2C332E" />
                              <div className="w-4 h-4 rounded-full bg-[#C96E5C] border border-[#af5846] shadow-sm cursor-help" title="Terracotta: #C96E5C" />
                            </>
                          )}
                          {choice.id === "Cosmic Dark" && (
                            <>
                              <div className="w-4 h-4 rounded-full bg-[#0C0D14] border border-[#242535] shadow-sm cursor-help" title="Absolute Void: #0C0D14" />
                              <div className="w-4 h-4 rounded-full bg-[#121420] border border-[#2c2f44] shadow-sm cursor-help" title="Deep Indigo: #121420" />
                              <div className="w-4 h-4 rounded-full bg-[#E2E8F0] border border-white/20 shadow-sm cursor-help" title="Ice Crystal: #E2E8F0" />
                              <div className="w-4 h-4 rounded-full bg-[#6366F1] border border-indigo-500/55 shadow-sm cursor-help" title="Hyper Aura: #6366F1" />
                            </>
                          )}
                          {choice.id === "Warm Coral" && (
                            <>
                              <div className="w-4 h-4 rounded-full bg-[#FFF9F6] border border-[#f5ded3] shadow-sm cursor-help" title="Peach Pearl Base: #FFF9F6" />
                              <div className="w-4 h-4 rounded-full bg-[#FFEFE8] border border-[#eed0c3] shadow-sm cursor-help" title="Lilac Rose: #FFEFE8" />
                              <div className="w-4 h-4 rounded-full bg-[#3F2D2F] border border-slate-950 shadow-sm cursor-help" title="Sienna Cocoa: #3F2D2F" />
                              <div className="w-4 h-4 rounded-full bg-[#E27D60] border border-[#c46144] shadow-sm cursor-help" title="Glow Salmon: #E27D60" />
                            </>
                          )}
                          {choice.id === "Golden Saffron" && (
                            <>
                              <div className="w-4 h-4 rounded-full bg-[#FAF5EE] border border-[#ebd8bc] shadow-sm cursor-help" title="Saffron Flakes Base: #FAF5EE" />
                              <div className="w-4 h-4 rounded-full bg-[#F7EFE4] border border-[#dfccb0] shadow-sm cursor-help" title="Warm Wheat Linen: #F7EFE4" />
                              <div className="w-4 h-4 rounded-full bg-[#4A3B22] border border-slate-950/20 shadow-sm cursor-help" title="Earth Turmeric: #4A3B22" />
                              <div className="w-4 h-4 rounded-full bg-[#E9A825] border border-amber-600 shadow-sm cursor-help" title="Vibrant Gold Saffron: #E9A825" />
                            </>
                          )}
                        </div>
                      </div>

                      {!isLocked && (
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          isActive ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-350"
                        }`}>
                          {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* WORK HISTORY TIMELINE VIEWPORT */}
          {activeSubTab === "history" && (
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-black text-slate-400 block tracking-widest uppercase">
                📖 Finished Cooks Record
              </span>

              {user.completedSessions.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl bg-[#FAF9F6] flex flex-col items-center justify-center gap-2">
                  <Flame className="w-6 h-6 text-slate-300 animate-pulse" />
                  <p>Your timeline logs are blank. Search recipes and launch the Co-Pilot inside details views!</p>
                  <button
                    onClick={() => onNavigate("pantry")}
                    className="mt-2 px-4 py-2 border border-[#A0855B] bg-[#FAF9F6] text-[#A0855B] hover:bg-[#F1EDE4] font-bold rounded-xl text-[10px] uppercase tracking-wide"
                  >
                    Go Stock Pantry
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...user.completedSessions].reverse().map((session, sidx) => (
                    <div 
                      key={sidx}
                      className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-4 space-y-3 shadow-inner hover:border-slate-350 hover:shadow-xs transition-shadow"
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2 border-b border-slate-200 pb-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 block leading-tight">{session.recipeTitle}</h4>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{new Date(session.timestamp).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-1 items-center">
                          {new Array(5).fill(0).map((_, staridx) => (
                            <Trophy 
                              key={staridx}
                              className={`w-3.5 h-3.5 ${staridx < session.rating ? "text-amber-400 fill-amber-300" : "text-slate-200"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono bg-white border border-slate-150 rounded-xl p-2 font-bold text-slate-700">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase mb-0.5">Clocks</span>
                          <span>{Math.round(session.totalTimeTaken / 60)} min</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase mb-0.5">Accredited</span>
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">+{session.xpEarned} XP</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase mb-0.5">Bonus clock</span>
                          <span>{session.timerAccuracyBonus ? "Earned ⏱️" : "Missed"}</span>
                        </div>
                      </div>

                      {/* Display recipe notes if any */}
                      {session.feedbackNotes && (
                        <div className="bg-white p-2.5 border border-slate-150 rounded-xl text-[11px] leading-relaxed text-slate-500 font-semibold flex items-start gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-350 flex-shrink-0 mt-0.5" />
                          <p>
                            <strong>Notes taken:</strong> "{session.feedbackNotes}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* PROGRESS RESET DANGER ZONE */}
      <div className="bg-rose-50/20 border border-rose-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-mono font-black text-rose-700 block tracking-widest uppercase flex items-center gap-1.5 justify-center md:justify-start">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-pulse" /> Danger Zone
          </span>
          <h4 className="text-sm font-extrabold text-[#A03E3E] leading-snug font-serif">Reset Progressive Cook Statistics</h4>
          <p className="text-xs text-slate-500 max-w-xl">
            This action instantly sets your cooked dishes count to 0, resets your Level to 1, clears your active day streak, and resets your total XP earned back to 0. This cannot be undone.
          </p>
        </div>

        <div>
          {showResetConfirm ? (
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleResetProgress}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-rose-200"
              >
                Yes, Reset Stats
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-5 py-2.5 bg-white border border-rose-350 text-rose-650 hover:bg-rose-50/50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              Reset All Progress
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

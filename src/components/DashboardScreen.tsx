import { UserProfile, Recipe } from "../types";
import { MASTER_RECIPES, ACHIEVEMENTS } from "../data/recipes";
import { Flame, Star, Award, ChevronRight, BookOpen, Clock, Zap, Sparkles, Trophy, ChefHat } from "lucide-react";

interface DashboardScreenProps {
  user: UserProfile;
  onNavigate: (tab: "pantry" | "recipes" | "favorites" | "profile") => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export default function DashboardScreen({ user, onNavigate, onSelectRecipe }: DashboardScreenProps) {
  // Find current tier
  const getTierAndLimits = (lvl: number) => {
    if (lvl <= 5) {
      return { tier: "Apprentice Chef", max: 500, min: 0 };
    } else if (lvl <= 15) {
      return { tier: "Home Chef", max: 2000, min: 500 };
    } else if (lvl <= 25) {
      return { tier: "Professional Chef", max: 5000, min: 2000 };
    } else {
      return { tier: "Master Chef", max: 10000, min: 5000 };
    }
  };

  const { tier, max, min } = getTierAndLimits(user.level);
  const xpInCurrentLevel = user.xp - min;
  const xpNeededForNext = max - min;
  const progressPct = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNext) * 100));

  // Get favorite recipes from MASTER_RECIPES
  const favoriteRecipes = MASTER_RECIPES.filter(r => user.favorites.includes(r.id));

  // Helper for difficulty difficultyBadge
  const getDiffBadge = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "apprentice":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "home chef":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "professional chef":
        return "bg-purple-500/10 text-purple-600 border border-purple-500/20";
      case "master chef":
        return "bg-rose-500/10 text-rose-600 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. HERO PROFILE SUMMARY COMPONENT */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl">
        {/* Absolute Background Ornaments */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-1" />
        <div className="absolute left-1/3 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-1" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full text-[10px] font-mono tracking-wider text-amber-300 font-bold border border-white/5 uppercase">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Streak Booster Active: {user.streak} Days ({user.streak >= 3 ? "1.2x Multiplier!" : "No Multiplier"})</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-amber-200 via-coral-200 to-pink-200 bg-clip-text text-transparent">{user.name}</span>!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Equip your portable pantry box, choose from curated recipes or direct Gemini AI to level up your home-cooking craft.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
            <div className="text-center md:text-right space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 block tracking-widest uppercase">Rank Level</span>
              <span className="text-2xl font-black font-mono tracking-tight text-white">{user.level}</span>
              <span className="text-xs text-amber-400 block font-semibold">{tier}</span>
            </div>
            <div className="w-px h-12 bg-white/15" />
            <div className="text-center md:text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 block tracking-widest uppercase">Exp Balance</span>
              <span className="text-2xl font-black font-mono tracking-tight text-white">{user.xp}</span>
              <span className="text-xs text-slate-300 block font-semibold">XP Total</span>
            </div>
          </div>
        </div>

        {/* Level progress bar display */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-xs text-slate-300 font-mono mb-2">
            <span>Progress to Next Rank</span>
            <span className="font-bold text-white">{xpInCurrentLevel} / {xpNeededForNext} XP ({Math.round(progressPct)}%)</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full transition-all duration-500 shadow-inner"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW BENTO GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Cooked */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase block">Total Cooks</span>
            <span className="text-2xl font-mono font-bold text-slate-800 leading-none">{user.completedSessions.length}</span>
            <span className="text-[10px] text-slate-500 block font-medium mt-1">Dishes simmered</span>
          </div>
        </div>

        {/* Card 2: Current Streak */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase block">Fire Streak</span>
            <span className="text-2xl font-mono font-bold text-slate-800 leading-none">{user.streak} Days</span>
            <span className="text-[10px] text-orange-600 block font-semibold mt-1">1.2x multiplier</span>
          </div>
        </div>

        {/* Card 3: Total XP Points */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase block">Total XP</span>
            <span className="text-2xl font-mono font-bold text-slate-800 leading-none">{user.xp}</span>
            <span className="text-[10px] text-slate-500 block font-medium mt-1">Skill points gained</span>
          </div>
        </div>

        {/* Card 4: Unlocked Achievements */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-black tracking-wider uppercase block">Badges Lock</span>
            <span className="text-2xl font-mono font-bold text-slate-800 leading-none">
              {user.badges.length} / {ACHIEVEMENTS.length}
            </span>
            <span className="text-[10px] text-emerald-600 block font-semibold mt-1">Achievements</span>
          </div>
        </div>
      </div>

      {/* 3. ROW SECTION: HERO ACTIONS + RECIPE FAVORITES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Launcher Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-lg font-serif font-extrabold text-slate-900 tracking-tight">Active Duty</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Launch into the cooking assistant step-by-step suite or refine ingredients sitting in your fridge pantry module.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate("pantry")}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all pointer-cursor shadow-sm"
              >
                <span>Stock Fridge Pantry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate("recipes")}
                className="w-full py-3 px-4 bg-[#FAF9F6] border border-slate-200 hover:bg-[#F1EDE4] text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all pointer-cursor"
              >
                <span>Recommended Recipes</span>
                <ChefHat className="w-4 h-4 text-[#A0855B]" />
              </button>
            </div>

            {/* Chef tip quotes block */}
            <div className="bg-[#FAF9F6] border border-dashed border-[#A0855B]/20 rounded-2xl p-4 text-[11px] text-slate-600 leading-relaxed">
              <span className="font-bold text-[#A0855B] block mb-0.5 uppercase tracking-wide">💡 Kitchen Strategy Tip</span>
              Tapping recipes that match 80%+ of your ingredients prevents wasting pantry items. Use seasoning staples like butter, salt & garlic freely!
            </div>
          </div>
        </div>

        {/* Right Column: Favorites / Pre-selection Shelf */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-serif font-black text-slate-930 tracking-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
              <span>Gourmet Favorites Drawer</span>
            </h3>
            <button
              onClick={() => onNavigate("favorites")}
              className="text-xs font-semibold text-[#A0855B] hover:underline"
            >
              See All Drawer
            </button>
          </div>

          {favoriteRecipes.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center text-xs text-slate-500 space-y-3 shadow-sm">
              <p>Your favorites drawer is clean! Bookmark complex dishes in our discovery lists to build active cookbooks.</p>
              <button
                onClick={() => onNavigate("recipes")}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 font-bold rounded-xl text-[11px] uppercase tracking-wider"
              >
                Explore Recipe Shelf
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteRecipes.slice(0, 4).map((recipe) => (
                <div 
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  className="bg-white rounded-2xl border border-slate-100 p-4 hover:border-[#A0855B] hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${getDiffBadge(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                      <span className="flex items-center text-slate-400 font-medium">
                        <Clock className="w-3 h-3 mr-0.5" />
                        {recipe.prepTime + recipe.cookTime} m
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-slate-900 group-hover:text-[#A0855B]">
                      {recipe.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-[#A0855B] font-mono uppercase font-bold">
                    <span>{recipe.ingredients.length} items needed</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Enter Kitchen Co-Pilot &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

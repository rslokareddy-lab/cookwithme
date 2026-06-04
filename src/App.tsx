import { useState, useEffect } from "react";
import DashboardScreen from "./components/DashboardScreen";
import PantryScreen from "./components/PantryScreen";
import RecipesScreen from "./components/RecipesScreen";
import RecipeDetailScreen from "./components/RecipeDetailScreen";
import CoPilot from "./components/CoPilot";
import PostCookingScreen from "./components/PostCookingScreen";
import LevelUpCelebration from "./components/LevelUpCelebration";
import ProfileScreen from "./components/ProfileScreen";
import { UserProfile, Recipe, CookingPreferences, CookingSession } from "./types";
import { MASTER_RECIPES } from "./data/recipes";
import { 
  ChefHat, Sparkles, Carrot, BookOpen, Heart, Trophy, 
  Settings, Award, Flame, AlertCircle 
} from "lucide-react";

const INITIAL_PROFILE: UserProfile = {
  name: "Sloka Reddy",
  level: 1,
  xp: 0,
  streak: 3, // Active multiplier streak out of the box
  lastCookedDate: (() => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    return yesterdayDate.toLocaleDateString('en-CA');
  })(),
  pantry: [
    { name: "Chicken breast", quantity: "400g", category: "Proteins" },
    { name: "Chicken thighs", quantity: "500g", category: "Proteins" },
    { name: "Mutton pieces", quantity: "500g", category: "Proteins" },
    { name: "Mutton trotters", quantity: "4 pieces", category: "Proteins" },
    { name: "Eggs", quantity: "6 whole", category: "Proteins" },
    { name: "Broccoli", quantity: "1.5 cups", category: "Vegetables" },
    { name: "Garlic cloves", quantity: "8 cloves", category: "Vegetables" },
    { name: "Onion", quantity: "4 whole", category: "Vegetables" },
    { name: "Tomato", quantity: "5 medium", category: "Vegetables" },
    { name: "Potato", quantity: "4 medium", category: "Vegetables" },
    { name: "Ginger", quantity: "2 pieces", category: "Vegetables" },
    { name: "Spinach", quantity: "3 cups", category: "Vegetables" },
    { name: "Carrot", quantity: "2 whole", category: "Vegetables" },
    { name: "Cilantro", quantity: "1 bundle", category: "Vegetables" },
    { name: "Pasta", quantity: "400g", category: "Grains & Grains" },
    { name: "Rice", quantity: "1kg", category: "Grains & Grains" },
    { name: "Bread", quantity: "1 loaf", category: "Grains & Grains" },
    { name: "Tortilla", quantity: "6 pieces", category: "Grains & Grains" },
    { name: "Flour", quantity: "500g", category: "Grains & Grains" },
    { name: "Breadcrumbs", quantity: "200g", category: "Grains & Grains" },
    { name: "Lime", quantity: "3 whole", category: "Fruits" },
    { name: "Heavy cream", quantity: "250ml", category: "Dairy & Liquids" },
    { name: "Mozzarella", quantity: "300g", category: "Dairy & Liquids" },
    { name: "Parmesan cheese", quantity: "150g", category: "Dairy & Liquids" },
    { name: "Cheddar cheese", quantity: "200g", category: "Dairy & Liquids" },
    { name: "Paneer cubes", quantity: "250g", category: "Dairy & Liquids" },
    { name: "Butter", quantity: "250g", category: "Liquid & Oils" },
    { name: "Olive oil", quantity: "500ml", category: "Liquid & Oils" }
  ],
  dietPreferences: [],
  allergies: [],
  favorites: ["garlic-butter-chicken", "lemon-herb-broccoli-pasta"],
  completedSessions: [],
  unlockedThemes: ["Modern Slate"],
  activeTheme: "Modern Slate",
  badges: [],
  shoppingList: []
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_PROFILE);
  const [recipes, setRecipes] = useState<Recipe[]>(MASTER_RECIPES);
  
  // Navigation
  const [activeTab, setActiveTab] = useState<"dashboard" | "pantry" | "recipes" | "favorites" | "profile">("dashboard");
  
  // Custom states for active cooking flows
  const [activeScreen, setActiveScreen] = useState<"tabs" | "detail" | "copilot" | "postcook">("tabs");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeSession, setActiveSession] = useState<CookingSession | null>(null);
  
  // Level-Up Milestone notifications
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [oldLevel, setOldLevel] = useState(1);
  const [newLevel, setNewLevel] = useState(1);

  // API Call states
  const [isLoading, setIsLoading] = useState(false);
  const [apiSource, setApiSource] = useState<string>("offline_fallback");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load profile from Local Storage on mount
  useEffect(() => {
    const cached = localStorage.getItem("cook_mate_profile");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Fallback for fields in case of migrations
        parsed.unlockedThemes = parsed.unlockedThemes || ["Modern Slate"];
        parsed.activeTheme = parsed.activeTheme || "Modern Slate";
        parsed.favorites = parsed.favorites || [];
        parsed.pantry = parsed.pantry || [];
        parsed.completedSessions = parsed.completedSessions || [];
        parsed.shoppingList = parsed.shoppingList || [];
        
        if (parsed.lastCookedDate) {
          const today = new Date().toLocaleDateString('en-CA');
          const yesterdayDate = new Date();
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          const yesterday = yesterdayDate.toLocaleDateString('en-CA');
          
          if (parsed.lastCookedDate !== today && parsed.lastCookedDate !== yesterday) {
            parsed.streak = 0;
          }
        }
        setUser(parsed);
      } catch (e) {
        console.warn("Could not parse cached chef profile, resetting.", e);
      }
    }
  }, []);

  // Update localStorage whenever profile state changes
  const updateUserData = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(updatedProfile));
  };

  // Recipe dynamic generator fetches from custom backend Gemini AI
  const handleQueryRecipes = async (ingredientsList: string[], prefs: CookingPreferences) => {
    setIsLoading(true);
    setToastMessage(null);

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients: ingredientsList,
          preferences: prefs
        })
      });

      if (!response.ok) {
        throw new Error("Kitchen server did not respond correctly.");
      }

      const data = await response.json();
      
      // Inject difficultyNumber if missing
      const processed: Recipe[] = (data.recipes || []).map((r: any) => {
        let diffNum = 1;
        if (r.difficulty.toLowerCase().includes("home") || r.difficulty.toLowerCase().includes("medium")) {
          diffNum = 2;
        } else if (r.difficulty.toLowerCase().includes("professional") || r.difficulty.toLowerCase().includes("hard")) {
          diffNum = 3;
        } else if (r.difficulty.toLowerCase().includes("master") || r.difficulty.toLowerCase().includes("expert")) {
          diffNum = 4;
        }
        return {
          ...r,
          difficultyNumber: diffNum
        };
      });

      // Blend custom dynamic recipes with MASTER_RECIPES to ensure a rich selection
      const filteredMaster = MASTER_RECIPES.filter(m => !processed.some(p => p.id === m.id));
      setRecipes([...processed, ...filteredMaster]);
      setApiSource(data.source || "gemini_api");
      
      // Navigate to search drawer
      setActiveTab("recipes");
      if (processed.length > 0) {
        setToastMessage(`Excellent! Formulated ${processed.length} customized dishes using Gemini AI!`);
      } else {
        setToastMessage("Pantry matching complete. See matched favorites on shelf!");
      }
    } catch (err: any) {
      console.warn("Could not call backend API chef, loaded offline recipe deck instead:", err);
      setRecipes(MASTER_RECIPES);
      setApiSource("offline_fallback");
      setActiveTab("recipes");
      setToastMessage("Using curated fallback recipe book. Perfect for home kitchen staples!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Level XP allocation and badges check
  const handleRecordCookingSession = (finalSession: CookingSession) => {
    const updatedSessions = [...user.completedSessions, finalSession];
    let totalXPEarned = finalSession.xpEarned;
    
    // Dynamic streak calculation
    const today = new Date().toLocaleDateString('en-CA');
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toLocaleDateString('en-CA');

    let nextStreak = user.streak;
    if (!user.lastCookedDate) {
      nextStreak = user.streak > 0 ? user.streak + 1 : 1;
    } else if (user.lastCookedDate === yesterday) {
      nextStreak = user.streak + 1;
    } else if (user.lastCookedDate === today) {
      // Cooked today already, maintain current streak level is perfectly correct
      nextStreak = user.streak;
    } else {
      // Streak broken, start fresh with 1
      nextStreak = 1;
    }

    // Streak multiplier apply
    if (nextStreak >= 3) {
      totalXPEarned = Math.round(totalXPEarned * 1.2);
    }

    const nextXP = user.xp + totalXPEarned;
    
    // Level bracket calculation
    const determineLevel = (pts: number): number => {
      if (pts < 500) {
        return Math.floor(pts / 100) + 1; // Levels 1-5
      } else if (pts < 2000) {
        // Levels 6-15
        return Math.floor((pts - 500) / 150) + 6;
      } else if (pts < 5000) {
        // Levels 16-25
        return Math.floor((pts - 2000) / 300) + 16;
      } else {
        // Level 26+
        return Math.floor((pts - 5000) / 500) + 26;
      }
    };

    const nextLvl = determineLevel(nextXP);
    const hasLeveledUp = nextLvl > user.level;

    // Check themes triggers
    const unlockedThemes = [...user.unlockedThemes];
    if (nextLvl >= 5 && !unlockedThemes.includes("Sage Garden")) {
      unlockedThemes.push("Sage Garden");
    }
    if (nextLvl >= 10 && !unlockedThemes.includes("Cosmic Dark")) {
      unlockedThemes.push("Cosmic Dark");
    }
    if (nextLvl >= 15 && !unlockedThemes.includes("Warm Coral")) {
      unlockedThemes.push("Warm Coral");
    }
    if (nextLvl >= 20 && !unlockedThemes.includes("Golden Saffron")) {
      unlockedThemes.push("Golden Saffron");
    }

    const updatedProfile: UserProfile = {
      ...user,
      xp: nextXP,
      level: nextLvl,
      streak: nextStreak,
      lastCookedDate: today,
      unlockedThemes,
      completedSessions: updatedSessions
    };

    updateUserData(updatedProfile);

    if (hasLeveledUp) {
      setOldLevel(user.level);
      setNewLevel(nextLvl);
      setShowLevelUp(true);
    }

    // Return safely to dashboard
    setActiveScreen("tabs");
    setActiveTab("dashboard");
    setSelectedRecipe(null);
    setActiveSession(null);
    setToastMessage(`Session recorded! Earned +${totalXPEarned} XP!`);
  };

  const handleToggleFavorite = (recipeId: string) => {
    let list = [...user.favorites];
    if (list.includes(recipeId)) {
      list = list.filter(id => id !== recipeId);
    } else {
      list.push(recipeId);
    }
    updateUserData({ ...user, favorites: list });
  };

  const getThemeClass = (theme: string): string => {
    switch (theme) {
      case "Sage Garden":
        return "bg-[#FAF7F2] text-slate-800 theme-sage";
      case "Cosmic Dark":
        return "bg-[#0C0D14] text-white theme-cosmic dark";
      case "Warm Coral":
        return "bg-[#FFF9F6] text-slate-800 theme-coral";
      case "Golden Saffron":
        return "bg-[#FAF5EE] text-slate-800 theme-saffron";
      default:
        return "bg-[#FAF9F6] text-slate-800 theme-slate";
    }
  };

  const getThemeHeaderClass = (theme: string): string => {
    switch (theme) {
      case "Cosmic Dark":
        return "bg-[#121420]/90 border-slate-800 text-white";
      case "Sage Garden":
        return "bg-white/95 border-[#E2DFD8] text-slate-800";
      case "Warm Coral":
        return "bg-white/95 border-[#FFEFE8] text-slate-800";
      case "Golden Saffron":
        return "bg-white/95 border-[#F7EFE4] text-[#4A3B22]";
      default:
        return "bg-white/95 border-slate-200 text-slate-900";
    }
  };

  return (
    <div className={`min-h-screen pb-24 font-sans leading-normal selection:bg-[#FFE5D9] transition-colors duration-300 ${getThemeClass(user.activeTheme)}`}>
      
      {/* 1. BRAND GLOBAL TOP BAR WRAPPER */}
      <header className={`sticky top-0 z-50 border-b shadow-sm backdrop-blur-md ${getThemeHeaderClass(user.activeTheme)}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md">
              <ChefHat className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5 font-serif uppercase">
                <span>CookMate</span>
                <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-amber-400 text-slate-900 rounded-full uppercase tracking-widest border border-amber-500">
                  Co-Pilot v2
                </span>
              </h1>
              <p className="text-[8px] text-[#A0855B] font-mono tracking-widest font-black uppercase">INTERACTIVE GAMIFIED CULINARY ENGINE</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase font-bold">
            <div className="text-right">
              <span className="text-slate-400 text-[8px] block font-black leading-none uppercase">Chef Rating</span>
              <span className="text-xs font-black block">Level {user.level}</span>
            </div>
            <div className="w-px h-8 bg-slate-200/50" />
            <div className="text-right">
              <span className="text-slate-400 text-[8px] block font-black leading-none uppercase">Action Mult</span>
              <span className="text-xs font-black block text-orange-500">x{user.streak >= 3 ? "1.2" : "1.0"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT GATEWAYS */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Dynamic Toast feedback */}
        {toastMessage && (
          <div className="mb-6 p-4 bg-[#FFE5D9] border border-[#F2C6B4] rounded-2xl flex items-center justify-between text-xs text-[#D44D5C] animate-fade-in shadow-sm font-semibold">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button 
              onClick={() => setToastMessage(null)} 
              className="text-[9px] font-mono font-black uppercase tracking-widest text-[#D44D5C] hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* SCREEN BRANCH SWITCHES */}
        {activeScreen === "tabs" && (
          <>
            {activeTab === "dashboard" && (
              <DashboardScreen 
                user={user} 
                onNavigate={(tab) => setActiveTab(tab)} 
                onSelectRecipe={(recipe) => { setSelectedRecipe(recipe); setActiveScreen("detail"); }}
              />
            )}

            {activeTab === "pantry" && (
              <PantryScreen 
                user={user} 
                onChangeUser={updateUserData}
                onSearch={handleQueryRecipes}
                isLoading={isLoading}
              />
            )}

            {activeTab === "recipes" && (
              <RecipesScreen 
                user={user}
                recipes={recipes}
                source={apiSource}
                onSelectRecipe={(recipe) => { setSelectedRecipe(recipe); setActiveScreen("detail"); }}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === "favorites" && (
              <RecipesScreen 
                user={user}
                recipes={recipes.filter(r => user.favorites.includes(r.id))}
                source="favorites_vault"
                onSelectRecipe={(recipe) => { setSelectedRecipe(recipe); setActiveScreen("detail"); }}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === "profile" && (
              <ProfileScreen 
                user={user}
                onChangeUser={updateUserData}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}
          </>
        )}

        {activeScreen === "detail" && selectedRecipe && (
          <RecipeDetailScreen 
            user={user}
            recipe={selectedRecipe}
            onExit={() => setActiveScreen("tabs")}
            onStartCooking={() => setActiveScreen("copilot")}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeScreen === "copilot" && selectedRecipe && (
          <CoPilot 
            recipe={selectedRecipe}
            onExit={() => setActiveScreen("tabs")}
            onCookFinalize={(session) => { setActiveSession(session); setActiveScreen("postcook"); }}
          />
        )}

        {activeScreen === "postcook" && activeSession && (
          <PostCookingScreen 
            user={user}
            session={activeSession}
            onConcludeCooking={handleRecordCookingSession}
          />
        )}

      </main>

      {/* LEVEL-UP MILITARY CELEBRATION SHIELD MODAL */}
      {showLevelUp && (
        <LevelUpCelebration 
          oldLevel={oldLevel}
          newLevel={newLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* 2. PERSISTENT GLOBAL TABS BOTTOM NAVIGATION (Only visible on tabs views!) */}
      {activeScreen === "tabs" && (
        <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#121420] text-white border-t border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
          <div className="max-w-xl mx-auto flex justify-between items-center px-4 py-2 text-center">
            
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 focus:outline-none transition-all ${
                activeTab === "dashboard" ? "text-amber-400 font-extrabold uppercase scale-102" : "text-slate-450 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] font-mono tracking-wider font-semibold">Home</span>
            </button>

            <button
              onClick={() => setActiveTab("pantry")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 focus:outline-none transition-all ${
                activeTab === "pantry" ? "text-amber-400 font-extrabold uppercase scale-102" : "text-slate-450 hover:text-white"
              }`}
            >
              <Carrot className="w-4 h-4" />
              <span className="text-[9px] font-mono tracking-wider font-semibold">Pantry</span>
            </button>

            <button
              onClick={() => setActiveTab("recipes")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 focus:outline-none transition-all ${
                activeTab === "recipes" ? "text-amber-400 font-extrabold uppercase scale-102" : "text-slate-450 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-[9px] font-mono tracking-wider font-semibold">Shelf</span>
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 focus:outline-none transition-all ${
                activeTab === "favorites" ? "text-amber-400 font-extrabold uppercase scale-102" : "text-slate-450 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-[9px] font-mono tracking-wider font-semibold">Favorites</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 focus:outline-none transition-all ${
                activeTab === "profile" ? "text-amber-400 font-extrabold uppercase scale-102" : "text-slate-450 hover:text-white"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="text-[9px] font-mono tracking-wider font-semibold">Profile</span>
            </button>
            
          </div>
        </nav>
      )}

    </div>
  );
}

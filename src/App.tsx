import { useState, useEffect } from "react";
import DashboardScreen from "./components/DashboardScreen";
import PantryScreen from "./components/PantryScreen";
import RecipesScreen from "./components/RecipesScreen";
import RecipeDetailScreen from "./components/RecipeDetailScreen";
import CoPilot from "./components/CoPilot";
import PostCookingScreen from "./components/PostCookingScreen";
import LevelUpCelebration from "./components/LevelUpCelebration";
import ProfileScreen from "./components/ProfileScreen";
import ProfileSelectorScreen from "./components/ProfileSelectorScreen";
import LandingScreen from "./components/LandingScreen";
import TutorialGuide from "./components/TutorialGuide";
import { UserProfile, Recipe, CookingPreferences, CookingSession } from "./types";
import { MASTER_RECIPES } from "./data/recipes";
import { 
  ChefHat, Sparkles, Carrot, BookOpen, Heart, Trophy, 
  Settings, Award, Flame, AlertCircle, Users, HelpCircle 
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
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(MASTER_RECIPES);
  
  // Onboarding & Guided Tour flags
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<"dashboard" | "pantry" | "recipes" | "favorites" | "profile">("dashboard");
  
  // Custom states for active cooking flows
  const [activeScreen, setActiveScreen] = useState<"tabs" | "detail" | "copilot" | "postcook" | "profiles">("tabs");
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

  // Load profiles from Local Storage on mount
  useEffect(() => {
    const cachedProfiles = localStorage.getItem("cook_mate_profiles");
    let loadedProfiles: UserProfile[] = [];
    if (cachedProfiles) {
      try {
        loadedProfiles = JSON.parse(cachedProfiles);
      } catch (e) {
         console.warn("Could not load profiles", e);
      }
    }
    
    // If no profiles existed, fallback to legacy profile or initial profile
    if (!loadedProfiles || loadedProfiles.length === 0) {
      const legacyProfile = localStorage.getItem("cook_mate_profile");
      if (legacyProfile) {
        try {
          loadedProfiles = [JSON.parse(legacyProfile)];
        } catch (e) {
          loadedProfiles = [INITIAL_PROFILE];
        }
      } else {
        loadedProfiles = [INITIAL_PROFILE];
      }
    }
    
    // Ensure all required fields are set
    loadedProfiles = loadedProfiles.map(p => ({
      ...p,
      unlockedThemes: p.unlockedThemes || ["Modern Slate"],
      activeTheme: p.activeTheme || "Modern Slate",
      favorites: p.favorites || [],
      pantry: p.pantry || [],
      completedSessions: p.completedSessions || [],
      shoppingList: p.shoppingList || []
    }));

    setProfiles(loadedProfiles);
    localStorage.setItem("cook_mate_profiles", JSON.stringify(loadedProfiles));

    // Determine currently active profile name
    const cachedActiveName = localStorage.getItem("cook_mate_active_profile_name");
    let activeUser = loadedProfiles.find(p => p.name === cachedActiveName);
    if (!activeUser && loadedProfiles.length > 0) {
      activeUser = loadedProfiles[0];
    }
    if (activeUser) {
      // Validate streak
      if (activeUser.lastCookedDate) {
        const today = new Date().toLocaleDateString('en-CA');
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toLocaleDateString('en-CA');
        
        if (activeUser.lastCookedDate !== today && activeUser.lastCookedDate !== yesterday) {
          activeUser.streak = 0;
        }
      }
      setUser(activeUser);
      localStorage.setItem("cook_mate_profile", JSON.stringify(activeUser));
      localStorage.setItem("cook_mate_active_profile_name", activeUser.name);
    }
  }, []);

  // Update localStorage whenever profile state changes
  const updateUserData = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(updatedProfile));
    
    // Update it in profiles list as well!
    setProfiles(prev => {
      const next = prev.map(p => p.name === updatedProfile.name ? updatedProfile : p);
      localStorage.setItem("cook_mate_profiles", JSON.stringify(next));
      return next;
    });
  };

  const handleSelectProfile = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(profile));
    localStorage.setItem("cook_mate_active_profile_name", profile.name);
    setToastMessage(`Switched active profile to Chef: ${profile.name}!`);
    setActiveTab("dashboard");
    setActiveScreen("tabs");
  };

  const handleCreateProfile = (newProfile: UserProfile) => {
    setProfiles(prev => {
      const next = [...prev, newProfile];
      localStorage.setItem("cook_mate_profiles", JSON.stringify(next));
      return next;
    });
    
    setUser(newProfile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(newProfile));
    localStorage.setItem("cook_mate_active_profile_name", newProfile.name);
    setToastMessage(`Profile compiled! Welcome, Chef ${newProfile.name}!`);
    setActiveTab("dashboard");
    setActiveScreen("tabs");
  };

  const handleDeleteProfile = (nameToDelete: string) => {
    setProfiles(prev => {
      const next = prev.filter(p => p.name !== nameToDelete);
      localStorage.setItem("cook_mate_profiles", JSON.stringify(next));
      
      // Shift active pointer if deleting currently logged user
      if (user.name === nameToDelete && next.length > 0) {
        const fallback = next[0];
        setUser(fallback);
        localStorage.setItem("cook_mate_profile", JSON.stringify(fallback));
        localStorage.setItem("cook_mate_active_profile_name", fallback.name);
      }
      return next;
    });
    
    setToastMessage(`Chef profile "${nameToDelete}" successfully erased.`);
  };

  // Onboarding Slide Triggers
  const handleSignUpOnboardingByLanding = (newProfile: UserProfile) => {
    setProfiles(prev => {
      const next = [...prev.filter(p => p.username !== newProfile.username), newProfile];
      localStorage.setItem("cook_mate_profiles", JSON.stringify(next));
      return next;
    });

    setUser(newProfile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(newProfile));
    localStorage.setItem("cook_mate_active_profile_name", newProfile.name);
    localStorage.setItem("cook_mate_onboarded_v2", "true");
    setHasOnboarded(true);
    setShowTutorial(true);
    setActiveScreen("tabs");
    setActiveTab("dashboard");
    setToastMessage(`Account compiled! Welcome, Chef ${newProfile.name}!`);
  };

  const handleLogInOnboardingByLanding = (selectedProfile: UserProfile) => {
    setUser(selectedProfile);
    localStorage.setItem("cook_mate_profile", JSON.stringify(selectedProfile));
    localStorage.setItem("cook_mate_active_profile_name", selectedProfile.name);
    localStorage.setItem("cook_mate_onboarded_v2", "true");
    setHasOnboarded(true);
    setActiveScreen("tabs");
    setActiveTab("dashboard");
    setToastMessage(`Logged in! Welcome back, Chef ${selectedProfile.name}!`);
  };

  const handleEnterGuest = () => {
    const guestUser: UserProfile = {
      name: "Guest Chef",
      username: "guest_chef",
      isGuest: true,
      level: 1,
      xp: 0,
      streak: 0,
      pantry: [
        { name: "Chicken breast", quantity: "400g", category: "Proteins" },
        { name: "Eggs", quantity: "6 whole", category: "Proteins" },
        { name: "Broccoli", quantity: "1.5 cups", category: "Vegetables" },
        { name: "Garlic cloves", quantity: "8 cloves", category: "Vegetables" },
        { name: "Onion", quantity: "4 whole", category: "Vegetables" },
        { name: "Tomato", quantity: "5 medium", category: "Vegetables" },
        { name: "Pasta", quantity: "400g", category: "Grains & Grains" },
        { name: "Olive oil", quantity: "500ml", category: "Liquid & Oils" },
        { name: "Butter", quantity: "250g", category: "Liquid & Oils" }
      ],
      dietPreferences: [],
      allergies: [],
      favorites: [],
      completedSessions: [],
      unlockedThemes: ["Modern Slate"],
      activeTheme: "Modern Slate",
      badges: [],
      shoppingList: []
    };

    setUser(guestUser);
    localStorage.setItem("cook_mate_profile", JSON.stringify(guestUser));
    localStorage.setItem("cook_mate_active_profile_name", "Guest Chef");
    localStorage.setItem("cook_mate_onboarded_v2", "true");
    setHasOnboarded(true);
    setShowTutorial(true);
    setActiveScreen("tabs");
    setActiveTab("dashboard");
    setToastMessage("Loaded Guest mode! Sign up to gain points, keep a streak, or explore more complex recipes.");
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
    
    if (user.isGuest) {
      const updatedProfile: UserProfile = {
        ...user,
        xp: 0,
        level: 1,
        streak: 0,
        completedSessions: updatedSessions
      };
      updateUserData(updatedProfile);
      setActiveScreen("tabs");
      setActiveTab("dashboard");
      setSelectedRecipe(null);
      setActiveSession(null);
      setToastMessage("Dish successfully prepared! (Guests cannot earn XP or build streaks. Register an account to upgrade level limits.)");
      return;
    }

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

  if (!hasOnboarded) {
    return (
      <LandingScreen 
        onSignUp={handleSignUpOnboardingByLanding}
        onLogIn={handleLogInOnboardingByLanding}
        onEnterGuest={handleEnterGuest}
        profiles={profiles}
      />
    );
  }

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
              <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5 font-serif">
                <span>CookMate</span>
                <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-amber-400 text-slate-900 rounded-full uppercase tracking-widest border border-amber-500">
                  Co-Pilot v2
                </span>
              </h1>
              <p className="text-[8px] text-[#A0855B] font-mono tracking-widest font-black uppercase">YOUR FRIENDLY SMART KITCHEN SIDEKICK</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase font-bold">
            {user.isGuest && (
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("cook_mate_land_mode", "signup");
                  localStorage.removeItem("cook_mate_active_profile_name");
                  setHasOnboarded(false);
                }}
                className="px-3 py-1.5 bg-[#A0855B] hover:bg-[#8F744D] text-white font-sans font-black rounded-lg text-[10px] tracking-wider uppercase transition-all cursor-pointer mr-2 border-none outline-none"
              >
                Sign Up
              </button>
            )}
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
                onSignOut={() => {
                  localStorage.removeItem("cook_mate_active_profile_name");
                  setHasOnboarded(false);
                  setToastMessage("Logged out of profile. Welcome back to CookMate!");
                }}
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

        {activeScreen === "profiles" && (
          <ProfileSelectorScreen 
            currentProfile={user}
            profiles={profiles}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={handleCreateProfile}
            onDeleteProfile={handleDeleteProfile}
            onCancel={() => {
              setActiveScreen("tabs");
              setActiveTab("dashboard");
            }}
            isFirstBoot={profiles.length === 0}
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

      {/* 3. INTERACTIVE TUTORIAL GUIDE PORTAL */}
      {showTutorial && (
        <TutorialGuide 
          onSelectTab={(selectedTab) => setActiveTab(selectedTab)}
          onClose={() => setShowTutorial(false)}
        />
      )}

    </div>
  );
}

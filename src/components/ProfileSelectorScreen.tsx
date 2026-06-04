import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  UserPlus, Users, Check, Trash2, ChefHat, Sliders, 
  Sparkles, ShieldAlert, ArrowRight, Carrot, Flame, Trophy, Egg
} from "lucide-react";

interface ProfileSelectorScreenProps {
  currentProfile: UserProfile;
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onCreateProfile: (newProfile: UserProfile) => void;
  onDeleteProfile: (name: string) => void;
  onCancel: () => void;
  isFirstBoot?: boolean;
}

const DIET_OPTIONS = [
  { value: "Vegetarian", label: "Vegetarian", desc: "No meat, poultry, or fish" },
  { value: "Vegan", label: "Vegan", desc: "Pure plant-based choice" },
  { value: "Gluten-Free", label: "Gluten-Free", desc: "No wheat, barley, or rye staples" },
  { value: "Dairy-Free", label: "Dairy-Free", desc: "No milk, creams, or cheese" },
  { value: "Keto", label: "Keto-Friendly", desc: "High fat, low carb balance" },
];

const ALLERGY_OPTIONS = [
  { value: "Nuts", label: "Peanuts & Tree Nuts" },
  { value: "Seafood", label: "Fish & Shellfish" },
  { value: "Soy", label: "Soy Products" },
  { value: "Dairy", label: "Dairy Lactose Allergy" },
  { value: "Gluten", label: "Wheat/Gluten Sensitive" },
];

const PRESET_STOCK = [
  { name: "Chicken breast", quantity: "400g", category: "Proteins" },
  { name: "Eggs", quantity: "6 whole", category: "Proteins" },
  { name: "Broccoli", quantity: "1.5 cups", category: "Vegetables" },
  { name: "Garlic cloves", quantity: "8 cloves", category: "Vegetables" },
  { name: "Onion", quantity: "4 whole", category: "Vegetables" },
  { name: "Tomato", quantity: "5 medium", category: "Vegetables" },
  { name: "Potato", quantity: "4 medium", category: "Vegetables" },
  { name: "Pasta", quantity: "400g", category: "Grains & Grains" },
  { name: "Rice", quantity: "1kg", category: "Grains & Grains" },
  { name: "Olive oil", quantity: "500ml", category: "Liquid & Oils" },
  { name: "Butter", quantity: "250g", category: "Liquid & Oils" }
];

export default function ProfileSelectorScreen({
  currentProfile,
  profiles,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onCancel,
  isFirstBoot = false
}: ProfileSelectorScreenProps) {
  const [activeSubView, setActiveSubView] = useState<"select" | "signup">(
    isFirstBoot || profiles.length === 0 ? "signup" : "select"
  );

  // Sign up Form states
  const [newName, setNewName] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [startingTheme, setStartingTheme] = useState("Modern Slate");
  const [pantryStockPrefix, setPantryStockPrefix] = useState<"stocked" | "empty">("stocked");

  // Error/validation messages
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const handleToggleDiet = (diet: string) => {
    setSelectedDiet(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleToggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);

    const trimmed = newName.trim();
    if (!trimmed) {
      setFeedbackError("Please specify a valid Chef Name to compile profile.");
      return;
    }

    // Check duplicate
    if (profiles.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setFeedbackError(`Chef profile name "${trimmed}" is already active in records.`);
      return;
    }

    // Create profile configuration
    const freshProfile: UserProfile = {
      name: trimmed,
      level: 1,
      xp: 0,
      streak: 3, // Initial boost multiplier out of the box
      lastCookedDate: (() => {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        return yesterdayDate.toLocaleDateString('en-CA');
      })(),
      pantry: pantryStockPrefix === "stocked" ? [...PRESET_STOCK] : [],
      dietPreferences: selectedDiet,
      allergies: selectedAllergies,
      favorites: [],
      completedSessions: [],
      unlockedThemes: ["Modern Slate", startingTheme].filter((v, i, a) => a.indexOf(v) === i),
      activeTheme: startingTheme,
      badges: [],
      shoppingList: []
    };

    onCreateProfile(freshProfile);
    setNewName("");
    setSelectedDiet([]);
    setSelectedAllergies([]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-slate-800 pb-16">
      
      {/* HEADER HERO AREA */}
      <div className="text-center space-y-3 pt-6">
        <div className="inline-flex p-3.5 bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-900 rounded-2xl shadow-md transform hover:rotate-6 transition-transform">
          <ChefHat className="w-8 h-8 font-black" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
            Configure Chef Profiles
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Create independent profiles for multiple family cooks or wellness targets, keeping XP progress, pantry item caches, and dietary macros fully separated!
          </p>
        </div>

        {/* DIALOG TAB TOGGLES */}
        {!isFirstBoot && profiles.length > 0 && (
          <div className="inline-flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200 text-xs font-bold gap-1 mt-4">
            <button
              type="button"
              onClick={() => { setActiveSubView("select"); setFeedbackError(null); }}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubView === "select"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Users className="w-4 h-4 text-[#A0855B]" />
              <span>Registered Profiles ({profiles.length})</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveSubView("signup"); setFeedbackError(null); }}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubView === "signup"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>Create New Candidate Profile</span>
            </button>
          </div>
        )}
      </div>

      {/* FEEDBACK BANNER */}
      {feedbackError && (
        <div className="p-4 bg-amber-50/85 border border-[#A0855B]/30 text-amber-900 rounded-2xl text-xs font-semibold flex items-center gap-2 max-w-md mx-auto animate-shake">
          <ShieldAlert className="w-4 h-4 text-[#A0855B] flex-shrink-0" />
          <span>{feedbackError}</span>
        </div>
      )}

      {/* PORTAL SUITE PANELS */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        
        {/* VIEW 1: SELECT EXISTING PROFILE */}
        {activeSubView === "select" && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-black text-slate-900">Select Active Profile</h3>
              <p className="text-xs text-slate-400">Choose which registered cook coordinates current stoves and dietary goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map((prof) => {
                const isActive = prof.name === currentProfile.name;
                const totalCooks = prof.completedSessions?.length || 0;
                return (
                  <div 
                    key={prof.name}
                    className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between h-40 ${
                      isActive 
                        ? "border-[#A0855B] bg-gradient-to-br from-[#FAF9F6] to-[#F1EDE4]/30 shadow-md ring-1 ring-[#A0855B]/20" 
                        : "border-slate-150 hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      {/* Avatar initial + Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-tr from-[#A0855B] to-[#6B705C] text-sm text-white font-serif font-black rounded-xl flex items-center justify-center shadow-xs">
                          {prof.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-900 truncate max-w-[150px] leading-tight">
                            {prof.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase">
                            Level {prof.level || 1} Apprentice
                          </span>
                        </div>
                      </div>

                      {/* Selected validation indicator */}
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 bg-[#A0855B] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                          <Check className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectProfile(prof)}
                          className="px-2.5 py-1 text-[10px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer transition-colors"
                        >
                          Select
                        </button>
                      )}
                    </div>

                    {/* Brief stats preview */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono block uppercase">XP Score</span>
                        <span className="text-xs font-black font-mono text-slate-800">{prof.xp} pts</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono block uppercase">Completed</span>
                        <span className="text-xs font-black font-mono text-slate-800">{totalCooks} meals</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono block uppercase">Streak</span>
                        <span className="text-xs font-black font-mono text-orange-600 flex items-center justify-center gap-0.5">
                          <Flame className="w-3 h-3 fill-orange-100" />
                          {prof.streak || 0}d
                        </span>
                      </div>
                    </div>

                    {/* Delete Custom Profile button (prevent deleting the only choice) */}
                    {profiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to permanently erase the chef profile "${prof.name}" and all historical cooked records?`)) {
                            onDeleteProfile(prof.name);
                          }
                        }}
                        title={`Erase profile ${prof.name}`}
                        className="absolute bottom-3 right-3 p-1 text-slate-350 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {isFirstBoot === false && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-xs text-slate-700 cursor-pointer shadow-xs transition-colors"
                >
                  Return to Kitchen Overview
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: SIGN UP NEW PROFILE */}
        {activeSubView === "signup" && (
          <form onSubmit={handleSignUpSubmit} className="p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-black text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>Initialize Chef Candidate (Sign Up)</span>
              </h3>
              <p className="text-xs text-slate-400">Fill in details to compute your customized gamified profile container.</p>
            </div>

            <div className="space-y-4">
              {/* Profile Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Chef/User Nickname</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs">
                    <ChefHat className="w-4 h-4 text-slate-450" />
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={24}
                    placeholder="Enter candidate name (e.g. Master Chef Reddy)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:border-[#A0855B] rounded-2xl text-xs text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Initial Pantry Stashing Preference */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Initial Ingredient Stocking</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPantryStockPrefix("stocked")}
                    className={`p-3 border text-left rounded-xl transition-all ${
                      pantryStockPrefix === "stocked"
                        ? "border-[#A0855B] bg-gradient-to-tr from-[#FAF9F6] to-[#F1EDE4]/30 font-bold"
                        : "border-slate-250 hover:bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span className="text-xs block text-slate-900">Standard Starter Pantry Kit</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Includes standard proteins, vegetables, cheeses & staples to start.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPantryStockPrefix("empty")}
                    className={`p-3 border text-left rounded-xl transition-all ${
                      pantryStockPrefix === "empty"
                        ? "border-emerald-500 bg-emerald-50/20 font-bold"
                        : "border-slate-250 hover:bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span className="text-xs block text-slate-900">Fresh Empty Pantry Shelf</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Start completely blank and log items as you stock them.</span>
                  </button>
                </div>
              </div>

              {/* Dietary Preferences checkboxes */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Wellness Targets (Diet Preset)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DIET_OPTIONS.map((opt) => {
                    const isChecked = selectedDiet.includes(opt.value);
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleToggleDiet(opt.value)}
                        className={`p-2.5 border rounded-xl text-left transition-all flex justify-between items-center ${
                          isChecked 
                            ? "border-emerald-500 bg-emerald-50/20 text-[#6B705C] font-bold" 
                            : "border-slate-200 hover:bg-slate-55 text-slate-600"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs block">{opt.label}</span>
                          <span className="text-[9px] text-slate-400 block font-normal">{opt.desc}</span>
                        </div>
                        {isChecked && (
                          <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs font-bold">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Allergens selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Food Sensitivity Allergens</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGY_OPTIONS.map((opt) => {
                    const isChecked = selectedAllergies.includes(opt.value);
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleToggleAllergy(opt.value)}
                        className={`px-3 py-1.5 border rounded-xl text-xs transition-colors flex items-center gap-1 ${
                          isChecked 
                            ? "bg-amber-50 border-amber-300 text-amber-900 font-bold" 
                            : "bg-[#FAF5EE] hover:bg-slate-105 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isChecked && <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme preference starting choice */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Starting Display Layout Skin</label>
                <div className="grid grid-cols-2 gap-3 select-none">
                  <div 
                    onClick={() => setStartingTheme("Modern Slate")}
                    className={`p-3 border rounded-xl text-left cursor-pointer transition-all ${
                      startingTheme === "Modern Slate" 
                        ? "border-[#A0855B] bg-slate-50 font-bold" 
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs block">Modern Slate (Light)</span>
                    <span className="text-[9.5px] text-slate-400 block font-normal">Cream sand background, high readability.</span>
                  </div>
                  <div 
                    onClick={() => setStartingTheme("Cosmic Dark")}
                    className={`p-3 border rounded-xl text-left cursor-pointer bg-slate-900 border-slate-800 text-white transition-all ${
                      startingTheme === "Cosmic Dark" 
                        ? "border-[#A0855B] font-bold shadow-md" 
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className="text-xs block">Cosmic Dark (Special)</span>
                    <span className="text-[9.5px] text-slate-400 block font-normal">Sleek dark mode theme for midnight stoves.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 justify-between items-center text-xs">
              <span className="text-[10.5px] text-slate-450 text-center sm:text-left">
                Your credentials and metrics store securely inside this browser's standard cookies cache folder.
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                {!isFirstBoot && profiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSubView("select")}
                    className="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Candidate Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}

import React, { useState } from "react";
import { UserProfile, Recipe } from "../types";
import { ChevronLeft, Heart, Clock, Users, ArrowRight, Check, Square, CheckSquare, Sparkles, AlertCircle, ChefHat, Flame, ShieldAlert } from "lucide-react";

export interface NutritionalInfo {
  calories: number;
  protein: string;
  allergens: string[];
}

export function getNutritionalInfo(recipe: Recipe): NutritionalInfo {
  // If explicitly defined on the recipe object, use them
  if (recipe.calories && recipe.protein && recipe.allergens) {
    return {
      calories: recipe.calories,
      protein: recipe.protein,
      allergens: recipe.allergens
    };
  }

  // Pre-determined lookup for popular recipes:
  const lookup: Record<string, Partial<NutritionalInfo>> = {
    "garlic-butter-chicken": { calories: 450, protein: "38g", allergens: ["Dairy"] },
    "lemon-herb-broccoli-pasta": { calories: 520, protein: "14g", allergens: ["Gluten", "Dairy"] },
    "fragrant-garlic-fried-rice": { calories: 420, protein: "12g", allergens: ["Eggs", "Soy"] },
    "aromatic-coconut-curry": { calories: 580, protein: "32g", allergens: [] },
    "gourmet-pan-seared-salmon": { calories: 480, protein: "34g", allergens: ["Fish", "Dairy", "Soy"] },
    "molecular-chocolate-lava": { calories: 390, protein: "6g", allergens: ["Dairy", "Eggs", "Gluten"] },
    "gourmet-mushroom-risotto": { calories: 460, protein: "11g", allergens: ["Dairy"] },
    "fluffy-morning-souffle-pancakes": { calories: 340, protein: "8g", allergens: ["Dairy", "Eggs", "Gluten"] },
    "mediterranean-shakshuka": { calories: 380, protein: "18g", allergens: ["Eggs", "Dairy"] },
    "garlic-butter-wings": { calories: 520, protein: "28g", allergens: ["Dairy"] },
    "bacon-eggs": { calories: 320, protein: "16g", allergens: ["Eggs", "Dairy"] },
    "crispy-pork-belly": { calories: 650, protein: "24g", allergens: ["Soy"] },
    "classic-beef-steak": { calories: 720, protein: "48g", allergens: ["Dairy"] },
    "sesame-chicken-thighs": { calories: 490, protein: "32g", allergens: ["Soy", "Sesame"] },
    "classic-pasta-bolognese": { calories: 610, protein: "28g", allergens: ["Gluten"] },
    "buttered-garlic-shrimp": { calories: 310, protein: "24g", allergens: ["Shellfish", "Dairy"] },
    "lemon-butter-salmon": { calories: 460, protein: "32g", allergens: ["Fish", "Dairy"] },
    "tomato-basil-pasta": { calories: 430, protein: "11g", allergens: ["Gluten"] },
    "creamy-spinach-mushroom-pasta": { calories: 590, protein: "15g", allergens: ["Gluten", "Dairy"] },
    "loaded-sweet-potato": { calories: 290, protein: "8g", allergens: ["Dairy"] },
    "spicy-garlic-noodles": { calories: 410, protein: "9g", allergens: ["Gluten", "Soy"] },
    "avocado-toast-egg": { calories: 355, protein: "11g", allergens: ["Gluten", "Eggs", "Dairy"] },
    "honey-mustard-chicken": { calories: 430, protein: "32g", allergens: [] },
    "zucchini-carrot-salad": { calories: 120, protein: "2g", allergens: [] },
    "cheese-onion-quesadilla": { calories: 440, protein: "18g", allergens: ["Gluten", "Dairy"] },
    "parmesan-asparagus": { calories: 150, protein: "6g", allergens: ["Dairy"] },
    "vanilla-rice-pudding": { calories: 280, protein: "6g", allergens: ["Dairy"] },
    "coconut-curry-shrimp": { calories: 380, protein: "22g", allergens: ["Shellfish"] },
    "egg-fried-rice-easy": { calories: 390, protein: "10g", allergens: ["Eggs", "Soy", "Dairy"] },
    "sausage-roasted-potato": { calories: 560, protein: "18g", allergens: [] },
    "creamy-broccoli-soup": { calories: 240, protein: "7g", allergens: ["Dairy"] },
    "carrot-ginger-soup": { calories: 160, protein: "3g", allergens: [] },
    "chocolate-chip-pancakes": { calories: 480, protein: "9g", allergens: ["Gluten", "Eggs", "Dairy"] },
    "tuna-melt-toast": { calories: 450, protein: "26g", allergens: ["Gluten", "Fish", "Dairy"] },
    "cucumber-avocado-salad": { calories: 180, protein: "3g", allergens: [] },
    "ginger-garlic-beef": { calories: 520, protein: "28g", allergens: ["Soy"] },
    "banana-maple-pancakes": { calories: 390, protein: "6g", allergens: ["Gluten", "Eggs", "Dairy"] },
    "golden-buttered-rice": { calories: 310, protein: "5g", allergens: ["Dairy"] },
    "garlic-butter-mushrooms": { calories: 180, protein: "4g", allergens: ["Dairy"] },
    "greek-yogurt-apple-honey": { calories: 210, protein: "12g", allergens: ["Dairy"] },
    "pork-chops-thyme": { calories: 420, protein: "32g", allergens: ["Dairy"] },
    "honey-apple-snack": { calories: 140, protein: "1g", allergens: [] },
    "parmesan-zucchini-boats": { calories: 290, protein: "16g", allergens: ["Dairy"] },
    "zucchini-paprika-crisps": { calories: 90, protein: "2g", allergens: [] },
    "sweet-chili-chicken-wings": { calories: 490, protein: "26g", allergens: [] },
    "tortilla-mozzarella-pizza": { calories: 380, protein: "14g", allergens: ["Gluten", "Dairy"] },
    "egg-drop-soup": { calories: 120, protein: "7g", allergens: ["Eggs"] },
    "rosemary-roasted-potatoes": { calories: 190, protein: "3g", allergens: [] },
    "coconut-quinoa-pudding": { calories: 260, protein: "6g", allergens: [] },
    "garlic-mozzarella-bread": { calories: 360, protein: "12g", allergens: ["Gluten", "Dairy"] }
  };

  const info = lookup[recipe.id] || {};
  
  // Dynamic fallback heuristics if the ID isn't mapped
  let calories = recipe.calories || info.calories || 350;
  let protein = recipe.protein || info.protein || "12g";
  let allergens = recipe.allergens || info.allergens || [];

  if (!recipe.calories && !info.calories) {
    let base = 200;
    recipe.ingredients.forEach(i => {
      const n = i.name.toLowerCase();
      if (n.includes("chicken") || n.includes("beef") || n.includes("pork") || n.includes("salmon") || n.includes("bacon") || n.includes("wings") || n.includes("sausages") || n.includes("tuna")) base += 150;
      else if (n.includes("egg")) base += 75;
      else if (n.includes("cheese") || n.includes("mozzarella") || n.includes("parmesan") || n.includes("cream")) base += 100;
      else if (n.includes("butter") || n.includes("oil")) base += 80;
      else if (n.includes("pasta") || n.includes("rice") || n.includes("noodl") || n.includes("potato") || n.includes("bread") || n.includes("tortilla") || n.includes("flour")) base += 120;
    });
    calories = Math.min(Math.max(base, 80), 850);
  }

  if (!recipe.protein && !info.protein) {
    let pGrams = 4;
    recipe.ingredients.forEach(i => {
      const n = i.name.toLowerCase();
      if (n.includes("chicken") || n.includes("beef") || n.includes("pork") || n.includes("salmon") || n.includes("sausages") || n.includes("shrimp") || n.includes("tuna")) pGrams += 12;
      else if (n.includes("egg")) pGrams += 6;
      else if (n.includes("cheese") || n.includes("mozzarella") || n.includes("parmesan") || n.includes("yogurt")) pGrams += 4;
    });
    protein = `${pGrams}g`;
  }

  if (!recipe.allergens && !info.allergens) {
    const list: string[] = [];
    recipe.ingredients.forEach(i => {
      const n = i.name.toLowerCase();
      if (n.includes("milk") || n.includes("cheese") || n.includes("mozzarella") || n.includes("parmesan") || n.includes("cream") || n.includes("butter") || n.includes("yogurt")) {
        if (!list.includes("Dairy")) list.push("Dairy");
      }
      if (n.includes("egg")) {
        if (!list.includes("Eggs")) list.push("Eggs");
      }
      if (n.includes("pasta") || n.includes("noodl") || n.includes("bread") || n.includes("tortilla") || n.includes("flour")) {
        if (!list.includes("Gluten")) list.push("Gluten");
      }
      if (n.includes("soy") || n.includes("shoyu")) {
        if (!list.includes("Soy")) list.push("Soy");
      }
      if (n.includes("shrimp") || n.includes("prawn") || n.includes("lobster") || n.includes("crab")) {
        if (!list.includes("Shellfish")) list.push("Shellfish");
      }
      if (n.includes("salmon") || n.includes("fish") || n.includes("tuna")) {
        if (!list.includes("Fish")) list.push("Fish");
      }
      if (n.includes("sesame")) {
        if (!list.includes("Sesame")) list.push("Sesame");
      }
      if (n.includes("peanut")) {
        if (!list.includes("Peanuts")) list.push("Peanuts");
      }
    });
    allergens = list;
  }

  return {
    calories,
    protein,
    allergens
  };
}

interface RecipeDetailScreenProps {
  user: UserProfile;
  recipe: Recipe;
  onExit: () => void;
  onStartCooking: () => void;
  onToggleFavorite: (recipeId: string) => void;
}

export default function RecipeDetailScreen({ user, recipe, onExit, onStartCooking, onToggleFavorite }: RecipeDetailScreenProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const nutritional = getNutritionalInfo(recipe);

  // Check if any of the recipe's allergens are in the user's allergies
  const userMatchedAllergies = nutritional.allergens.filter(allergy => 
    user.allergies?.includes(allergy)
  );

  const toggleChecked = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const hasHeart = user.favorites.includes(recipe.id);

  // Helper dictionary matching level requirements
  const getDifficultyExplanation = (diff: string): string => {
    switch (diff.toLowerCase()) {
      case "apprentice":
        return "This Apprentice-tier recipe contains introductory chopping, basic boiling/searing, and rapid preparation times. Perfect for build-up cooking streaks safely.";
      case "home chef":
        return "This Home Chef-tier recipe introduces intermediate techniques like simmering, reducing, sauce emulsification, or basic timing, spanning 7 to 12 steps.";
      case "professional chef":
      case "professional":
        return "This Professional Chef-tier recipe demands attention, high pan heat, timing precision, and rapid multi-task coordination. Unlocks advanced plating, reduction, and pan sauces.";
      case "master chef":
      case "master":
        return "This Master Chef Expert level recipe covers molecular gastronomy, precise double-boiling, thermal insulation folding, or ultra-specific stopwatch timing constraints.";
      default:
        return "A culinary dish suited for home chefs of all experience ranges.";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm transition-all animate-fade-in block overflow-hidden max-w-4xl mx-auto text-slate-800">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-[#F1EDE4]">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#A0855B] hover:text-[#8C734E] uppercase tracking-wider focus:outline-none"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Shelf Selection</span>
        </button>

        <button
          onClick={() => onToggleFavorite(recipe.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-transform active:scale-95 ${
            hasHeart 
              ? "bg-rose-50 border-rose-100 text-rose-500 fill-rose-500" 
              : "bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/25"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>{hasHeart ? "Is Favorite" : "Bookmark"}</span>
        </button>
      </div>

      {/* 2. BODY LAYOUT HERO */}
      <div className="p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest font-black uppercase bg-slate-100 px-3 py-1.5 border border-slate-200 rounded-lg">
            <span>🍳 Cuisine Style: {recipe.cuisine || "Fusion Gourmet"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight leading-tight max-w-3xl select-all">
            {recipe.title}
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {userMatchedAllergies.length > 0 && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 shadow-inner">
            <div className="p-2 bg-rose-100 text-rose-700 font-black rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-700 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-rose-900 uppercase font-mono tracking-wide flex items-center gap-1.5">
                ⚠️ Allergy warning for your profile
              </h4>
              <p className="text-xs text-rose-650 leading-relaxed font-semibold">
                This recipe contains <span className="font-bold underline text-rose-800">{userMatchedAllergies.join(", ")}</span> which matches target allergies you set on your Profile! Please proceed with caution.
              </p>
            </div>
          </div>
        )}

        {/* BENTO STATS METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2 border-b border-slate-50">
          <div className="bg-[#FAF9F6] border border-slate-150 p-4 rounded-2xl text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Rank Required</span>
            <span className="text-sm font-bold text-slate-800">{recipe.difficulty}</span>
          </div>
          <div className="bg-[#FAF9F6] border border-slate-150 p-4 rounded-2xl text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Kitchen Prep</span>
            <span className="text-sm font-semibold text-slate-800 font-mono">{recipe.prepTime} mins</span>
          </div>
          <div className="bg-[#FAF9F6] border border-slate-150 p-4 rounded-2xl text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Active Sizzle</span>
            <span className="text-sm font-semibold text-[#A0855B] font-mono">{recipe.cookTime} mins</span>
          </div>
          <div className="bg-[#FFE5D9] border border-[#F2C6B4] p-4 rounded-2xl text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#D44D5C] block mb-1">Feast Portions</span>
            <span className="text-sm font-bold text-[#D44D5C] font-mono">{recipe.servings} Servings</span>
          </div>
        </div>

        {/* NUTRITIONAL ASPECT ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2 border-b border-slate-50">
          <div className="bg-emerald-50/45 border border-emerald-100 p-4 rounded-2xl text-center shadow-inner flex flex-col justify-center items-center">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 block mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" /> Calorie Count
            </span>
            <span className="text-sm font-bold text-slate-800 font-mono">
              {nutritional.calories} kcal <span className="text-[10px] text-slate-400 font-normal">/ serving</span>
            </span>
          </div>
          <div className="bg-orange-50/30 border border-orange-100 p-4 rounded-2xl text-center shadow-inner flex flex-col justify-center items-center">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-orange-600 block mb-1">
              💪 Protein Content
            </span>
            <span className="text-sm font-bold text-slate-800 font-mono">
              {nutritional.protein} <span className="text-[10px] text-slate-400 font-normal">/ serving</span>
            </span>
          </div>
          <div className="bg-rose-50/40 border border-rose-100 p-4 rounded-2xl text-center shadow-inner flex flex-col justify-center items-center">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-600 block mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> Potential Allergens
            </span>
            <span className="text-xs font-bold text-slate-700">
              {nutritional.allergens.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-center">
                  {nutritional.allergens.map(item => (
                    <span key={item} className="px-1.5 py-0.5 bg-rose-100/60 text-rose-700 rounded text-[9px] font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-emerald-700 text-[10px] uppercase font-mono tracking-widest font-black">Allergen Free</span>
              )}
            </span>
          </div>
        </div>

        {/* LOWER SPLIT SECTORS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* MISE EN PLACE CHECKLIST COL (Left Column) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase font-mono border-b border-slate-100 pb-2">
                📋 Mise en Place Checklist
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-1 mb-3 bg-[#FAF9F6] px-2.5 py-1.5 rounded-md border border-slate-100">
                Tap box checks to guarantee your ingredients are laid out on your counter.
              </p>
            </div>

            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing, idx) => {
                const checked = !!checkedIngredients[ing.name];
                return (
                  <li 
                    key={ing.name}
                    onClick={() => toggleChecked(ing.name)}
                    className={`flex justify-between items-center text-xs p-3 border rounded-xl select-none cursor-pointer transition-all ${
                      checked 
                        ? "bg-slate-50 border-slate-200 opacity-60 line-through text-slate-400" 
                        : "bg-white border-slate-200 hover:border-slate-350 text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                      <span>{ing.name}</span>
                    </span>
                    <span className={`font-serif px-2 py-0.5 rounded text-xs font-bold ${checked ? "bg-slate-100" : "bg-[#FAF9F6] border border-slate-100 text-slate-800"}`}>
                      {ing.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* TECHNIQUE DETAIL COLUMN (Right Column) */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase font-mono border-b border-slate-100 pb-2">
                🏠 Assumed Base Condiments
              </h3>
              {recipe.pantryStaplesNeeded && recipe.pantryStaplesNeeded.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {recipe.pantryStaplesNeeded.map((staple) => (
                    <span 
                      key={staple}
                      className="text-[10px] px-2.5 py-1 bg-[#FAF9F6] border border-slate-200 text-slate-500 rounded-lg font-bold"
                    >
                      {staple}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 font-mono">Standard household items only (Water, Salt, Pepper, Oil).</p>
              )}
            </div>

            {/* Chef technique details card */}
            <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 space-y-3 shadow-inner">
              <span className="text-[10px] font-mono font-black text-[#A0855B] uppercase block tracking-wider">
                👨🏽‍🍳 Chef's Technique Synopsis
              </span>
              <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                {getDifficultyExplanation(recipe.difficulty)}
              </p>
              <div className="flex items-start gap-2.5 bg-white p-3 border border-slate-100 rounded-xl text-[10px] leading-snug">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-500">
                  Completing this dish grants <strong>50 XP</strong> base points + <strong>{(recipe.difficultyNumber || 1) * 10} XP</strong> level bonus, plus extra points for clock timer accuracy!
                </p>
              </div>
            </div>

            {/* LAUNCH CO-PILOT MAIN BUTTON */}
            {user.isGuest && user.completedSessions && user.completedSessions.length >= 1 ? (
              <div className="bg-[#FAF9F6] border-2 border-dashed border-[#E5E1D8] text-slate-800 rounded-2xl p-4.5 space-y-2 shadow-sm animate-fade-in">
                <div className="flex gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-serif font-black text-slate-950">🔒 Guest Cooking Cap Reached</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                      You cooked your allowed 1 dish in Guest mode! To record unlimited dishes, earn progression badges, keep streaks, or try premium dishes, create a free account.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onStartCooking}
                id="start-cooking-copilot"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase rounded-2xl shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 pointer-cursor focus:outline-none"
              >
                <ChefHat className="w-4.5 h-4.5" />
                <span>Launch Chef Co-Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Plus, X, Carrot, ChefHat, Sparkles, Filter, Trash2, RotateCcw } from "lucide-react";
import { CookingPreferences } from "../types";

interface IngredientSelectorProps {
  onSearch: (ingredients: string[], preferences: CookingPreferences) => void;
  isLoading: boolean;
}

// Popular quick-select shortcuts to speed up user entry
const POPULAR_INGREDIENTS = [
  "Chicken breast", "Beef steak", "Salmon fillet", "Eggs", "Pasta", 
  "Rice", "Broccoli", "Tomato", "Onion", "Garlic", "Spinach", 
  "Potato", "Bell peppers", "Mushroom", "Milk", "Cheese", 
  "Butter", "Olive oil", "Lemon", "Soy sauce", "Pork", "Flour"
];

const DIETARY_OPTIONS = ["None", "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Healthy"];
const STYLE_OPTIONS = ["Any", "Quick & Easy", "Gourmet", "Comfort Food", "Light & Fresh"];

export default function IngredientSelector({ onSearch, isLoading }: IngredientSelectorProps) {
  const [ingredients, setIngredients] = useState<string[]>(["Chicken breast", "Broccoli", "Garlic"]);
  const [customInput, setCustomInput] = useState("");
  const [preferences, setPreferences] = useState<CookingPreferences>({
    diet: "None",
    style: "Any",
    maxTime: 45
  });

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customInput.trim();
    if (!cleaned) return;
    
    // Prevent duplicates
    if (!ingredients.map(i => i.toLowerCase()).includes(cleaned.toLowerCase())) {
      setIngredients([...ingredients, cleaned]);
    }
    setCustomInput("");
  };

  const togglePopularIngredient = (item: string) => {
    const isSelected = ingredients.some(i => i.toLowerCase() === item.toLowerCase());
    if (isSelected) {
      setIngredients(ingredients.filter(i => i.toLowerCase() !== item.toLowerCase()));
    } else {
      setIngredients([...ingredients, item]);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  const clearAllIngredients = () => {
    setIngredients([]);
  };

  const handleSearchSubmit = () => {
    if (ingredients.length === 0) return;
    onSearch(ingredients, preferences);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[var(--color-bento-card-bg)] text-[var(--color-bento-accent)] rounded-2xl">
          <Carrot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-sans">Stock Your Mobile Pantry</h2>
          <p className="text-xs text-slate-500 mt-0.5">Toggle what ingredients are available in your kitchen today.</p>
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleAddCustom} className="flex gap-2 mb-6">
        <input
          type="text"
          id="custom-ingredient-entry"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Type an ingredient (e.g. Garlic, Salmon, Pasta)"
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-bento-accent)] bg-[#FAF9F6] hover:bg-[#F1EDE4]/30 transition-colors"
        />
        <button
          type="submit"
          id="btn-add-ingredient"
          disabled={isLoading}
          className="px-5 py-3 bg-[var(--color-bento-accent)] hover:bg-[#8C734E] text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors focus:ring-2 focus:ring-slate-700 pointer-cursor font-sans disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Popular Presets */}
      <div className="mb-6">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-3">
          ⚡ Quick Select Pantry Staples
        </span>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {POPULAR_INGREDIENTS.map((item) => {
            const isSelected = ingredients.some(i => i.toLowerCase() === item.toLowerCase());
            return (
              <button
                key={item}
                type="button"
                onClick={() => togglePopularIngredient(item)}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-[#6B705C] border-[#6B705C] text-white"
                    : "bg-[#FAF9F6] border-slate-200 text-slate-750 hover:bg-[#F1EDE4]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Ingredients Drawer */}
      <div className="border-t border-b border-slate-100 py-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
            📋 Selected List ({ingredients.length})
          </span>
          {ingredients.length > 0 && (
            <button
              type="button"
              onClick={clearAllIngredients}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 focus:outline-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Pantry</span>
            </button>
          )}
        </div>

        {ingredients.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-2xl bg-[#FAF9F6]">
            Pantry is currently empty! Tap quick select presets or type one.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-xl text-xs font-semibold animate-fade-in"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeIngredient(idx)}
                  className="p-0.5 rounded-full hover:bg-emerald-100 text-emerald-800 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Preferences Section */}
      <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-slate-200 mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#A0855B] uppercase tracking-widest mb-4">
          <Filter className="w-3.5 h-3.5" />
          <span>Chef Preferences</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Diet Choice */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Dietary Profile</label>
            <select
              value={preferences.diet}
              onChange={(e) => setPreferences({ ...preferences, diet: e.target.value })}
              className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--color-bento-accent)] bg-white font-medium text-slate-800"
            >
              {DIETARY_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Cooking Style */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Culinary Style</label>
            <select
              value={preferences.style}
              onChange={(e) => setPreferences({ ...preferences, style: e.target.value })}
              className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--color-bento-accent)] bg-white font-medium text-slate-800"
            >
              {STYLE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Duration Limit */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">Max Cook Time</label>
              <span className="text-xs font-mono font-bold text-[var(--color-bento-accent)]">{preferences.maxTime}m</span>
            </div>
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={preferences.maxTime}
              onChange={(e) => setPreferences({ ...preferences, maxTime: parseInt(e.target.value) })}
              className="w-full accent-[var(--color-bento-accent)] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Find Recipes Button */}
      <button
        type="button"
        onClick={handleSearchSubmit}
        disabled={isLoading || ingredients.length === 0}
        className={`w-full py-4 text-xs font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 text-white shadow transition-all ${
          ingredients.length === 0
            ? "bg-slate-200 cursor-not-allowed shadow-none text-slate-400"
            : isLoading
            ? "bg-[#A0855B] cursor-wait"
            : "bg-slate-900 hover:bg-slate-800 transform hover:-translate-y-0.5"
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-sans">Formulating Bento Recipes...</span>
          </>
        ) : (
          <>
            <ChefHat className="w-5 h-5" />
            <span className="font-sans">Consult Sous-Chef Co-Pilot</span>
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
}

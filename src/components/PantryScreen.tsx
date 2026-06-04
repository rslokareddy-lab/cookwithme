import React, { useState, useEffect } from "react";
import { UserProfile, CookingPreferences } from "../types";
import { Carrot, Plus, X, Search, Filter, Trash2, Sliders, Check, Info, ShoppingBag, ShoppingCart, ArrowLeftRight } from "lucide-react";

interface PantryScreenProps {
  user: UserProfile;
  onChangeUser: (updatedProfile: UserProfile) => void;
  onSearch: (ingredients: string[], preferences: CookingPreferences) => void;
  isLoading: boolean;
}

const PREBUILT_DB = [
  "Chicken breast", "Chicken thighs", "Chicken wings", "Beef steak", "Ground beef", "Pork chops", "Pork belly", "Sausages",
  "Bacon", "Salmon fillet", "Tuna", "Shrimp", "Eggs", "Milk", "Cheese", "Butter",
  "Parmesan cheese", "Mozzarella", "Paneer", "Cheddar cheese", "Goat cheese", "Cream cheese", "Mutton pieces", "Mutton trotters",
  "Heavy cream", "Greek yogurt", "Pasta", "Rice", "Bread", "Tortilla", "Noodles",
  "Quinoa", "Flour", "Breadcrumbs", "Broccoli", "Tomato", "Onion", "Garlic", "Ginger",
  "Spinach", "Potato", "Sweet potato", "Carrot", "Celery", "Bell peppers", "Mushroom",
  "Zucchini", "Cranberries", "Lemon", "Lime", "Avocado", "Olive oil", "Coconut milk",
  "Soy sauce", "Vinegar", "Fish sauce", "Sesame oil", "Curry powder", "Paprika", "Cumin",
  "Oregano", "Thyme", "Rosemary", "Cayenne pepper", "Sugar", "Honey", "Maple syrup",
  "Salt", "Black pepper", "Water", "Baking powder", "Yeast", "Cocoa powder", "Dark chocolate",
  "Vanilla extract", "Asparagus", "Cilantro", "Basil", "Cucumber", "Green beans", "Apple", "Banana"
];

const POPULAR_SHORTCUTS = [
  "Chicken breast", "Chicken wings", "Eggs", "Pasta", "Rice", "Bread", "Broccoli", "Tomato", "Onion", 
  "Garlic", "Cheese", "Butter", "Olive oil", "Lemon", "Soy sauce", "Salt"
];

const INGREDIENT_CATEGORIES_MAP: Record<string, string> = {
  "chicken breast": "Proteins",
  "chicken thighs": "Proteins",
  "chicken wings": "Proteins",
  "beef steak": "Proteins",
  "ground beef": "Proteins",
  "pork chops": "Proteins",
  "pork belly": "Proteins",
  "sausages": "Proteins",
  "bacon": "Proteins",
  "salmon fillet": "Proteins",
  "tuna": "Proteins",
  "shrimp": "Proteins",
  "eggs": "Proteins",
  "pork": "Proteins",
  "mutton pieces": "Proteins",
  "mutton trotters": "Proteins",
  "milk": "Dairy & Liquids",
  "heavy cream": "Dairy & Liquids",
  "greek yogurt": "Dairy & Liquids",
  "cheese": "Dairy & Liquids",
  "parmesan cheese": "Dairy & Liquids",
  "mozzarella": "Dairy & Liquids",
  "paneer": "Dairy & Liquids",
  "paneer cubes": "Dairy & Liquids",
  "cheddar cheese": "Dairy & Liquids",
  "cream cheese": "Dairy & Liquids",
  "goat cheese": "Dairy & Liquids",
  "butter": "Liquid & Oils",
  "olive oil": "Liquid & Oils",
  "sesame oil": "Liquid & Oils",
  "coconut milk": "Liquid & Oils",
  "vinegar": "Liquid & Oils",
  "water": "Liquid & Oils",
  "pasta": "Grains & Grains",
  "rice": "Grains & Grains",
  "bread": "Grains & Grains",
  "tortilla": "Grains & Grains",
  "noodles": "Grains & Grains",
  "quinoa": "Grains & Grains",
  "flour": "Grains & Grains",
  "breadcrumbs": "Grains & Grains",
  "broccoli": "Vegetables",
  "tomato": "Vegetables",
  "onion": "Vegetables",
  "garlic": "Vegetables",
  "ginger": "Vegetables",
  "spinach": "Vegetables",
  "potato": "Vegetables",
  "sweet potato": "Vegetables",
  "carrot": "Vegetables",
  "celery": "Vegetables",
  "bell peppers": "Vegetables",
  "mushroom": "Vegetables",
  "zucchini": "Vegetables",
  "asparagus": "Vegetables",
  "cucumber": "Vegetables",
  "green beans": "Vegetables",
  "cilantro": "Vegetables",
  "basil": "Vegetables",
  "lemon": "Fruits",
  "lime": "Fruits",
  "avocado": "Fruits",
  "cranberries": "Fruits",
  "apple": "Fruits",
  "banana": "Fruits",
  "curry powder": "Spices & Seasonings",
  "paprika": "Spices & Seasonings",
  "cumin": "Spices & Seasonings",
  "oregano": "Spices & Seasonings",
  "thyme": "Spices & Seasonings",
  "rosemary": "Spices & Seasonings",
  "cayenne pepper": "Spices & Seasonings",
  "sugar": "Spices & Seasonings",
  "honey": "Spices & Seasonings",
  "maple syrup": "Spices & Seasonings",
  "salt": "Spices & Seasonings",
  "black pepper": "Spices & Seasonings",
  "soy sauce": "Spices & Seasonings",
  "fish sauce": "Spices & Seasonings",
  "baking powder": "Baking & Extras",
  "yeast": "Baking & Extras",
  "cocoa powder": "Baking & Extras",
  "dark chocolate": "Baking & Extras",
  "vanilla extract": "Baking & Extras"
};

const DIETARY_PROFILES = [
  { id: "Vegetarian", title: "Vegetarian", desc: "No poultry, beef or seafood" },
  { id: "Vegan", title: "Vegan", desc: "No animal products or dairy" },
  { id: "Gluten-Free", title: "Gluten-Free", desc: "No wheat, barley, rye" },
  { id: "Dairy-Free", title: "Dairy-Free", desc: "No milk, cheese or butter" },
  { id: "Keto", title: "Keto Friendly", desc: "High protein, very low carbs" }
];

const STYLE_OPTIONS = ["Any", "Quick & Easy", "Gourmet", "Comfort Food", "Light & Fresh"];

export default function PantryScreen({ user, onChangeUser, onSearch, isLoading }: PantryScreenProps) {
  const [isCupboardOpen, setIsCupboardOpen] = useState(false);
  const [dustParticles, setDustParticles] = useState<Array<{ id: number; dx: number; dy: number; rot: number; delay: number }>>([]);
  
  const [activeSubTab, setActiveSubTab] = useState<"inventory" | "shopping">("inventory");
  const [shopItemName, setShopItemName] = useState("");
  const [shopItemQty, setShopItemQty] = useState("");

  const handleAddShoppingItem = (name: string, qty?: string) => {
    const cleaned = name.trim();
    if (!cleaned) return;
    const currentList = user.shoppingList || [];
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: cleaned,
      quantity: qty?.trim() || undefined,
      checked: false
    };
    onChangeUser({
      ...user,
      shoppingList: [...currentList, newItem]
    });
    setShopItemName("");
    setShopItemQty("");
  };

  const handleToggleShoppingItem = (id: string) => {
    const newList = (user.shoppingList || []).map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    onChangeUser({ ...user, shoppingList: newList });
  };

  const handleDeleteShoppingItem = (id: string) => {
    const newList = (user.shoppingList || []).filter(item => item.id !== id);
    onChangeUser({ ...user, shoppingList: newList });
  };

  const handleTransferCheckedToPantry = () => {
    const currentList = user.shoppingList || [];
    const checkedItems = currentList.filter(item => item.checked);
    if (checkedItems.length === 0) return;

    let updatedPantry = [...user.pantry];
    checkedItems.forEach(item => {
      const isDup = updatedPantry.some(p => p.name.toLowerCase() === item.name.toLowerCase());
      if (isDup) {
        updatedPantry = updatedPantry.map(p => {
          if (p.name.toLowerCase() === item.name.toLowerCase()) {
            return { ...p, quantity: item.quantity || p.quantity };
          }
          return p;
        });
      } else {
        const cat = getAutoCategory(item.name);
        updatedPantry.push({
          name: item.name,
          quantity: item.quantity,
          category: cat
        });
      }
    });

    const remainShoppingList = currentList.filter(item => !item.checked);

    onChangeUser({
      ...user,
      pantry: updatedPantry,
      shoppingList: remainShoppingList
    });
  };

  const handleClearShoppingList = () => {
    onChangeUser({ ...user, shoppingList: [] });
  };

  const playCreakSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      for (let i = 0; i < 8; i++) {
        const delay = i * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(120 - i * 12, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.012, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.05);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.05);
      }
    } catch { /* Silent fallback */ }
  };

  const handleOpenCupboardClick = () => {
    setIsCupboardOpen(true);
    playCreakSound();

    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random() + i,
      dx: (Math.random() - 0.5) * 250,
      dy: -60 - Math.random() * 120,
      rot: Math.random() * 360,
      delay: Math.random() * 0.2
    }));
    setDustParticles(newParticles);

    setTimeout(() => {
      setDustParticles([]);
    }, 1800);
  };

  const [customInput, setCustomInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [suggestedList, setSuggestedList] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [diet, setDiet] = useState<string>("None");
  const [style, setStyle] = useState<string>("Any");
  const [maxTime, setMaxTime] = useState<number>(45);

  // Sync state from user preferences on mount
  useEffect(() => {
    if (user.dietPreferences && user.dietPreferences.length > 0) {
      setDiet(user.dietPreferences[0]);
    }
  }, [user]);

  // Handle auto-suggest
  useEffect(() => {
    if (!customInput.trim()) {
      setSuggestedList([]);
      return;
    }
    const query = customInput.toLowerCase();
    const matches = PREBUILT_DB.filter(
      item => item.toLowerCase().includes(query) && 
      !user.pantry.some(p => p.name.toLowerCase() === item.toLowerCase())
    ).slice(0, 5);
    setSuggestedList(matches);
  }, [customInput, user.pantry]);

  const getAutoCategory = (name: string): string => {
    const cleaned = name.toLowerCase().trim();
    for (const key in INGREDIENT_CATEGORIES_MAP) {
      if (cleaned.includes(key)) {
        return INGREDIENT_CATEGORIES_MAP[key];
      }
    }
    return "Pantry Staples";
  };

  const handleAddIngredient = (name: string, quantity?: string) => {
    const cleanedName = name.trim();
    if (!cleanedName) return;

    // Check if duplicate
    const isDup = user.pantry.some(p => p.name.toLowerCase() === cleanedName.toLowerCase());
    if (isDup) {
      // Update quantity instead
      const updated = user.pantry.map(p => {
        if (p.name.toLowerCase() === cleanedName.toLowerCase()) {
          return { ...p, quantity: quantity || p.quantity };
        }
        return p;
      });
      onChangeUser({ ...user, pantry: updated });
    } else {
      const cat = getAutoCategory(cleanedName);
      const newItem = {
        name: cleanedName,
        quantity: quantity || undefined,
        category: cat
      };
      onChangeUser({
        ...user,
        pantry: [...user.pantry, newItem]
      });
    }

    setCustomInput("");
    setQtyInput("");
    setSuggestedList([]);
  };

  const handleRemoveIngredient = (name: string) => {
    onChangeUser({
      ...user,
      pantry: user.pantry.filter(p => p.name.toLowerCase() !== name.toLowerCase())
    });
  };

  const handleClearPantry = () => {
    onChangeUser({ ...user, pantry: [] });
  };

  const togglePopularShortcut = (name: string) => {
    const exists = user.pantry.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      handleRemoveIngredient(name);
    } else {
      handleAddIngredient(name);
    }
  };

  const handleSearchSubmit = () => {
    if (user.pantry.length === 0) return;
    const ingNames = user.pantry.map(p => p.name);
    onSearch(ingNames, { diet, style, maxTime });
  };

  const toggleDietPreference = (dietName: string) => {
    const updatedDiet = diet === dietName ? "None" : dietName;
    setDiet(updatedDiet);
    onChangeUser({
      ...user,
      dietPreferences: updatedDiet !== "None" ? [updatedDiet] : []
    });
  };

  // Group pantry items dynamically
  const groupedPantry: Record<string, typeof user.pantry> = {};
  user.pantry.forEach(item => {
    const cat = item.category || "Pantry Staples";
    if (!groupedPantry[cat]) {
      groupedPantry[cat] = [];
    }
    groupedPantry[cat].push(item);
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      
      {/* SECTION HEADER CARD */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
            <Carrot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-black tracking-tight text-slate-900">Virtual Fridge Pantry</h2>
            <p className="text-xs text-slate-500">Add ingredients you currently have. We save search items automatically across sessions.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              showPreferences 
                ? "bg-slate-900 border-transparent text-white shadow-sm" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Filters [{diet !== "None" ? "1 Diet" : "0"}]</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB NAVIGATOR */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab("inventory")}
          className={`pb-3 px-6 text-xs font-mono font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "inventory"
              ? "border-[#A0855B] text-slate-900 font-extrabold"
              : "border-transparent text-slate-400 hover:text-slate-800"
          }`}
        >
          <Carrot className="w-4 h-4" />
          <span>My Pantry Cabinet</span>
        </button>
        <button
          onClick={() => setActiveSubTab("shopping")}
          className={`pb-3 px-6 text-xs font-mono font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "shopping"
              ? "border-[#A0855B] text-slate-900 font-extrabold"
              : "border-transparent text-slate-400 hover:text-slate-800"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Shopping List</span>
          {user.shoppingList && user.shoppingList.length > 0 && (
            <span className="bg-rose-500 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-full font-black leading-none animate-bounce">
              {user.shoppingList.filter(item => !item.checked).length}
            </span>
          )}
        </button>
      </div>

      {/* EXPANDABLE CHEF PREFERENCES */}
      {showPreferences && (
        <div className="bg-[#FAF9F6] border border-slate-250 p-6 rounded-3xl space-y-5 animate-fade-in shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-mono font-bold text-[#A0855B] uppercase tracking-widest flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              <span>Tailored Dietary & Time Settings</span>
            </span>
            <button 
              onClick={() => { setDiet("None"); setStyle("Any"); setMaxTime(45); }}
              className="text-[10px] uppercase font-bold text-slate-500 hover:text-slate-800 focus:outline-none"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diet Options checkboxes */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block">Dietary Exclusions</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DIETARY_PROFILES.map((profile) => {
                  const active = diet === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => toggleDietPreference(profile.id)}
                      className={`text-left p-2.5 rounded-xl border transition-all text-xs flex justify-between items-center ${
                        active 
                          ? "bg-emerald-50 border-emerald-250 text-emerald-800" 
                          : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="font-bold">{profile.title}</div>
                        <div className="text-[9px] opacity-75">{profile.desc}</div>
                      </div>
                      {active && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time & Culinary Options */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase block mb-2">Cooking Style Mode</span>
                <div className="flex flex-wrap gap-1.5">
                  {STYLE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setStyle(opt)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        style === opt 
                          ? "bg-slate-900 text-white border-transparent" 
                          : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] font-mono font-black text-slate-400 tracking-wider uppercase mb-2">
                  <span>Max Total Simmer Clock</span>
                  <span className="text-xs font-bold text-[#A0855B]">{maxTime} min limit</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={maxTime}
                  onChange={(e) => setMaxTime(parseInt(e.target.value))}
                  className="w-full accent-[#A0855B] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold px-1 mt-0.5">
                  <span>15m Speed-cook</span>
                  <span>120m Slow-simmer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN LAYOUT: ENTRY ON LEFT, PANTRY CABINET ON RIGHT */}
      {activeSubTab === "inventory" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: ADD PANTRY TOOLS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-serif font-bold text-slate-900">Add Available Items</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddIngredient(customInput, qtyInput); }} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Steak, Onion)"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />

                {/* AUTOCOMPLETE SUGGEST DRAWER */}
                {suggestedList.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-25">
                    <span className="text-[9px] font-mono text-slate-400 px-3.5 py-1.5 block bg-slate-50 border-b border-slate-100 font-bold uppercase">Quick Match Suggestions</span>
                    {suggestedList.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleAddIngredient(item)}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-55 text-xs text-slate-700 font-medium border-b border-slate-50 last:border-0 hover:bg-[#FAF9F6] flex justify-between items-center"
                      >
                        <span>{item}</span>
                        <span className="text-[9px] opacity-60 bg-slate-100 px-1.5 py-0.5 rounded uppercase">Add +</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Optional quantity (e.g. 500g, 2 pieces)"
                  value={qtyInput}
                  onChange={(e) => setQtyInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleAddIngredient(customInput, qtyInput)}
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 md:px-6 text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all focus:outline-none pointer-cursor"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert</span>
                </button>
              </div>
            </form>

            {/* QUICK PRESETS INGREDIENTS CHECKS */}
            <div className="border-t border-slate-100 pt-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block mb-3">
                ⚡ Rapid Select Kitchen Items
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {POPULAR_SHORTCUTS.map(item => {
                  const hasIt = user.pantry.some(p => p.name.toLowerCase() === item.toLowerCase());
                  return (
                    <button
                      key={item}
                      onClick={() => togglePopularShortcut(item)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
                        hasIt 
                          ? "bg-[#6B705C] border-[#6B705C] text-white shadow-sm" 
                          : "bg-[#FAF9F6] border-slate-200 text-slate-700 hover:bg-[#F1EDE4]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VIRTUAL 3D CUPBOARD CABINET & SHELVES */}
        <div className="lg:col-span-7 relative min-h-[480px]">
          
          {/* Dust / Kitchen sparkles particle explosions emitter */}
          {dustParticles.map(p => (
            <div 
              key={p.id}
              className="absolute pointer-events-none w-2 h-2 rounded-full bg-amber-400 select-none z-55 animate-drift-particle"
              style={{
                left: `calc(50% + ${p.dx}px)`,
                top: `calc(35% + ${p.dy}px)`,
                "--dx": `${p.dx * 1.5}px`,
                "--dy": `${p.dy * 1.5}px`,
                "--rot": `${p.rot}deg`,
                "--duration": `${1.2 + Math.random() * 0.5}s`,
                animationDelay: `${p.delay}s`
              } as React.CSSProperties}
            />
          ))}

          {!isCupboardOpen ? (
            /* 1. CLOSED DOUBLE WOODEN CABINET DOORS STATE */
            <div 
              onClick={handleOpenCupboardClick}
              id="pantry-cupboard-closed"
              className="relative rounded-3xl overflow-hidden shadow-lg bg-[#24170e] hover:shadow-2xl transition-all duration-300 border-4 border-[#3e271a] p-6 text-center cursor-pointer min-h-[500px] flex flex-col justify-between group select-none"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {/* Wood panels decoration overlay */}
              <div className="absolute inset-1.5 border-2 border-[#5c3c26] rounded-2xl pointer-events-none" />
              
              {/* Double Doors layout splitting down the center */}
              <div className="absolute inset-0 flex pointer-events-none">
                {/* Left wing handle cover door */}
                <div 
                  className="w-1/2 h-full bg-gradient-to-r from-[#704b2c] via-[#855935] to-[#593b22] border-r-4 border-slate-950/50 relative flex flex-col justify-between p-4"
                  style={{
                    boxShadow: "inset -12px 0 20px rgba(0,0,0,0.4)"
                  }}
                >
                  <div className="text-[8px] font-mono tracking-widest text-[#ffd3ae] opacity-25">PANEL L</div>
                  {/* Handle Knob brass */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 border-2 border-yellow-700 absolute right-3.5 top-1/2 -mt-2.5 shadow-md group-hover:scale-110 transition-transform" />
                  <div className="text-[7px] font-mono tracking-widest text-slate-400 opacity-20">0.0.0.0 HOST INDEPENDENT</div>
                </div>

                {/* Right wing handle cover door */}
                <div 
                  className="w-1/2 h-full bg-gradient-to-l from-[#704b2c] via-[#855935] to-[#593b22] border-l-4 border-slate-950/50 relative flex flex-col justify-between p-4"
                  style={{
                    boxShadow: "inset 12px 0 20px rgba(0,0,0,0.4)"
                  }}
                >
                  <div className="text-[8px] font-mono tracking-widest text-[#ffd3ae] opacity-25 text-right">PANEL R</div>
                  {/* Handle Knob brass */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 border-2 border-yellow-700 absolute left-3.5 top-1/2 -mt-2.5 shadow-md group-hover:scale-110 transition-transform" />
                  <div className="text-[7px] font-mono tracking-widest text-slate-400 opacity-20 text-right">COOKMATE VAULT</div>
                </div>
              </div>

              {/* Plaque banner overlay */}
              <div className="relative z-10 m-auto" style={{ transform: "translateZ(30px)" }}>
                <div className="bg-[#FFFFFF] border-4 border-double border-[#A0855B] text-slate-800 rounded-3xl p-6 shadow-xl max-w-sm mx-auto space-y-2 group-hover:scale-105 transition-transform">
                  <span className="p-2 bg-amber-50 text-amber-500 rounded-xl inline-block mb-1">
                    <Carrot className="w-6 h-6 animate-pulse" />
                  </span>
                  <h3 className="text-base font-serif font-black tracking-widest text-[#A0855B] uppercase">COOKMATE PANTRY</h3>
                  <div className="w-16 h-0.5 bg-[#A0855B]/30 mx-auto" />
                  <p className="text-[10px] text-slate-450 font-semibold tracking-wider leading-relaxed">
                    Tap to Open Cupboard Doors & Stock your Shelf Ingredients!
                  </p>
                </div>
              </div>

              <div className="relative z-10 text-[9px] font-mono uppercase tracking-widest text-amber-100/50 block font-bold leading-none animate-pulse">
                🚪 Interactive Physics Simulated
              </div>
            </div>
          ) : (
            /* 2. OPEN CUPBOARD STAGE - SHELVES & CONTROLLER */
            <div className="relative rounded-3xl border-4 border-[#50341e] bg-[#2d1a0e] shadow-xl px-12 py-5 md:px-14 md:py-6 min-h-[500px] flex flex-col justify-between overflow-hidden text-slate-800">
              
              {/* SVG wood texture backdrop */}
              <div className="absolute inset-0 bg-[#351e10] opacity-90 pointer-events-none -z-1" />
              
              {/* Opened Left door swing simulation overlay */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#50341e] to-[#2d1a0e] shadow-2xl z-20 pointer-events-none"
                style={{
                  transform: "skewY(-5deg) scaleX(0.7)",
                  borderRight: "3px solid rgba(0,0,0,0.5)"
                }}
              />
              <div 
                className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#50341e] to-[#2d1a0e] shadow-2xl z-20 pointer-events-none"
                style={{
                  transform: "skewY(5deg) scaleX(0.7)",
                  borderLeft: "3px solid rgba(0,0,0,0.5)"
                }}
              />

              <div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4 text-white">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Cabinet Inventory ({user.pantry.length})</span>
                    <h4 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-1">
                      <span>Inside the Cupboard Shelves</span>
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCupboardOpen(false)}
                      className="text-[10px] font-mono tracking-widest font-black uppercase text-amber-200/70 hover:text-white bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg focus:outline-none transition-all cursor-pointer"
                    >
                      Close Doors 🚪
                    </button>
                    {user.pantry.length > 0 && (
                      <button
                        onClick={handleClearPantry}
                        className="text-xs font-semibold text-red-300 hover:text-red-105 transition-colors flex items-center gap-1 focus:outline-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Empty</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* VISUAL WOOD SHELVES CONTAINER FOR CATEGORIES */}
                {user.pantry.length === 0 ? (
                  <div className="text-center py-16 text-amber-100/50 font-medium text-xs border-2 border-dashed border-white/10 rounded-2xl bg-black/10 mt-4 flex flex-col items-center justify-center gap-2">
                    <Carrot className="w-8 h-8 text-amber-400/50 animate-pulse" />
                    <p className="max-w-xs font-medium">Cabinet shelves are empty! Pack ingredients using the left stocking form.</p>
                  </div>
                ) : (
                  <div className="space-y-6 mt-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Shelf Category Row 1: Proteins */}
                    <div className="space-y-1.5 relative pb-3">
                      <span className="text-[10px] font-mono font-black text-amber-200 uppercase block tracking-wider bg-black/20 px-2 py-0.5 rounded w-fit">
                        🥩 Shelf 1: Proteins & Fresh Cuts
                      </span>
                      <div className="flex flex-wrap gap-2 py-2 min-h-[44px]">
                        {(user.pantry.filter(p => p.category === "Proteins").length > 0) ? (
                          user.pantry.filter(p => p.category === "Proteins").map(item => (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-tr from-rose-50 to-white text-slate-800 border border-rose-100 rounded-xl text-xs font-bold animate-fade-in shadow-sm"
                            >
                              <span>{item.name}</span>
                              {item.quantity && <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1 rounded">{item.quantity}</span>}
                              <button onClick={() => handleRemoveIngredient(item.name)} className="p-0.5 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-amber-100/35 block italic pl-2 py-1">Hold eggs, steaks & chops here</span>
                        )}
                      </div>
                      {/* Physical visual wood shelf bar divider */}
                      <div className="h-2.5 w-full shelf-wood rounded-full" />
                    </div>

                    {/* Shelf Category Row 2: Greens & Vegetables */}
                    <div className="space-y-1.5 relative pb-3">
                      <span className="text-[10px] font-mono font-black text-amber-200 uppercase block tracking-wider bg-black/20 px-2 py-0.5 rounded w-fit">
                        🥦 Shelf 2: Greens, Fruits & Vegetables
                      </span>
                      <div className="flex flex-wrap gap-2 py-2 min-h-[44px]">
                        {(user.pantry.filter(p => ["Vegetables", "Fruits"].includes(p.category || "")).length > 0) ? (
                          user.pantry.filter(p => ["Vegetables", "Fruits"].includes(p.category || "")).map(item => (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-tr from-emerald-50 to-white text-slate-800 border border-emerald-100 rounded-xl text-xs font-bold animate-fade-in shadow-sm"
                            >
                              <span>{item.name}</span>
                              {item.quantity && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1 rounded">{item.quantity}</span>}
                              <button onClick={() => handleRemoveIngredient(item.name)} className="p-0.5 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-amber-100/35 block italic pl-2 py-1">Stock mushrooms, onions & garlic here</span>
                        )}
                      </div>
                      {/* Physical visual wood shelf bar divider */}
                      <div className="h-2.5 w-full shelf-wood rounded-full" />
                    </div>

                    {/* Shelf Category Row 3: Liquids & Dairy */}
                    <div className="space-y-1.5 relative pb-3">
                      <span className="text-[10px] font-mono font-black text-amber-200 uppercase block tracking-wider bg-black/20 px-2 py-0.5 rounded w-fit">
                        🥛 Shelf 3: Liquid Fats, Grains & Dairy
                      </span>
                      <div className="flex flex-wrap gap-2 py-2 min-h-[44px]">
                        {(user.pantry.filter(p => ["Dairy & Liquids", "Liquid & Oils", "Grains & Grains"].includes(p.category || "")).length > 0) ? (
                          user.pantry.filter(p => ["Dairy & Liquids", "Liquid & Oils", "Grains & Grains"].includes(p.category || "")).map(item => (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-tr from-blue-50 to-white text-slate-800 border border-blue-100 rounded-xl text-xs font-bold animate-fade-in shadow-sm"
                            >
                              <span>{item.name}</span>
                              {item.quantity && <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1 rounded">{item.quantity}</span>}
                              <button onClick={() => handleRemoveIngredient(item.name)} className="p-0.5 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-amber-100/35 block italic pl-2 py-1">Hold milk, cheese, oil & pasta here</span>
                        )}
                      </div>
                      {/* Physical visual wood shelf bar divider */}
                      <div className="h-2.5 w-full shelf-wood rounded-full" />
                    </div>

                    {/* Shelf Category Row 4: Staples & Spices */}
                    <div className="space-y-1.5 relative pb-3">
                      <span className="text-[10px] font-mono font-black text-amber-200 uppercase block tracking-wider bg-black/20 px-2 py-0.5 rounded w-fit">
                        🧂 Shelf 4: Seasonings & Dry Staples
                      </span>
                      <div className="flex flex-wrap gap-2 py-2 min-h-[44px]">
                        {(user.pantry.filter(p => ["Spices & Seasonings", "Baking & Extras", "Pantry Staples"].includes(p.category || "")).length > 0) ? (
                          user.pantry.filter(p => ["Spices & Seasonings", "Baking & Extras", "Pantry Staples"].includes(p.category || "")).map(item => (
                            <span
                              key={item.name}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-tr from-amber-50 to-white text-slate-800 border border-amber-100 rounded-xl text-xs font-bold animate-fade-in shadow-sm"
                            >
                              <span>{item.name}</span>
                              {item.quantity && <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-1 rounded">{item.quantity}</span>}
                              <button onClick={() => handleRemoveIngredient(item.name)} className="p-0.5 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-amber-100/35 block italic pl-2 py-1">Place salt, pepper, curry powder & flour here</span>
                        )}
                      </div>
                      {/* Physical visual wood shelf bar divider */}
                      <div className="h-2.5 w-full shelf-wood rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* RECOMMENDER CONSOLE TRIGGER */}
              <div className="pt-4 border-t border-white/10 mt-4">
                <button
                  onClick={handleSearchSubmit}
                  disabled={isLoading || user.pantry.length === 0}
                  className={`w-full py-4 text-xs font-black uppercase tracking-[0.12em] rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all focus:outline-none ${
                    user.pantry.length === 0
                      ? "bg-slate-700/50 text-slate-400 cursor-not-allowed shadow-none"
                      : isLoading
                      ? "bg-amber-600 text-white cursor-wait"
                      : "bg-[#ffd3ae] hover:bg-[#ffe3cb] text-slate-900 font-extrabold focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Formulating Custom Chef Recipe Guides...</span>
                    </>
                  ) : (
                    <>
                      <span>Simulate Matches & Unlock Recipes</span>
                    </>
                  )}
                </button>
                {user.pantry.length > 0 && !isLoading && (
                  <p className="text-[9px] text-[#ffd3ae]/60 text-center mt-2.5 font-mono flex items-center justify-center gap-1.5 uppercase font-medium">
                    <Info className="w-3.5 h-3.5 text-amber-200/50" />
                    <span>Dynamic Gemini AI creates perfect customized measurements.</span>
                  </p>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Groceries Form & Shortcuts */}
          <div className="lg:col-span-5 space-y-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 space-y-4 shadow-sm">
              <div>
                <h3 className="text-base font-serif font-black text-slate-900 leading-tight">Add to Shopping List</h3>
                <p className="text-[11px] text-slate-450 mt-1">Groceries you plan to buy. You can transfer them to your pantry in one-click once bought!</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleAddShoppingItem(shopItemName, shopItemQty); }} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Grocery item name (e.g. Eggs, Soy milk)"
                    value={shopItemName}
                    onChange={(e) => setShopItemName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] transition-colors"
                  />
                  <ShoppingCart className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Qty/Size (e.g. 1L, 2 cartons)"
                    value={shopItemQty}
                    onChange={(e) => setShopItemQty(e.target.value)}
                    className="flex-1 px-4 py-3 border border-slate-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] transition-colors font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Shopping presets list */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[10px] font-mono tracking-widest text-[#A0855B] uppercase font-black block mb-3">
                  💡 Fast-Add Core Pantry Groceries
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {[
                    { name: "Milk", qty: "1L" },
                    { name: "Eggs", qty: "6 whole" },
                    { name: "Bread", qty: "1 loaf" },
                    { name: "Butter", qty: "250g" },
                    { name: "Cheese", qty: "200g" },
                    { name: "Onion", qty: "4 whole" },
                    { name: "Tomato", qty: "5 medium" },
                    { name: "Garlic", qty: "1 bundle" },
                    { name: "Chicken breast", qty: "500g" },
                    { name: "Olive oil", qty: "500ml" },
                    { name: "Lime", qty: "3 whole" },
                    { name: "Cilantro", qty: "1 bundle" }
                  ].map(item => {
                    const alreadyAdded = (user.shoppingList || []).some(s => s.name.toLowerCase() === item.name.toLowerCase());
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleAddShoppingItem(item.name, item.qty)}
                        disabled={alreadyAdded}
                        className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                          alreadyAdded
                            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-[#FAF9F6] border-slate-200 text-slate-700 hover:bg-[#F1EDE4]"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className="text-[9.5px] opacity-60 font-mono font-bold">({item.qty})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Active Groceries trolley */}
          <div className="lg:col-span-7 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 min-h-[420px] shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-150 mb-4">
                  <div>
                    <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Errands Trolley</span>
                    <h4 className="text-sm font-serif font-black text-slate-900 flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-emerald-600" />
                      <span>Grocery Board ({(user.shoppingList || []).length} items)</span>
                    </h4>
                  </div>
                  {(user.shoppingList || []).length > 0 && (
                    <button
                      onClick={handleClearShoppingList}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Wipe List</span>
                    </button>
                  )}
                </div>

                {/* Shopping List Rows */}
                {(!user.shoppingList || user.shoppingList.length === 0) ? (
                  <div className="text-center py-16 text-slate-450 font-semibold text-xs border-2 border-dashed border-slate-200 rounded-2xl bg-stone-50/50 flex flex-col items-center justify-center gap-2">
                    <ShoppingCart className="w-10 h-10 text-slate-300 animate-pulse" />
                    <p className="max-w-xs font-medium text-slate-500">Your shopping cart is completely empty! Pin items from the left sidebar to plan purchases.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {user.shoppingList.map(item => (
                      <div
                        key={item.id}
                        className={`p-3 border rounded-xl flex items-center justify-between gap-4 transition-all ${
                          item.checked
                            ? "bg-slate-50 border-slate-150 text-slate-400"
                            : "bg-[#FAF9F6] border-slate-250 text-slate-800 hover:border-amber-400"
                        }`}
                      >
                        <button
                          onClick={() => handleToggleShoppingItem(item.id)}
                          className="flex items-center gap-3 cursor-pointer flex-1 text-left"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            item.checked
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-slate-350 bg-white"
                          }`}>
                            {item.checked && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold leading-tight ${item.checked ? "line-through opacity-70" : ""}`}>
                              {item.name}
                            </span>
                            {item.quantity && (
                              <span className="text-[9.5px] font-mono font-bold text-slate-450 mt-0.5">
                                Qty: {item.quantity}
                              </span>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={() => handleDeleteShoppingItem(item.id)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-450 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions segment */}
              {(user.shoppingList || []).some(item => item.checked) && (
                <div className="pt-4 border-t border-slate-150 mt-4">
                  <button
                    onClick={handleTransferCheckedToPantry}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>🧺 Stock Checked Items to Inventory ({(user.shoppingList || []).filter(item => item.checked).length})</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
                    This automatically categories and moves checked items to your virtual fridge cabinet shelves!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Recipe } from "../types";
import { BookOpen, Clock, Activity, Users, Flame, ArrowRight, CornerDownRight } from "lucide-react";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  source?: string;
}

export default function RecipeList({ recipes, onSelectRecipe, source }: RecipeListProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl p-8">
        <p className="text-gray-500 font-sans">No recipes loaded yet. Fill your inventory above and summon the chef!</p>
      </div>
    );
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "hard":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-150";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-[var(--color-bento-accent)]" />
            <span>Recipe Recommendations</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Suggested dishes tailored to your available pantry items.
          </p>
        </div>

        {source && (
          <div className="px-3 py-1 bg-[#F1EDE4] border border-[#E5E1D8] rounded-full text-[10px] font-mono text-slate-600 font-semibold uppercase tracking-wider">
            {source === "offline_fallback" || source === "offline_fallback_on_error" ? (
              <span className="flex items-center gap-1">
                ⚙️ Pantry Curated
              </span>
            ) : (
              <span className="flex items-center gap-1">
                ⭐ Live Gemini AI
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            id={`recipe-${recipe.id}`}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[var(--color-bento-accent)] hover:shadow-md transition-all duration-300"
          >
            {/* Header Visual Box */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 border rounded-lg ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-serif font-bold text-slate-900 leading-snug group-hover:text-[var(--color-bento-accent)] transition-colors">
                {recipe.title}
              </h4>
              
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {recipe.description}
              </p>
            </div>

            {/* Middle Stats details Row */}
            <div className="px-6 py-3.5 bg-[#FAF9F6] border-t border-b border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 font-sans">
              <div className="flex flex-col border-r border-slate-200 last:border-0 justify-center">
                <span className="text-slate-400 text-[9px] uppercase font-mono font-bold mb-0.5">Prep</span>
                <span className="font-semibold text-slate-800">{recipe.prepTime} min</span>
              </div>
              <div className="flex flex-col border-r border-slate-200 last:border-0 justify-center">
                <span className="text-slate-400 text-[9px] uppercase font-mono font-bold mb-0.5">Cook</span>
                <span className="font-semibold text-slate-800">{recipe.cookTime} min</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-slate-400 text-[9px] uppercase font-mono font-bold mb-0.5">Servings</span>
                <span className="font-semibold text-slate-800">{recipe.servings} pp</span>
              </div>
            </div>

            {/* Footer Ingredients Preview & Action */}
            <div className="p-6 flex flex-col justify-between flex-1">
              {/* Ingredient snippet list */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider block mb-2">
                  🧺 Key Ingredients Needed ({recipe.ingredients.length})
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {recipe.ingredients.slice(0, 5).map((ing, iIdx) => (
                    <span
                      key={`${ing.name}-${iIdx}`}
                      className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-semibold ${
                        ing.isStaple
                          ? "bg-slate-50 border-slate-100 text-slate-500"
                          : "bg-emerald-50/50 border-emerald-100 text-emerald-800"
                      }`}
                    >
                      {ing.name} ({ing.amount})
                    </span>
                  ))}
                  {recipe.ingredients.length > 5 && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 border border-transparent px-2.5 py-1.5 rounded-lg font-bold">
                      +{recipe.ingredients.length - 5} options
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectRecipe(recipe)}
                className="w-full py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold leading-none tracking-widest uppercase flex items-center justify-center gap-1 px-4 border border-transparent hover:bg-[var(--color-bento-accent)] hover:shadow-md hover:scale-[1.01] transform transition-all pointer-cursor"
              >
                <span>Enter Kitchen Co-Pilot</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

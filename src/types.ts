export interface IngredientTotal {
  name: string;
  amount: string;
  isStaple?: boolean;
}

export interface StepIngredient {
  name: string;
  amount: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  durationSeconds: number; // 0 if no timer is applicable
  ingredientsNeeded: StepIngredient[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  difficulty: string; // "Apprentice" (Easy), "Home Chef" (Medium), "Professional" (Hard), "Master Chef" (Expert)
  difficultyNumber: number; // 1 to 4 corresponding to levels
  servings: number;
  pantryStaplesNeeded: string[];
  ingredients: IngredientTotal[];
  steps: RecipeStep[];
  cuisine?: string;
  mealType?: string; // "Breakfast", "Lunch", "Dinner", "Snack"
  isSpecial?: boolean; // Star/Locked special recipes
  calories?: number;
  protein?: string;
  allergens?: string[];
}

export interface CookingPreferences {
  diet: string; // "None" | "Vegetarian" | "Vegan" | "Gluten-Free" | "Dairy-Free" | "Keto"
  style: string; // "Any" | "Quick & Easy" | "Gourmet" | "Comfort Food" | "Light & Fresh"
  maxTime: number; // Max total minutes, 0 for any
}

export interface CookingSession {
  recipeId: string;
  recipeTitle: string;
  totalTimeTaken: number; // in seconds
  stepsCompletedCount: number;
  pausedCount: number;
  timerAccuracyBonus: boolean;
  firstAttemptBonus: boolean;
  xpEarned: number;
  rating: number;
  feedbackNotes: string;
  dishImage?: string;
  timestamp: string; // Date string
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  streak: number;
  lastCookedDate?: string; // ISO date string format "YYYY-MM-DD"
  dietPreferences: string[];
  allergies?: string[];
  pantry: { name: string; quantity?: string; category: string }[];
  favorites: string[]; // Recipe IDs
  completedSessions: CookingSession[];
  unlockedThemes: string[]; // ["Modern Slate", "Sage Garden", "Cosmic Dark", "Warm Coral", "Golden Saffron"]
  activeTheme: string;
  badges: UserBadge[];
  shoppingList?: { id: string; name: string; quantity?: string; checked: boolean }[];
  isGuest?: boolean;
  email?: string;
  username?: string;
  password?: string;
}

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Define fallback recipes when Gemini API is unavailable or key is missing
const FALLBACK_RECIPES = [
  {
    id: "garlic-butter-chicken",
    title: "Classic Garlic Butter Chicken",
    description: "Sautéed chicken breasts drenched in a savory, aromatic garlic butter sauce. Super quick and incredibly satisfying.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Easy",
    servings: 2,
    pantryStaplesNeeded: ["Salt", "Black pepper", "Butter", "Olive oil", "Water"],
    ingredients: [
      { name: "Chicken breast", amount: "2 large pieces (approx. 400g), cubed", isStaple: false },
      { name: "Garlic cloves", amount: "4 cloves, finely minced", isStaple: false },
      { name: "Butter", amount: "4 tablespoons", isStaple: true },
      { name: "Olive oil", amount: "1 tablespoon", isStaple: true },
      { name: "Fresh parsley", amount: "2 tablespoons, chopped (optional)", isStaple: false },
      { name: "Broccoli florets", amount: "1 cup (optional side)", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Pat dry the chicken breast cubes with a paper towel. Season generously with a pinch of salt and cracked black pepper.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Chicken breast", amount: "2 large pieces, cubed" },
          { name: "Salt", amount: "1 pinch" },
          { name: "Black pepper", amount: "1 pinch" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Heat the olive oil and 1 tablespoon of butter in a large skillet over medium-high heat. Add the seasoned chicken cubes.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "1 tablespoon" },
          { name: "Butter", amount: "1 tablespoon" },
          { name: "Chicken breast", amount: "Cubed and seasoned in Step 1" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Sear and cook the chicken until golden brown and cooked through, tossing occasionally. If including broccoli, toss it in now.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Broccoli florets", amount: "1 cup" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Reduce heat to medium. Add the remaining 3 tablespoons of butter and the minced garlic. Sauté until the garlic is fragrant and butter is lightly bubbling.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Butter", amount: "3 tablespoons" },
          { name: "Garlic cloves", amount: "4 cloves, finely minced" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Garnish with freshly chopped parsley, stir once to coat everything in the garlic butter, and serve hot.",
        durationSeconds: 30,
        ingredientsNeeded: [
          { name: "Fresh parsley", amount: "2 tablespoons, chopped" }
        ]
      }
    ]
  },
  {
    id: "lemon-garlic-broccoli-pasta",
    title: "Lemon Herb Broccoli Pasta",
    description: "An elegant, light, and tangy pasta dish loaded with fresh lemon zest, garlic, and emerald-green broccoli florets.",
    prepTime: 8,
    cookTime: 12,
    difficulty: "Easy",
    servings: 2,
    pantryStaplesNeeded: ["Water", "Salt", "Olive oil", "Black pepper"],
    ingredients: [
      { name: "Pasta (Spaghetti or Penne)", amount: "200g", isStaple: false },
      { name: "Broccoli florets", amount: "1.5 cups", isStaple: false },
      { name: "Garlic cloves", amount: "3 cloves, thinly sliced", isStaple: false },
      { name: "Lemon", amount: "1 whole (for zest and juice)", isStaple: false },
      { name: "Parmesan cheese", amount: "0.25 cup, grated (optional)", isStaple: false },
      { name: "Red pepper flakes", amount: "0.5 teaspoon (optional)", isStaple: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Bring a large pot of salted water to a rolling boil. Add pasta and cook according to package directions, aiming for al dente.",
        durationSeconds: 480,
        ingredientsNeeded: [
          { name: "Pasta (Spaghetti or Penne)", amount: "200g" },
          { name: "Water", amount: "2 liters" },
          { name: "Salt", amount: "1 tablespoon" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "During the final 3 minutes of boiling the pasta, add the broccoli florets directly into the boiling pasta water to blanch them.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Broccoli florets", amount: "1.5 cups" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Drain the pasta and broccoli, reserving about 0.5 cup of pasta cooking water. Set aside.",
        durationSeconds: 60,
        ingredientsNeeded: []
      },
      {
        stepNumber: 4,
        instruction: "In the same pot, heat 2 tablespoons of olive oil over medium heat. Add sliced garlic and optional red pepper flakes. Sauté until garlic turns lightly golden and fragrant.",
        durationSeconds: 90,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "2 tablespoons" },
          { name: "Garlic cloves", amount: "3 cloves, thinly sliced" },
          { name: "Red pepper flakes", amount: "0.5 teaspoon" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Add the pasta, broccoli, lemon zest, lemon juice and 2-3 tablespoons of the pasta water back to the pot. Toss vigorously to create a light glossy sauce. Season with salt and pepper.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Lemon", amount: "Zest of 1 lemon + 2 tablespoons of juice" },
          { name: "Black pepper", amount: "To taste" },
          { name: "Reserved pasta water", amount: "2-3 tablespoons" }
        ]
      },
      {
        stepNumber: 6,
        instruction: "Serve instantly, topped with grated Parmesan cheese for a savory finish.",
        durationSeconds: 30,
        ingredientsNeeded: [
          { name: "Parmesan cheese", amount: "0.25 cup, grated" }
        ]
      }
    ]
  },
  {
    id: "fragrant-garlic-fried-rice",
    title: "Gold Medal Garlic Fried Rice",
    description: "A fast, high-heat stir fry that transforms cold leftover rice and basic ingredients into an aromatic, savory masterpiece.",
    prepTime: 5,
    cookTime: 10,
    difficulty: "Easy",
    servings: 2,
    pantryStaplesNeeded: ["Cooking oil", "Soy sauce", "Salt", "Black pepper"],
    ingredients: [
      { name: "Cooked rice (preferably cold leftover)", amount: "3 cups", isStaple: false },
      { name: "Garlic cloves", amount: "5 cloves, crushed and chopped", isStaple: false },
      { name: "Eggs", amount: "2 large, beaten", isStaple: false },
      { name: "Green onions (scallions)", amount: "3 stalks, sliced", isStaple: false },
      { name: "Butter", amount: "1 tablespoon (optional flavor booster)", isStaple: true },
      { name: "Soy sauce", amount: "1.5 tablespoons", isStaple: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Heat 1 tablespoon of cooking oil in a wok or large skillet over medium-high heat. Add the chopped garlic and stir-fry until golden brown and crisp, then scoop out half of the garlic for garnish later.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Cooking oil", amount: "1 tablespoon" },
          { name: "Garlic cloves", amount: "5 cloves, crushed" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Pour in the beaten eggs. Scramble them quickly until about 80% cooked, then break them up into small pieces with your spatula.",
        durationSeconds: 45,
        ingredientsNeeded: [
          { name: "Eggs", amount: "2 large, beaten" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Add the cold cooked rice to the pan. Use your spatula to break up any big clumps. Stir-fry aggressively for 3-4 minutes so the grains toast in the garlic oil.",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Cooked rice", amount: "3 cups" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Drizzle soy sauce around the edges of the pan and toss immediately. Add butter, salt, pepper, and most of the green onions. Toss at high heat until steaming.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Soy sauce", amount: "1.5 tablespoons" },
          { name: "Butter", amount: "1 tablespoon" },
          { name: "Green onions", amount: "2 stalks, sliced" },
          { name: "Salt & Pepper", amount: "A pinch" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Transfer to serving bowls. Garnish with the reserved crispy golden garlic and the rest of the green onions.",
        durationSeconds: 30,
        ingredientsNeeded: [
          { name: "Crispy garlic", amount: "Sautéed in Step 1" },
          { name: "Green onions", amount: "1 stalk, sliced" }
        ]
      }
    ]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API Route: Cook with Me recipe generation
  app.post("/api/recipes/generate", async (req, res) => {
    try {
      const { ingredients, preferences } = req.body;

      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: "At least one ingredient is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.log("No valid API key found. Serving fallback recipes.");
        // Filters fallback recipes that match at least one user ingredient if possible, otherwise returns fellbacks
        const queryIngredients = ingredients.map(i => i.toLowerCase().trim());
        const matched = FALLBACK_RECIPES.filter(recipe => {
          return recipe.ingredients.some(ri => {
            return queryIngredients.some(qi => ri.name.toLowerCase().includes(qi) || qi.includes(ri.name.toLowerCase()));
          });
        });

        const replyRecipes = matched.length > 0 ? matched : FALLBACK_RECIPES;
        return res.json({
          recipes: replyRecipes,
          source: "offline_fallback",
          message: "Enjoy these curated classics!"
        });
      }

      // Initialize the modern @google/genai SDK lazily
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const dietStr = preferences?.diet ? `Strictly adhere to dietary requirements: ${preferences.diet}.` : "";
      const styleStr = preferences?.style ? `Target culinary style: ${preferences.style}.` : "";
      const maxTime = preferences?.maxTime ? `The total prep and cook time should be around or under ${preferences.maxTime} minutes.` : "";

      const prompt = `You are a professional, helpful, and highly detailed sous-chef.
The user has the following ingredients available in their kitchen: [${ingredients.join(", ")}].
${dietStr}
${styleStr}
${maxTime}

Generate a list of 2 or 3 recipes that the user can prepare. Try your best to choose recipes where these ingredients are central.
You can assume standard kitchen pantry staples are available (like salt, black pepper, cooking oil, flour, butter, water, garlic, etc.).

CRITICAL REQUIREMENTS:
1. Provide a total list of ingredients with overall quantities.
2. Provide step-by-step cooking instructions.
3. For each step, you MUST include a timer (durationSeconds) if cooking, baking, frying, simmering, resting, or active prepping is involved. Give non-zero durationSeconds only for steps needing active timings (e.g. simmer for 8 minutes = 480 seconds). Use 0 for steps with no timing requirement.
4. For each individual step, you MUST specify the physical ingredients needed and their EXACT amounts required FOR THIS STEP ONLY (e.g. '1 tablespoon' or '200g chicken breast'). If an ingredient is prepared in a previous step, reference it (e.g., 'Seasoned chicken cubes from Step 1').

Format your response exactly using the requested JSON schema. Make sure recipes are highly detailed, delicious, and easy to follow.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipes: {
                type: Type.ARRAY,
                description: "List of custom generated culinary recipes matching the query.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "Uniquely generated slug-like ID for the recipe (e.g. 'garlic-parmesan-pasta')" },
                    title: { type: Type.STRING, description: "Name of the dish or recipe" },
                    description: { type: Type.STRING, description: "A brief enticing pitch of why this fits their ingredients" },
                    prepTime: { type: Type.INTEGER, description: "Preparation time in minutes" },
                    cookTime: { type: Type.INTEGER, description: "Cooking time in minutes" },
                    difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
                    servings: { type: Type.INTEGER, description: "Recommended number of portions" },
                    pantryStaplesNeeded: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Basic pantry items needed but assumed available (seasonings, water, oils)"
                    },
                    ingredients: {
                      type: Type.ARRAY,
                      description: "Complete checklist of ingredients and their total quantities",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING, description: "Name of the ingredient" },
                          amount: { type: Type.STRING, description: "Total overall amount required (e.g., '2 breasts' or '3 tbsp')" },
                          isStaple: { type: Type.BOOLEAN, description: "true if it is a common pantry item like salt, pepper, or water" }
                        },
                        required: ["name", "amount"]
                      }
                    },
                    steps: {
                      type: Type.ARRAY,
                      description: "Detailed sequenced cooking steps",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          stepNumber: { type: Type.INTEGER, description: "Sequence number starting from 1" },
                          instruction: { type: Type.STRING, description: "Clear and highly detailed text instructing what to do next in this step." },
                          durationSeconds: { type: Type.INTEGER, description: "Suggested timer for this step in seconds. Set to 0 if a timer is not applicable for this action." },
                          ingredientsNeeded: {
                            type: Type.ARRAY,
                            description: "ALL ingredients and their specific amounts that physically get added or used in this exact step to prevent confusion.",
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                name: { type: Type.STRING, description: "The name of the ingredient" },
                                amount: { type: Type.STRING, description: "The precise amount of this ingredient needed for just this step" }
                              },
                              required: ["name", "amount"]
                            }
                          }
                        },
                        required: ["stepNumber", "instruction", "ingredientsNeeded"]
                      }
                    }
                  },
                  required: [
                    "id",
                    "title",
                    "description",
                    "prepTime",
                    "cookTime",
                    "difficulty",
                    "servings",
                    "pantryStaplesNeeded",
                    "ingredients",
                    "steps"
                  ]
                }
              }
            },
            required: ["recipes"]
          }
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText.trim());
      res.json({
        recipes: data.recipes || [],
        source: "gemini_api"
      });

    } catch (apiError: any) {
      console.error("Gemini API call failed, reverting to high-quality fallback suite:", apiError);
      res.status(200).json({
        recipes: FALLBACK_RECIPES,
        source: "offline_fallback_on_error",
        error: apiError.message,
        message: "Gemini kitchen is taking a quick break! Here are some of our chef's favorite staples you can prepare."
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kitchen server is simmering at http://0.0.0.0:${PORT}`);
  });
}

startServer();

import { Recipe } from "../types";

export const MASTER_RECIPES: Recipe[] = [
  {
    id: "garlic-butter-chicken",
    title: "Classic Garlic Butter Chicken",
    description: "Sautéed chicken breasts drenched in a savory, aromatic garlic butter sauce. Super quick and incredibly satisfying.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Apprentice",
    difficultyNumber: 1,
    servings: 2,
    cuisine: "American",
    mealType: "Dinner",
    pantryStaplesNeeded: ["Salt", "Black pepper", "Butter", "Olive oil", "Water"],
    ingredients: [
      { name: "Chicken breast", amount: "400g (cubed)", isStaple: false },
      { name: "Garlic cloves", amount: "4 pieces", isStaple: false },
      { name: "Butter", amount: "4 tablespoons", isStaple: true },
      { name: "Olive oil", amount: "1 tablespoon", isStaple: true },
      { name: "Broccoli florets", amount: "1.5 cups", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Pat dry the chicken breast cubes with a paper towel. Season generously with salt and pepper.",
        durationSeconds: 90,
        ingredientsNeeded: [
          { name: "Chicken breast", amount: "400g" },
          { name: "Salt", amount: "1/2 tsp" },
          { name: "Black pepper", amount: "1/4 tsp" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Heat the olive oil and 1 tablespoon of butter in a large skillet over medium-high heat. Add the seasoned chicken cubes.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "1 tbsp" },
          { name: "Butter", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Sear and cook the chicken until golden brown, tossing occasionally. If including broccoli, toss it in now.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Broccoli florets", amount: "1.5 cups" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Reduce heat to medium. Add the remaining 3 tablespoons of butter and the minced garlic. Sauté until the garlic is fragrant.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Butter", amount: "3 tbsp" },
          { name: "Garlic cloves", amount: "4 cloves (minced)" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Stir once to fully coat everything in the bubbling garlic butter and serve steaming hot.",
        durationSeconds: 30,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "lemon-herb-broccoli-pasta",
    title: "Lemon Herb Broccoli Pasta",
    description: "An elegant, light, and tangy pasta dish loaded with fresh lemon zest, garlic, and emerald-green broccoli florets.",
    prepTime: 8,
    cookTime: 12,
    difficulty: "Apprentice",
    difficultyNumber: 1,
    servings: 2,
    cuisine: "Italian",
    mealType: "Lunch",
    pantryStaplesNeeded: ["Water", "Salt", "Olive oil", "Black pepper"],
    ingredients: [
      { name: "Pasta", amount: "200g", isStaple: false },
      { name: "Broccoli florets", amount: "1.5 cups", isStaple: false },
      { name: "Garlic cloves", amount: "3 cloves", isStaple: false },
      { name: "Lemon", amount: "1 pieces", isStaple: false },
      { name: "Parmesan cheese", amount: "1/4 cup", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Bring a large pot of salted water to a rolling boil. Add pasta and cook until al dente.",
        durationSeconds: 420,
        ingredientsNeeded: [
          { name: "Pasta", amount: "200g" },
          { name: "Water", amount: "2 Liters" },
          { name: "Salt", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "During the final 3 minutes of boiling the pasta, add the broccoli florets directly into the boiling water.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Broccoli florets", amount: "1.5 cups" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Drain the pasta and broccoli, reserving 1/2 cup of cooking water. Set aside.",
        durationSeconds: 60,
        ingredientsNeeded: []
      },
      {
        stepNumber: 4,
        instruction: "In the same pot, heat 2 tablespoons of olive oil over medium heat. Sauté sliced garlic until golden.",
        durationSeconds: 90,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "2 tbsp" },
          { name: "Garlic cloves", amount: "3 cloves (sliced)" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Add pasta, broccoli, lemon zest and juice, and reserved cooking water. Toss well to create a light gloss.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Lemon", amount: "1 whole (zested and juiced)" }
        ]
      },
      {
        stepNumber: 6,
        instruction: "Garnish with grated Parmesan cheese and fresh ground black pepper, then plate immediately.",
        durationSeconds: 30,
        ingredientsNeeded: [
          { name: "Parmesan cheese", amount: "1/4 cup" }
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
    difficulty: "Apprentice",
    difficultyNumber: 1,
    servings: 2,
    cuisine: "Chinese",
    mealType: "Breakfast",
    pantryStaplesNeeded: ["Cooking oil", "Soy sauce", "Salt", "Black pepper", "Butter"],
    ingredients: [
      { name: "Rice", amount: "3 cups (cooked)", isStaple: false },
      { name: "Garlic cloves", amount: "5 pieces", isStaple: false },
      { name: "Eggs", amount: "2 pieces", isStaple: false },
      { name: "Soy sauce", amount: "1.5 tablespoons", isStaple: true },
      { name: "Onion", amount: "1/2 pieces", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Mince garlic and chop the half onion finely. Beat eggs in a separate small bowl with a pinch of salt.",
        durationSeconds: 150,
        ingredientsNeeded: [
          { name: "Garlic cloves", amount: "5 cloves" },
          { name: "Onion", amount: "1/2 piece" },
          { name: "Eggs", amount: "2 pieces" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Heat 1 tbsp of cooking oil in a large wok over medium-high heat. Fry garlic until golden. Scoop out half for topping later.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Cooking oil", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Pour in beating eggs in the same wok. Quick scramble until 80% firm. Break up with your spatula.",
        durationSeconds: 60,
        ingredientsNeeded: []
      },
      {
        stepNumber: 4,
        instruction: "Add the pre-cooked cold rice. Stir aggressively on high heat to toast and break any lumps.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Rice", amount: "3 cups" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Pour soy sauce around the wok edges. Stir well, add butter and chopped onions, seasoning with salt and pepper.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Soy sauce", amount: "1.5 tbsp" },
          { name: "Butter", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 6,
        instruction: "Transfer to bowls and garnish with the reserved crispy golden garlic.",
        durationSeconds: 30,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "aromatic-coconut-curry",
    title: "Golden Saffron Coconut Curry",
    description: "An intermediate, rich and satisfying curry that blends toasted warm spices with thick coconut milk and proteins of choice.",
    prepTime: 15,
    cookTime: 25,
    difficulty: "Home Chef",
    difficultyNumber: 2,
    servings: 3,
    cuisine: "Thai",
    mealType: "Dinner",
    pantryStaplesNeeded: ["Salt", "Cooking oil", "Water", "Sugar"],
    ingredients: [
      { name: "Chicken breast", amount: "300g (cubed)", isStaple: false },
      { name: "Potato", amount: "2 medium", isStaple: false },
      { name: "Onion", amount: "1 piece", isStaple: false },
      { name: "Garlic cloves", amount: "3 pieces", isStaple: false },
      { name: "Coconut milk", amount: "400ml", isStaple: false },
      { name: "Curry powder", amount: "2 tablespoons", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Peel and cube potatoes, chop onion and mince garlic. Slice poultry into bite-sized strips.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Potato", amount: "2 pieces" },
          { name: "Onion", amount: "1 piece" },
          { name: "Garlic cloves", amount: "3 pieces" },
          { name: "Chicken breast", amount: "300g" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "In a deep wok, heat oil. Sauté onions and garlic until translucent, then stir-fry chicken breast.",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Cooking oil", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Stir-in curry powder, toasting it for 1 minute until highly fragrant. Fully coat the chicken.",
        durationSeconds: 60,
        ingredientsNeeded: [
          { name: "Curry powder", amount: "2 tbsp" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Pour in the coconut milk and add boxed cubed potatoes. Bring to a boil, then cover and simmer over low-medium heat.",
        durationSeconds: 720,
        ingredientsNeeded: [
          { name: "Coconut milk", amount: "400ml" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Uncover and continue simmering until potatoes are perfectly tender and curry sauce has thickened slightly.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Salt", amount: "1 tsp" },
          { name: "Sugar", amount: "1/2 tsp" }
        ]
      },
      {
        stepNumber: 6,
        instruction: "Serve warm paired with fresh cooked jasmine rice.",
        durationSeconds: 30,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "gourmet-pan-seared-salmon",
    title: "Tender Glazed Salmon with Lemon Asparagus",
    description: "An advanced culinary dish utilizing modern techniques of emulsification and pan-searing. Crispy salmon skins with glaze.",
    prepTime: 12,
    cookTime: 18,
    difficulty: "Professional Chef",
    difficultyNumber: 3,
    servings: 2,
    cuisine: "French",
    mealType: "Dinner",
    pantryStaplesNeeded: ["Salt", "Olive oil", "Butter", "Black pepper"],
    ingredients: [
      { name: "Salmon fillet", amount: "2 pieces (approx. 350g total)", isStaple: false },
      { name: "Asparagus", amount: "1 bundle (trimmed)", isStaple: false },
      { name: "Lemon", amount: "1 piece", isStaple: false },
      { name: "Butter", amount: "3 tablespoons", isStaple: true },
      { name: "Garlic cloves", amount: "2 pieces", isStaple: false },
      { name: "Soy sauce", amount: "1 tablespoon", isStaple: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Prep the salmon: Dry the skins thoroughly with a paper towel. Score skin slightly, and season both sides with salt and pepper.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Salmon fillet", amount: "2 portions" },
          { name: "Salt & Pepper", amount: "Generous pinch" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Heat olive oil in a heavy stainless skillet over high heat. Lay salmon skin-side down. Press down gently with a flat spatula for crispness.",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Flip salmon and reduce heat to medium. Add 2 tablespoons of butter, baste salmon repeatedly in hot foaming butter, then extract salmon.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Butter", amount: "2 tbsp" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Add asparagus and sliced garlic into the same skillet. Sear over high heat until tender-crisp.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Asparagus", amount: "1 bundle" },
          { name: "Garlic cloves", amount: "2 pieces" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Emulsify a finishing pan sauce: Remove asparagus. Deglaze warm pan with lemon juice, 1 tbsp soy sauce, and 1 tbsp butter, swirling constantly.",
        durationSeconds: 90,
        ingredientsNeeded: [
          { name: "Lemon", amount: "Juice of 1/2 lemon" },
          { name: "Soy sauce", amount: "1 tbsp" },
          { name: "Butter", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 6,
        instruction: "Drape the silk citrus glaze on salmon and serve with charred hot asparagus garnish.",
        durationSeconds: 45,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "molecular-chocolate-lava",
    title: "Decadent Precision Chocolate Lava Sphere",
    description: "Expert level molecular baking. An emulsion of rich baker's dark chocolate surrounding a frozen lava center that erupts under heat.",
    prepTime: 20,
    cookTime: 12,
    difficulty: "Master Chef",
    difficultyNumber: 4,
    servings: 2,
    cuisine: "Modernist",
    mealType: "Snack",
    isSpecial: true,
    pantryStaplesNeeded: ["Flour", "Butter", "Sugar", "Eggs", "Salt"],
    ingredients: [
      { name: "Dark chocolate", amount: "150g (60%+ cocoa)", isStaple: false },
      { name: "Butter", amount: "6 tablespoons", isStaple: true },
      { name: "Eggs", amount: "2 whole + 2 yolks", isStaple: false },
      { name: "Sugar", amount: "1/4 cup", isStaple: true },
      { name: "Flour", amount: "3 tablespoons", isStaple: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Butter and flour two baking ramekins meticulously. Freeze for 10 minutes to ensure solid demolding later.",
        durationSeconds: 600,
        ingredientsNeeded: [
          { name: "Butter", amount: "1 tbsp (for coating)" },
          { name: "Flour", amount: "1 tbsp (for dusting)" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Melt dark chocolate and butter together in a heatproof bowl over a pot of barely simmering water (Double boiler method).",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Dark chocolate", amount: "150g" },
          { name: "Butter", amount: "5 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "In a mixer stand, whip 2 whole eggs, 2 yolks, and sugar together on high speed until a pale ribbon stage (thickened foam).",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Eggs", amount: "2 whole + 2 extra yolks" },
          { name: "Sugar", amount: "1/4 cup" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Fold ribbon eggs and 2 tbsp of flour extremely gently into the melted chocolate in folding thirds. Do not deflate the foam.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Flour", amount: "2 tbsp" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Pour batter into your chilled ramekins. Bake in a preheated oven at exactly 425°F (218°C) until the sides are set but the center wobbles.",
        durationSeconds: 720,
        ingredientsNeeded: []
      },
      {
        stepNumber: 6,
        instruction: "Rest exactly 1 minute, invert onto beautiful dessert plates, dust with powdered sugar and serve immediately.",
        durationSeconds: 60,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "gourmet-mushroom-risotto",
    title: "Velvety Wild Mushroom Risotto",
    description: "An intermediate classic style requiring constant attention. Toasting arborio grain, slow hot-stock absorption, and energetic folding.",
    prepTime: 15,
    cookTime: 30,
    difficulty: "Home Chef",
    difficultyNumber: 2,
    servings: 3,
    cuisine: "Italian",
    mealType: "Dinner",
    pantryStaplesNeeded: ["Olive oil", "Butter", "Salt", "Water"],
    ingredients: [
      { name: "Mushroom", amount: "250g (wild or cremini)", isStaple: false },
      { name: "Rice", amount: "1.5 cups (Arborio)", isStaple: false },
      { name: "Onion", amount: "1 whole (chopped)", isStaple: false },
      { name: "Garlic cloves", amount: "3 pieces", isStaple: false },
      { name: "Parmesan cheese", amount: "1/2 cup (grated)", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Slice mushrooms thinly, chop onion, and mince garlic. Separately warm 4 cups of salted water and keep on low simmer.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Mushroom", amount: "250g" },
          { name: "Onion", amount: "1 piece" },
          { name: "Garlic cloves", amount: "3 pieces" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Sauté the mushrooms in olive oil over high heat until slightly browned. Set aside for garnish and stir-in.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Olive oil", amount: "1 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "In the same pan, melt 2 tablespoons of butter. Cook chopped onions and garlic until fragile and sweet.",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Butter", amount: "2 tbsp" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Add Arborio grain directly to pan. Toast dry rice in onions and fat until the edges look translucent.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Rice", amount: "1.5 cups" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Begin slow extraction: Add simmer stock one ladle at a time, stirring constantly. Let each ladle absorb before adding next.",
        durationSeconds: 1080,
        ingredientsNeeded: []
      },
      {
        stepNumber: 6,
        instruction: "Stir in sautéed mushrooms, remaining butter, and Parmesan. Beat vigorously (Mantecatura) off heat to form a rich sauce.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Parmesan cheese", amount: "1/2 cup" },
          { name: "Butter", amount: "1 tbsp" }
        ]
      }
    ]
  },
  {
    id: "fluffy-morning-souffle-pancakes",
    title: "Featherlight Japanese Soufflé Pancakes",
    description: "Unbelievably tall, fluffy pancakes. An apprentice's delight but requires perfect folding of meringue whipped egg whites.",
    prepTime: 15,
    cookTime: 12,
    difficulty: "Apprentice",
    difficultyNumber: 1,
    servings: 2,
    cuisine: "Japanese",
    mealType: "Breakfast",
    pantryStaplesNeeded: ["Milk", "Flour", "Sugar", "Eggs", "Butter"],
    ingredients: [
      { name: "Eggs", amount: "2 pieces", isStaple: false },
      { name: "Milk", amount: "1.5 tablespoons", isStaple: true },
      { name: "Flour", amount: "3 tablespoons", isStaple: true },
      { name: "Sugar", amount: "2 tablespoons", isStaple: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Carefully separate egg whites from yolks. Whip the egg whites and sugar to stiff peaks to form shiny clouds.",
        durationSeconds: 300,
        ingredientsNeeded: [
          { name: "Eggs", amount: "2 whites" },
          { name: "Sugar", amount: "2 tbsp" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Whiskey egg yolks, milk, and flour to form a thick ribbons paste in another separate bowl.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Eggs", amount: "2 yolks" },
          { name: "Milk", amount: "1.5 tbsp" },
          { name: "Flour", amount: "3 tbsp" }
        ]
      },
      {
        stepNumber: 3,
        instruction: "Gently fold meringue into yolk paste in folding thirds. Do not overmix; we want bubbles intact.",
        durationSeconds: 120,
        ingredientsNeeded: []
      },
      {
        stepNumber: 4,
        instruction: "Coat a warm nonstick pan with butter. Scoop tall mounds of batter in. Add 1 tbsp of water around, then cover.",
        durationSeconds: 240,
        ingredientsNeeded: [
          { name: "Butter", amount: "1/2 tsp" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Flip the mounds gently, add another splash of water, and steam covered. They should stand 2-inches tall.",
        durationSeconds: 240,
        ingredientsNeeded: []
      },
      {
        stepNumber: 6,
        instruction: "Serve immediately while puffed, topped with your choice syrup or berries.",
        durationSeconds: 30,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "mediterranean-shakshuka",
    title: "Spiced Tomato Mediterranean Shakshuka",
    description: "Poached eggs nestled in a rich, deeply spiced tomato and red pepper reduction. Perfect for group brunches.",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Apprentice",
    difficultyNumber: 1,
    servings: 2,
    cuisine: "Mediterranean",
    mealType: "Breakfast",
    pantryStaplesNeeded: ["Eggs", "Tomato", "Onion", "Olive oil", "Garlic cloves"],
    ingredients: [
      { name: "Tomato", amount: "3 large (diced)", isStaple: false },
      { name: "Onion", amount: "1 whole", isStaple: false },
      { name: "Garlic cloves", amount: "3 pieces", isStaple: false },
      { name: "Eggs", amount: "4 pieces", isStaple: false },
      { name: "Bell peppers", amount: "1 piece", isStaple: false }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Fine dice onions and bell pepper. Mince garlic. Warm olive oil in a heavy cast-iron pan.",
        durationSeconds: 180,
        ingredientsNeeded: [
          { name: "Onion", amount: "1 whole" },
          { name: "Bell peppers", amount: "1 piece" },
          { name: "Garlic cloves", amount: "3 cloves" }
        ]
      },
      {
        stepNumber: 2,
        instruction: "Sauté vegetables together until translucent and sweet. Add custom spices (paprika/cumin).",
        durationSeconds: 240,
        ingredientsNeeded: []
      },
      {
        stepNumber: 3,
        instruction: "Stir in chopped tomatoes. Crinkle and simmer on low-medium until reduced into a jammy tomato sauce.",
        durationSeconds: 360,
        ingredientsNeeded: [
          { name: "Tomato", amount: "3 large" }
        ]
      },
      {
        stepNumber: 4,
        instruction: "Express small wells in sauce using your spoon. Gently crack eggs directly into the pockets.",
        durationSeconds: 120,
        ingredientsNeeded: [
          { name: "Eggs", amount: "4 pieces" }
        ]
      },
      {
        stepNumber: 5,
        instruction: "Cover the pan and poach eggs over medium-low heat until egg whites are set but yolks remain liquid.",
        durationSeconds: 360,
        ingredientsNeeded: []
      },
      {
        stepNumber: 6,
        instruction: "Top with parsley or crumbled cheese, and serve right in the pan with warm bread crusts.",
        durationSeconds: 45,
        ingredientsNeeded: []
      }
    ]
  },
  {
    id: "garlic-butter-wings", title: "Crispy Garlic Butter Wings", description: "Indulgent chicken wings baked crisp and tossed in golden garlic butter.",
    prepTime: 10, cookTime: 25, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Snack", pantryStaplesNeeded: ["Salt", "Butter"],
    ingredients: [{ name: "Chicken wings", amount: "500g" }, { name: "Garlic cloves", amount: "4 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Bake wings in oven til crispy.", durationSeconds: 1500, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Toss with warm garlic butter sauce.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "bacon-eggs", title: "Classic Bacon and Eggs", description: "Crispy bacon strips paired beautifully with sunny-side-up eggs.",
    prepTime: 5, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "American", mealType: "Breakfast", pantryStaplesNeeded: ["Salt", "Black pepper", "Butter"],
    ingredients: [{ name: "Bacon", amount: "4 strips" }, { name: "Eggs", amount: "2 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Fry bacon until crispy, then fry eggs in residual bacon fat.", durationSeconds: 450, ingredientsNeeded: [] }
    ]
  },
  {
    id: "crispy-pork-belly", title: "Sizzling Crispy Pork Belly", description: "Bite-sized pork belly slow-rendered and seared for an ultra-crisp skin.",
    prepTime: 10, cookTime: 20, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Chinese", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Soy sauce"],
    ingredients: [{ name: "Pork belly", amount: "300g" }, { name: "Garlic cloves", amount: "2 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté pork belly on medium heat until fat renders and skin is crisp.", durationSeconds: 900, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add minced garlic and soy sauce, cook for 2 minutes to glaze.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "classic-beef-steak", title: "Garlic Butter Beef Steak", description: "Pan-seared beef steak basted with aromatic garlic cloves and heavy butter.",
    prepTime: 5, cookTime: 10, difficulty: "Professional Chef", difficultyNumber: 3, servings: 1, cuisine: "French", mealType: "Dinner", pantryStaplesNeeded: ["Butter", "Salt", "Black pepper"],
    ingredients: [{ name: "Beef steak", amount: "1 portion" }, { name: "Garlic cloves", amount: "3 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Sear the seasoned steak in smoking hot pan on each side.", durationSeconds: 360, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add butter and garlic, baste the steak repeatedly with foaming butter.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "sesame-chicken-thighs", title: "Sesame Ginger Chicken Thighs", description: "Chicken thighs pan-fried with spicy ginger and caramelized sesame glaze.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Japanese", mealType: "Dinner", pantryStaplesNeeded: ["Soy sauce", "Sesame oil"],
    ingredients: [{ name: "Chicken thighs", amount: "400g" }, { name: "Ginger", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Sear chicken thighs in hot sesame oil until browned on both sides.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Simmer chicken with soy sauce and minced ginger until caramelized layer forms.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "classic-pasta-bolognese", title: "Classic Beef Bolognese Pasta", description: "Hearty ground beef and tomato meat sauce layered over boiled pasta.",
    prepTime: 10, cookTime: 20, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Italian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Olive oil"],
    ingredients: [{ name: "Pasta", amount: "200g" }, { name: "Ground beef", amount: "250g" }, { name: "Tomato", amount: "2 large" }],
    steps: [
      { stepNumber: 1, instruction: "Boil pasta in deep salted water until al dente.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Brown ground beef in olive oil with crushed tomatoes, then stir in boiled pasta.", durationSeconds: 600, ingredientsNeeded: [] }
    ]
  },
  {
    id: "buttered-garlic-shrimp", title: "Rich Buttered Garlic Shrimp", description: "Plump fresh shrimp tossed quickly in foaming butter, garlic, and fresh squeezed lemon.",
    prepTime: 5, cookTime: 5, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Spanish", mealType: "Lunch", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Shrimp", amount: "200g" }, { name: "Garlic cloves", amount: "4 pieces" }, { name: "Lemon", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté minced garlic in butter until fragrant.", durationSeconds: 120, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add shrimp, fry until fully pink, then finish with a splash of fresh lemon juice.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "lemon-butter-salmon", title: "Lemon Butter Salmon Fillet", description: "Flaky salmon fillet pan-fried and coated with light silk butter and lemon garlic emulsion.",
    prepTime: 5, cookTime: 10, difficulty: "Home Chef", difficultyNumber: 2, servings: 1, cuisine: "French", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Butter"],
    ingredients: [{ name: "Salmon fillet", amount: "1 piece" }, { name: "Lemon", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Pan fry salmon fillet on a hot buttered pan skin side down.", durationSeconds: 360, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Flip, drizzle lemon juice, and spoon butter over fillet til served flakey.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "tomato-basil-pasta", title: "Fresh Tomato Basil Pasta", description: "Light Italian classic tossing sweet tomatoes and golden garlic with pasta.",
    prepTime: 5, cookTime: 12, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Lunch", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Pasta", amount: "200g" }, { name: "Tomato", amount: "3 medium" }, { name: "Basil", amount: "1 bundle" }],
    steps: [
      { stepNumber: 1, instruction: "Boil pasta and sauté chopped tomato chunks in olive oil until soft.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Toss pasta with warm tomato sauce, tearing fresh basil on top.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "creamy-spinach-mushroom-pasta", title: "Creamy Spinach & Mushroom Pasta", description: "Comforting pasta cooked in rich heavy cream with wild mushrooms and wilted spinach.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Italian", mealType: "Lunch", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Pasta", amount: "200g" }, { name: "Mushroom", amount: "150g" }, { name: "Spinach", amount: "1 cup" }, { name: "Heavy cream", amount: "150ml" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté mushrooms in butter, pour heavy cream, let simmer to a bubble.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Combine cooked pasta and spinach ribbons, stir vigorously til fully coated.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "loaded-sweet-potato", title: "Loaded Sweet Potato Mash", description: "Thick sweet potato mash folded with butter and crispy chopped bacon.",
    prepTime: 10, cookTime: 20, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Snack", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Sweet potato", amount: "3 medium" }, { name: "Bacon", amount: "2 strips" }],
    steps: [
      { stepNumber: 1, instruction: "Boil sweet potatoes until soft, pan-fry chopped bacon pieces until crispy.", durationSeconds: 900, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Mash potatoes with butter and salt, combine bacon crumbles.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "spicy-garlic-noodles", title: "Szechuan Spicy Garlic Noodles", description: "Spicy wok-tossed noodles drenched in sizzling garlic soy chili oils.",
    prepTime: 5, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Chinese", mealType: "Lunch", pantryStaplesNeeded: ["Soy sauce"],
    ingredients: [{ name: "Noodles", amount: "200g" }, { name: "Garlic cloves", amount: "5 cloves" }, { name: "Cayenne pepper", amount: "1 teaspoon" }],
    steps: [
      { stepNumber: 1, instruction: "Boil noodles. Sauté raw minced garlic and cayenne pepper until aromatic.", durationSeconds: 420, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add noodles and soy sauce, toss on high heat until dry and fully red.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "avocado-toast-egg", title: "Avocado Toasted Bread with Egg", description: "Artisan bread slice loaded with mashed avocado pulp and hot fried egg.",
    prepTime: 5, cookTime: 5, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "American", mealType: "Breakfast", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Bread", amount: "2 slices" }, { name: "Avocado", amount: "1 piece" }, { name: "Eggs", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Toast bread slices, scoop seasoned avocado, mash together inside a bowl.", durationSeconds: 120, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Fry eggs, spread avocado onto toast, layer egg on top, serve hot.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "honey-mustard-chicken", title: "Honey Herb Glazed Chicken", description: "Grilled tender chicken breast basted in sweet golden sticky honey sauce.",
    prepTime: 5, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Salt", "Olive oil"],
    ingredients: [{ name: "Chicken breast", amount: "350g" }, { name: "Honey", amount: "2 tablespoons" }, { name: "Lemon", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Pan sear seasoned chicken in a hot oiled skillet.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Pour honey and squeezed lemon juice on top, glaze until sticky coating forms.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "zucchini-carrot-salad", title: "Ribbon Zucchini and Carrot Salad", description: "Fine ribbons of shaved zucchini and carrot tossed in a zesty lime dressing.",
    prepTime: 10, cookTime: 0, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Mediterranean", mealType: "Snack", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Zucchini", amount: "1 large" }, { name: "Carrot", amount: "1 large" }, { name: "Lime", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Shave zucchini and carrot into thin ribbons using a peeler. Toss with squeezed lime juice and oil.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "cheese-onion-quesadilla", title: "Double Cheese & Onion Quesadilla", description: "Warm toasted tortilla pockets containing molten mozzarella and sautéed sweet onions.",
    prepTime: 5, cookTime: 8, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "Mexican", mealType: "Lunch", pantryStaplesNeeded: ["Butter"],
    ingredients: [{ name: "Tortilla", amount: "2 pieces" }, { name: "Mozzarella", amount: "1/2 cup" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Caramelize sliced onions in a buttered pan.", durationSeconds: 240, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Spread mozzarella and onions inside tortilla folds, toast on skillet til crispy.", durationSeconds: 240, ingredientsNeeded: [] }
    ]
  },
  {
    id: "parmesan-asparagus", title: "Golden Parmesan Roasted Asparagus", description: "Stemmy asparagus spears baked with olive oil and coated with a crispy layer of parmesan.",
    prepTime: 5, cookTime: 12, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Snack", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Asparagus", amount: "1 bundle" }, { name: "Parmesan cheese", amount: "1/4 cup" }],
    steps: [
      { stepNumber: 1, instruction: "Toss asparagus with olive oil and salt, roast until firm.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Scatter parmesan cheese over spears, bake for an extra 2 minutes.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "vanilla-rice-pudding", title: "Warm Vanilla Rice Pudding", description: "Decadently sweet rice simmered slow in honey, vanilla extract and milk.",
    prepTime: 5, cookTime: 25, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "English", mealType: "Snack", pantryStaplesNeeded: ["Sugar"],
    ingredients: [{ name: "Rice", amount: "1/2 cup" }, { name: "Milk", amount: "2 cups" }, { name: "Vanilla extract", amount: "1 teaspoon" }, { name: "Honey", amount: "1.5 tablespoons" }],
    steps: [
      { stepNumber: 1, instruction: "Boil rice in milk, honey, sugar, and vanilla over low heat until rich.", durationSeconds: 1500, ingredientsNeeded: [] }
    ]
  },
  {
    id: "coconut-curry-shrimp", title: "Coconut Curry Shrimp", description: "A highly aromatic, comforting shrimp stew poached gently in sweet spiced coconut milk.",
    prepTime: 10, cookTime: 12, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Thai", mealType: "Dinner", pantryStaplesNeeded: ["Salt"],
    ingredients: [{ name: "Shrimp", amount: "250g" }, { name: "Coconut milk", amount: "300ml" }, { name: "Curry powder", amount: "1.5 tablespoons" }, { name: "Ginger", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Fry curry powder and ginger in oil, ladle in coconut milk.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add shrimp, simmer until prawns are fully pink and sauce is thick.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "egg-fried-rice-easy", title: "Golden Egg Fried Rice", description: "Speedy street-style fried rice tossed on high heat with eggs and onions.",
    prepTime: 5, cookTime: 8, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Chinese", mealType: "Lunch", pantryStaplesNeeded: ["Soy sauce", "Butter"],
    ingredients: [{ name: "Rice", amount: "2 cups" }, { name: "Eggs", amount: "2 pieces" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté diced onions, push aside, scramble eggs thoroughly in center.", durationSeconds: 240, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Incorporate rice, douse with soy sauce and butter, fry over high heat.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "sausage-roasted-potato", title: "Roast Sausages and Potato Wedges", description: "Rustic sheet-pan helper roasting juicy sausages alongside seasoned potato wedges.",
    prepTime: 10, cookTime: 30, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Olive oil"],
    ingredients: [{ name: "Sausages", amount: "4 pieces" }, { name: "Potato", amount: "3 medium" }, { name: "Rosemary", amount: "2 sprigs" }],
    steps: [
      { stepNumber: 1, instruction: "Chop potatoes into wedges, toss with rosemary and oil, roast with sausages.", durationSeconds: 1800, ingredientsNeeded: [] }
    ]
  },
  {
    id: "creamy-broccoli-soup", title: "Velvety Creamy Broccoli Soup", description: "Puréed comforting thick broccoli soup finished with a touch of heavy cream.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "French", mealType: "Lunch", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Broccoli florets", amount: "2 cups" }, { name: "Heavy cream", amount: "100ml" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Boil broccoli and onions in salted water, blend to a velvet smooth consistency.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Incorporate heavy cream, simmer for an additional minute and serve.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "carrot-ginger-soup", title: "Sweet Carrot Ginger Soup", description: "Spicy zesty ginger root and carrots blended into a warm cozy soup.",
    prepTime: 10, cookTime: 20, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "French", mealType: "Lunch", pantryStaplesNeeded: ["Salt", "Water"],
    ingredients: [{ name: "Carrot", amount: "4 large" }, { name: "Ginger", amount: "1 slice" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Boil carrots, onion, and minced ginger till tender, blend until fully smooth.", durationSeconds: 1200, ingredientsNeeded: [] }
    ]
  },
  {
    id: "chocolate-chip-pancakes", title: "Chocolate Chip Pancakes", description: "Fluffy pancakes loaded with warm gooey molten pockets of dark baker's chocolate.",
    prepTime: 10, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Breakfast", pantryStaplesNeeded: ["Flour", "Eggs", "Milk", "Butter"],
    ingredients: [{ name: "Dark chocolate", amount: "50g" }, { name: "Flour", amount: "1 cup" }, { name: "Eggs", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Mix pancake batter, fold in chopped chocolate coins.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Ladle onto hot buttered pan, grill both sides til golden fluffy.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "tuna-melt-toast", title: "Savory Mozzarella Tuna Melt", description: "Canned chunk tuna layered over thick toasted bread with melted mozzarella.",
    prepTime: 5, cookTime: 6, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Butter"],
    ingredients: [{ name: "Tuna", amount: "1 can" }, { name: "Bread", amount: "4 slices" }, { name: "Mozzarella", amount: "1/2 cup" }],
    steps: [
      { stepNumber: 1, instruction: "Combine tuna, lay on toasted bread, blanket with shredded mozzarella cheese.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Cook on skillet with butter covered until cheese is bubbly-melty.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "cucumber-avocado-salad", title: "Refreshing Cucumber Avocado Salad", description: "Perfect cold chopped salad with avocado chunks and cilantro leaves.",
    prepTime: 8, cookTime: 0, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Mexican", mealType: "Snack", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Cucumber", amount: "1 large" }, { name: "Avocado", amount: "1 piece" }, { name: "Cilantro", amount: "1/2 bundle" }, { name: "Lemon", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Cut cucumber, chop avocado, toss with squeezed lemon juice and raw cilantro leaves in a large bowl.", durationSeconds: 480, ingredientsNeeded: [] }
    ]
  },
  {
    id: "ginger-garlic-beef", title: "Sizzling Ginger Garlic Beef", description: "Flank beef strips seared beautifully with whole garlic and caramelized honey glaze.",
    prepTime: 10, cookTime: 8, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Chinese", mealType: "Dinner", pantryStaplesNeeded: ["Soy sauce"],
    ingredients: [{ name: "Ground beef", amount: "300g" }, { name: "Ginger", amount: "1 piece" }, { name: "Garlic cloves", amount: "3 pieces" }, { name: "Honey", amount: "1 tablespoon" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté ginger and garlic chunks, add ground beef and stir-fry on high.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Drizzle honey and soy sauce, glaze until fully caramelized and caramelized.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "banana-maple-pancakes", title: "Golden Banana Maple Pancakes", description: "Sweet banana pancake rounds pan fried and coated with rich maple syrup.",
    prepTime: 8, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Breakfast", pantryStaplesNeeded: ["Flour", "Eggs", "Milk", "Butter"],
    ingredients: [{ name: "Banana", amount: "2 whole" }, { name: "Maple syrup", amount: "3 tablespoons" }, { name: "Eggs", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Mash bananas thoroughly, blend with egg and flour to form a thick batter.", durationSeconds: 240, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Fry rounds in butter, douse stacks in pure maple syrup when hot.", durationSeconds: 360, ingredientsNeeded: [] }
    ]
  },
  {
    id: "golden-buttered-rice", title: "Saffron Buttered Rice", description: "Light fluffy rice toasted in melting butter and whole garlic cloves.",
    prepTime: 5, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Butter", "Water"],
    ingredients: [{ name: "Rice", amount: "1 cup" }, { name: "Garlic cloves", amount: "2 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Toast rice wash with garlic cloves in hot sizzling butter.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Fill with salted water, boil covered on low heat until fully steamed.", durationSeconds: 900, ingredientsNeeded: [] }
    ]
  },
  {
    id: "garlic-butter-mushrooms", title: "Garlic Butter Glazed Mushrooms", description: "Whole earthy button mushrooms pan-glazed in fresh garlic-butter juices.",
    prepTime: 5, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "French", mealType: "Snack", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Mushroom", amount: "300g" }, { name: "Garlic cloves", amount: "4 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté sliced mushrooms with minced garlic in butter over highest heat until deeply caramelized.", durationSeconds: 600, ingredientsNeeded: [] }
    ]
  },
  {
    id: "greek-yogurt-apple-honey", title: "Orchard Honey Greek Yogurt", description: "Probiotic Greek yogurt bowl topped with pan-sweetened apple chunks.",
    prepTime: 5, cookTime: 5, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "Greek", mealType: "Breakfast", pantryStaplesNeeded: ["Sugar"],
    ingredients: [{ name: "Greek yogurt", amount: "1.5 cups" }, { name: "Apple", amount: "1 piece" }, { name: "Honey", amount: "2 tablespoons" }],
    steps: [
      { stepNumber: 1, instruction: "Caramelize diced apple in pan with honey and sugar.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Ladle Greek yogurt into bowl, pour warm apples on top, serve.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "pork-chops-thyme", title: "Sweet Thyme Roasted Pork Chops", description: "Thick pan-broiled pork chops seared with thyme, basted in golden honey.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "American", mealType: "Dinner", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Pork chops", amount: "2 pieces" }, { name: "Honey", amount: "2 tablespoons" }, { name: "Thyme", amount: "3 sprigs" }],
    steps: [
      { stepNumber: 1, instruction: "Sear pork chops on high heat in skillet. Flip, toss in honey and thyme.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Baste sweet sauce over meat continuously until glaze thickens and coats.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "honey-apple-snack", title: "Honey Cinnamon Apples", description: "Hot skillet apples caramelised in sugar, butter, and clover honey.",
    prepTime: 5, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "American", mealType: "Snack", pantryStaplesNeeded: ["Butter", "Sugar"],
    ingredients: [{ name: "Apple", amount: "2 whole" }, { name: "Honey", amount: "2 tablespoons" }],
    steps: [
      { stepNumber: 1, instruction: "Simmer apples slices in butter, honey, and sugar until soft and golden.", durationSeconds: 600, ingredientsNeeded: [] }
    ]
  },
  {
    id: "parmesan-zucchini-boats", title: "Parmesan Crusted Zucchini Boats", description: "Baked hollowed zucchinis stuffed with garlic, topped with toasted parmesan.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Italian", mealType: "Lunch", pantryStaplesNeeded: ["Olive oil"],
    ingredients: [{ name: "Zucchini", amount: "2 medium" }, { name: "Parmesan cheese", amount: "1/2 cup" }, { name: "Garlic cloves", amount: "2 cloves" }],
    steps: [
      { stepNumber: 1, instruction: "Halve zucchini, scoop seeds, season with oil, garlic, and toss parmesan on top.", durationSeconds: 240, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Roast in hot oven until cheese forms a crispy browned cracker shell.", durationSeconds: 660, ingredientsNeeded: [] }
    ]
  },
  {
    id: "zucchini-paprika-crisps", title: "Oven Baked Zucchini Crisps", description: "Crisp baked zucchini coins loaded with warm red sweet paprika.",
    prepTime: 10, cookTime: 20, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Spanish", mealType: "Snack", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Zucchini", amount: "2 medium" }, { name: "Paprika", amount: "1 teaspoon" }],
    steps: [
      { stepNumber: 1, instruction: "Slice zucchini paper thin, toss with oil, salt, and paprika, roast til snappy.", durationSeconds: 1500, ingredientsNeeded: [] }
    ]
  },
  {
    id: "sweet-chili-chicken-wings", title: "Sweet Chili Honey Wings", description: "Deeply roasted crispy wings glazed with thick sticky chili honey sauce.",
    prepTime: 10, cookTime: 25, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Thai", mealType: "Snack", pantryStaplesNeeded: ["Salt"],
    ingredients: [{ name: "Chicken wings", amount: "500g" }, { name: "Honey", amount: "3 tablespoons" }, { name: "Cayenne pepper", amount: "1/2 teaspoon" }],
    steps: [
      { stepNumber: 1, instruction: "Bake or airfry chicken wings til crisp.", durationSeconds: 1500, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Coat hot wings in a glaze of caramelized honey and red cayenne.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "tortilla-mozzarella-pizza", title: "Crispy Tortilla Flatbread Pizza", description: "A simple crispy flatbread made with thin tortilla, tomatoes, and mozzarella.",
    prepTime: 5, cookTime: 8, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "Italian", mealType: "Breakfast", pantryStaplesNeeded: ["Olive oil"],
    ingredients: [{ name: "Tortilla", amount: "1 piece" }, { name: "Mozzarella", amount: "1/2 cup" }, { name: "Tomato", amount: "1 whole" }],
    steps: [
      { stepNumber: 1, instruction: "Toast tortilla base on hot pan, layer tomato slices and mozzarella shred on top.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Grill/bake covered til base is crispy cracker texture, mozzarella fully bubbles.", durationSeconds: 300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "egg-drop-soup", title: "Velvety Egg Drop Soup", description: "Cozy warm bowl of feathered eggs spun with fresh ginger root.",
    prepTime: 5, cookTime: 5, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Chinese", mealType: "Snack", pantryStaplesNeeded: ["Water", "Salt"],
    ingredients: [{ name: "Eggs", amount: "2 pieces" }, { name: "Ginger", amount: "1 slice" }],
    steps: [
      { stepNumber: 1, instruction: "Boil water with ginger slices, stir water to spin a slow vortex.", durationSeconds: 185, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Slowly pour beaten egg mix into current to create delicate feathers.", durationSeconds: 115, ingredientsNeeded: [] }
    ]
  },
  {
    id: "rosemary-roasted-potatoes", title: "Rosemary Roasted Skillet Spuds", description: "Skillet browned potato wedges tossed with garden rosemary.",
    prepTime: 5, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Salt", "Olive oil"],
    ingredients: [{ name: "Potato", amount: "3 medium" }, { name: "Rosemary", amount: "2 sprigs" }],
    steps: [
      { stepNumber: 1, instruction: "Dice potatoes into wedges, fry on skillet in oil with rosemary leaves til crisp.", durationSeconds: 1200, ingredientsNeeded: [] }
    ]
  },
  {
    id: "coconut-quinoa-pudding", title: "Coconut Cream Quinoa Porridge", description: "Healthy gluten-free breakfast quinoa steamed with sweet aromatic coconut milk.",
    prepTime: 5, cookTime: 18, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "American", mealType: "Breakfast", pantryStaplesNeeded: ["Water"],
    ingredients: [{ name: "Quinoa", amount: "1/2 cup" }, { name: "Coconut milk", amount: "200ml" }, { name: "Honey", amount: "1.5 tablespoons" }],
    steps: [
      { stepNumber: 1, instruction: "Boil quinoa with sweet coconut milk and honey till fully puffed.", durationSeconds: 1380, ingredientsNeeded: [] }
    ]
  },
  {
    id: "garlic-mozzarella-bread", title: "Cheesy Garlic Mozzarella Bread", description: "Toasted sliced bread filled with delicious garlic butter and melted mozzarella.",
    prepTime: 5, cookTime: 6, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Snack", pantryStaplesNeeded: ["Butter"],
    ingredients: [{ name: "Bread", amount: "4 slices" }, { name: "Garlic cloves", amount: "2 pieces" }, { name: "Mozzarella", amount: "1/2 cup" }],
    steps: [
      { stepNumber: 1, instruction: "Stir minced garlic with butter, spread on bread, top with mozzarella, bake til bubbly.", durationSeconds: 360, ingredientsNeeded: [] }
    ]
  },
  {
    id: "simple-mushroom-risotto-lite", title: "Quick Buttered Mushroom Rice", description: "A simple Italian favorite cooking sweet mushrooms and rice together.",
    prepTime: 8, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Dinner", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Rice", amount: "1 cup" }, { name: "Mushroom", amount: "150g" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté onion and sliced mushrooms in butter, add raw rice to toast.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Ladle hot salted water, simmer covered till liquid resolves and grains expand.", durationSeconds: 720, ingredientsNeeded: [] }
    ]
  },
  {
    id: "beef-broccoli-stirfry", title: "High Heat Beef Broccoli Stir-fry", description: "Smoky speed stir-fry mixing browned ground beef, ginger, and broccoli.",
    prepTime: 10, cookTime: 8, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Chinese", mealType: "Dinner", pantryStaplesNeeded: ["Soy sauce"],
    ingredients: [{ name: "Ground beef", amount: "250g" }, { name: "Broccoli florets", amount: "1.5 cups" }, { name: "Ginger", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Blanch broccoli, sauté minced ginger, fry beef over high heat til crispy.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add broccoli and soy sauce pool, stir fry on maximum heat for 1 minute.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "lemon-pepper-asparagus-chicken", title: "Lemon Pepper Asparagus Chicken", description: "Healthy grilled chicken breasts paired with grilled lemon-pepper asparagus spears.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Olive oil", "Salt"],
    ingredients: [{ name: "Chicken breast", amount: "350g" }, { name: "Asparagus", amount: "1 bundle" }, { name: "Lemon", amount: "1 whole" }],
    steps: [
      { stepNumber: 1, instruction: "Cook chicken in pan with oil, toss in asparagus spears for final 6 minutes.", durationSeconds: 540, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Squeeze lemon juice over the hot skillet contents, serve together.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "honey-lime-salmon", title: "Sticky Honey Lime Salmon", description: "Fresh salmon loin coated with sticky tart honey and squeezed lime glaze.",
    prepTime: 5, cookTime: 10, difficulty: "Home Chef", difficultyNumber: 2, servings: 1, cuisine: "Asian-Fusion", mealType: "Dinner", pantryStaplesNeeded: [],
    ingredients: [{ name: "Salmon fillet", amount: "1 piece" }, { name: "Honey", amount: "1.5 tablespoons" }, { name: "Lime", amount: "1 whole" }],
    steps: [
      { stepNumber: 1, instruction: "Whip honey and lime juice, sear salmon fillet skin-side down in pan.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Incorporate lime honey syrup, glaze over fillet on high heat.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "creamy-heavy-cream-pasta", title: "Velvet Cream & Parmesan Pasta", description: "A simple Italian pasta sauce composed of heavy cream, melting butter, and parmesan.",
    prepTime: 5, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Dinner", pantryStaplesNeeded: ["Butter"],
    ingredients: [{ name: "Pasta", amount: "200g" }, { name: "Heavy cream", amount: "150ml" }, { name: "Parmesan cheese", amount: "1/3 cup" }],
    steps: [
      { stepNumber: 1, instruction: "Boil pasta and simmer heavy cream and melting butter until bubbly.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Toss pasta inside warm cream, sprinkle parmesan cheese and stir.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "chocolate-cocoa-cake", title: "Easy Baker's Cocoa Cake", description: "Single-serve microwave mug cake with rich cocoa powder.",
    prepTime: 5, cookTime: 3, difficulty: "Apprentice", difficultyNumber: 1, servings: 1, cuisine: "American", mealType: "Snack", pantryStaplesNeeded: ["Flour", "Milk", "Sugar"],
    ingredients: [{ name: "Cocoa powder", amount: "2 tablespoons" }, { name: "Baking powder", amount: "1/2 teaspoon" }, { name: "Eggs", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Stir flour, cocoa, sugar, baking powder, milk, and eggs inside a mug.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Microwave on highest power for 90 seconds until fully rose.", durationSeconds: 90, ingredientsNeeded: [] }
    ]
  },
  {
    id: "pork-belly-skewers", title: "Caramelized Soy Pork Skewers", description: "Pork belly strips skewered and grilled with minced garlic and soy sauce glaze.",
    prepTime: 10, cookTime: 12, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Japanese", mealType: "Snack", pantryStaplesNeeded: ["Soy sauce"],
    ingredients: [{ name: "Pork belly", amount: "300g" }, { name: "Garlic cloves", amount: "2 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Cut pork into strips, thread onto skewers, coat in garlic soy sauce marinade, grill til crispy.", durationSeconds: 720, ingredientsNeeded: [] }
    ]
  },
  {
    id: "bacon-spinach-frittata", title: "Bacon and Wilted Spinach Frittata", description: "A gorgeous pan starter baking whipped eggs with spinach and bacon crumbles.",
    prepTime: 5, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Italian", mealType: "Breakfast", pantryStaplesNeeded: ["Eggs", "Butter"],
    ingredients: [{ name: "Bacon", amount: "3 strips" }, { name: "Spinach", amount: "1.5 cups" }],
    steps: [
      { stepNumber: 1, instruction: "Fry bacon bits, toss spinach to wilt inside bacon fat, dump whipped eggs inside.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Bake under grill until frittata is puffed and set.", durationSeconds: 600, ingredientsNeeded: [] }
    ]
  },
  {
    id: "sausage-zucchini-skillet", title: "Rustic Sausage & Zucchini Skillet", description: "Sliced sausages and green zucchini coins sautéed to a crisp in olive oil.",
    prepTime: 5, cookTime: 12, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Italian", mealType: "Dinner", pantryStaplesNeeded: ["Olive oil"],
    ingredients: [{ name: "Sausages", amount: "3 pieces" }, { name: "Zucchini", amount: "1 large" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Slice sausages and veggie coins, sauté together in olive oil until browned and tender.", durationSeconds: 720, ingredientsNeeded: [] }
    ]
  },
  {
    id: "crispy-fried-chicken", title: "Crispy Golden Chicken Fingers", description: "Chicken strips fried with crunchy breadcrumbs coating.",
    prepTime: 10, cookTime: 12, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "American", mealType: "Lunch", pantryStaplesNeeded: ["Butter"],
    ingredients: [{ name: "Chicken breast", amount: "300g" }, { name: "Breadcrumbs", amount: "1 cup" }, { name: "Eggs", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Dredge seasoned chicken breast in egg wash and coat with breadcrumbs.", durationSeconds: 420, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Fry in sizzling butter over medium-high heat until golden crisp.", durationSeconds: 600, ingredientsNeeded: [] }
    ]
  },
  {
    id: "butter-chicken-essentia", title: "Butter Chicken Essentia", description: "Tender chicken cooked in a rich, spiced buttery tomato gravy smoothed with fresh heavy cream.",
    prepTime: 15, cookTime: 20, difficulty: "Home Chef", difficultyNumber: 2, servings: 2, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Chicken thighs", amount: "400g" }, { name: "Tomato", amount: "2 medium" }, { name: "Garlic cloves", amount: "3 pieces" }, { name: "Ginger", amount: "1 piece" }, { name: "Heavy cream", amount: "100ml" }],
    steps: [
      { stepNumber: 1, instruction: "Sear chicken thigh pieces in hot butter until golden, then set aside.", durationSeconds: 360, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Sauté minced ginger and garlic, then simmer with crushed tomatoes and spices to form a rich paste.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Stir in heavy cream and cooked chicken, simmering until the sauce is velvety and fragrant.", durationSeconds: 360, ingredientsNeeded: [] }
    ]
  },
  {
    id: "aromatic-veg-biryani", title: "Aromatic Vegetable Biryani", description: "Layers of seasoned aromatic Basmati rice cooked with fresh carrots, potatoes, and sweet spices.",
    prepTime: 15, cookTime: 25, difficulty: "Home Chef", difficultyNumber: 2, servings: 3, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Water"],
    ingredients: [{ name: "Rice", amount: "2 cups" }, { name: "Carrot", amount: "1 medium" }, { name: "Potato", amount: "2 medium" }, { name: "Onion", amount: "1 whole" }, { name: "Cilantro", amount: "1/2 bundle" }],
    steps: [
      { stepNumber: 1, instruction: "Parboil Basmati rice in highly seasoned water until 70% cooked, then drain.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Sauté sliced onions, diced carrots, and potatoes in oil until tender and deeply caramelized.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Layer the parboiled rice over the cooked veggies, cover tightly, and steam on lowest heat to seal the aroma.", durationSeconds: 420, ingredientsNeeded: [] }
    ]
  },
  {
    id: "palak-cheese-curry", title: "Palak Cheese Curry", description: "Pureed fresh spinach greens cooked with aromatic garlic, ginger, and melted savory cheese cubes.",
    prepTime: 10, cookTime: 12, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Indian", mealType: "Lunch", pantryStaplesNeeded: ["Salt", "Butter"],
    ingredients: [{ name: "Spinach", amount: "2 cups" }, { name: "Garlic cloves", amount: "4 cloves" }, { name: "Ginger", amount: "1 slice" }, { name: "Onion", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Blanch the fresh spinach, then drain and blend into a smooth vibrant green puree.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Sauté minced garlic, ginger, and diced onions in butter until soft.", durationSeconds: 240, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Pour in spinach puree, fold in cheese cubes, and cook on low heat until bubbly.", durationSeconds: 180, ingredientsNeeded: [] }
    ]
  },
  {
    id: "golden-lentil-tadka", title: "Comforting Yellow Dal Tadka", description: "Warm cozy yellow split peas simmered soft and finished with a sizzling garlic-cumin oil tempering.",
    prepTime: 5, cookTime: 20, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Indian", mealType: "Lunch", pantryStaplesNeeded: ["Salt", "Water"],
    ingredients: [{ name: "Garlic cloves", amount: "3 cloves" }, { name: "Onion", amount: "1/2 piece" }, { name: "Tomato", amount: "1 medium" }, { name: "Cilantro", amount: "1/4 bundle" }],
    steps: [
      { stepNumber: 1, instruction: "Simmer yellow split peas in salted water with chopped tomatoes until perfectly creamy.", durationSeconds: 900, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Prepare tempering in a small pan by frying minced garlic in hot oil until golden brown.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Pour the sizzling garlic tempering directly into the simmering lentils and garnish with fresh cilantro.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "spiced-aloo-gobi", title: "Dry Spiced Aloo Gobi Skillet", description: "A simple vegetarian favorite of roasted potato wedges and bite-sized cauliflower sautéed dry with ginger.",
    prepTime: 10, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Indian", mealType: "Lunch", pantryStaplesNeeded: ["Salt"],
    ingredients: [{ name: "Potato", amount: "2 medium" }, { name: "Broccoli florets", amount: "1.5 cups" }, { name: "Ginger", amount: "1 piece" }, { name: "Garlic cloves", amount: "2 cloves" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté the potato cubes and broccoli florets in a hot skillet with ginger and garlic until golden and tender.", durationSeconds: 900, ingredientsNeeded: [] }
    ]
  },
  {
    id: "tangy-chana-masala", title: "Zesty Chickpea Chana Masala", description: "Soft chickpeas slow cooked in a savory, zesty onion and tomato curry seasoned with ginger and fresh lemon.",
    prepTime: 5, cookTime: 15, difficulty: "Apprentice", difficultyNumber: 1, servings: 2, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Water"],
    ingredients: [{ name: "Tomato", amount: "2 medium" }, { name: "Onion", amount: "1 whole" }, { name: "Garlic cloves", amount: "3 cloves" }, { name: "Ginger", amount: "1 slice" }, { name: "Lemon", amount: "1/2 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Sauté diced onions, minced ginger, and garlic until deeply golden brown.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add chopped tomatoes and simmer with chickpeas to form a rich thick curry.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Finish with a squeeze of fresh lemon juice and serve steaming hot.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "chicken-biryani", title: "Royal Chicken Biryani", description: "Aromatic basmati rice cooked in layers with juicy marinated chicken, browned onions, saffron, and fresh mint.",
    prepTime: 20, cookTime: 30, difficulty: "Home Chef", difficultyNumber: 2, servings: 4, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Water", "Butter"],
    ingredients: [{ name: "Chicken thighs", amount: "500g" }, { name: "Rice", amount: "2 cups" }, { name: "Onion", amount: "2 whole" }, { name: "Cilantro", amount: "1/2 bundle" }],
    steps: [
      { stepNumber: 1, instruction: "Marinate chicken in spiced yogurt and parboil basmati rice with whole spices until 70% cooked.", durationSeconds: 600, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Sauté sliced onions until caramelized, then cook marinated chicken in a thick gravy.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Layer parboiled rice over chicken, garnish with mint and browned onions, and steam covered to seal flavor.", durationSeconds: 720, ingredientsNeeded: [] }
    ]
  },
  {
    id: "mutton-biryani", title: "Authentic Mutton Biryani", description: "Rich, slow-cooked basmati rice dish featuring tender bone-in mutton pieces infused with spice-laden yogurt layers.",
    prepTime: 25, cookTime: 40, difficulty: "Professional Chef", difficultyNumber: 3, servings: 4, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Water", "Butter"],
    ingredients: [{ name: "Mutton pieces", amount: "500g" }, { name: "Rice", amount: "2 cups" }, { name: "Onion", amount: "2 whole" }, { name: "Ginger", amount: "1 piece" }],
    steps: [
      { stepNumber: 1, instruction: "Slow-braise mutton with spices and spiced yogurt until exceptionally tender and juicy.", durationSeconds: 1200, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Parboil choice basmati rice with aromatic green cardamoms and cloves until tender yet firm.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Layer the parboiled rice and braised mutton, drizzle with saffron extract, and steam over low heat.", durationSeconds: 720, ingredientsNeeded: [] }
    ]
  },
  {
    id: "mutton-paya-soup", title: "Traditional Mutton Paya Soup", description: "A deeply nourishing, collagen-rich trotters broth slow-simmered with warm spiced oil, ginger, and garlic keys.",
    prepTime: 15, cookTime: 60, difficulty: "Professional Chef", difficultyNumber: 3, servings: 3, cuisine: "Indian", mealType: "Dinner", pantryStaplesNeeded: ["Salt", "Water", "Butter"],
    ingredients: [{ name: "Mutton trotters", amount: "4 pieces" }, { name: "Onion", amount: "1 whole" }, { name: "Ginger", amount: "1 piece" }, { name: "Garlic cloves", amount: "4 cloves" }],
    steps: [
      { stepNumber: 1, instruction: "Sear cleaned mutton trotters in hot sizzling butter alongside whole spices and sliced onions.", durationSeconds: 300, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Add generous water and fresh ginger-garlic paste, then slow-cook on medium-low until meat is tender.", durationSeconds: 3300, ingredientsNeeded: [] }
    ]
  },
  {
    id: "fried-mozzarella-sticks", title: "Crispy Fried Mozzarella Sticks", description: "Classic hot appetizers of gooey, stretchy mozzarella cheese coated in herb-seasoned golden breadcrumbs.",
    prepTime: 15, cookTime: 10, difficulty: "Apprentice", difficultyNumber: 1, servings: 3, cuisine: "American", mealType: "Snack", pantryStaplesNeeded: ["Salt"],
    ingredients: [{ name: "Mozzarella", amount: "200g" }, { name: "Breadcrumbs", amount: "1 cup" }, { name: "Flour", amount: "1/2 cup" }, { name: "Eggs", amount: "2 pieces" }],
    steps: [
      { stepNumber: 1, instruction: "Cut mozzarella, dredge sticks in flour, dip in beaten eggs, and coat with seasoned breadcrumbs.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Freeze mozzarella sticks for at least an hour to ensure they do not leak while frying.", durationSeconds: 1200, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Flash-fry sticks in hot simmering oil until exterior is a golden crispy crunch with a stretchy molten core.", durationSeconds: 120, ingredientsNeeded: [] }
    ]
  },
  {
    id: "paneer-butter-masala", title: "Creamy Paneer Butter Masala", description: "Soft cubes of premium paneer cheese simmered inside a velvety-smooth, sweet and spiced butter tomato curry gravy.",
    prepTime: 10, cookTime: 15, difficulty: "Home Chef", difficultyNumber: 2, servings: 3, cuisine: "Indian", mealType: "Lunch", pantryStaplesNeeded: ["Butter", "Salt"],
    ingredients: [{ name: "Paneer cubes", amount: "250g" }, { name: "Tomato", amount: "3 medium" }, { name: "Onion", amount: "1 whole" }, { name: "Heavy cream", amount: "50ml" }],
    steps: [
      { stepNumber: 1, instruction: "Toast the paneer cheese cubes in foaming warm butter until slightly golden on all sides, then set aside.", durationSeconds: 180, ingredientsNeeded: [] },
      { stepNumber: 2, instruction: "Sauté chopped onions, garlic, ginger, and tomatoes, then blend into a silky smooth curry pureed sauce base.", durationSeconds: 480, ingredientsNeeded: [] },
      { stepNumber: 3, instruction: "Combine blended gravy, remaining butter, paneer cubes, and heavy cream. Simmer until bubbly-thick.", durationSeconds: 240, ingredientsNeeded: [] }
    ]
  }
];

export const ACHIEVEMENTS = [
  {
    id: "first_steps",
    title: "First Steps",
    description: "Complete your first cooking recipe safely."
  },
  {
    id: "steady_cook",
    title: "Steady Cook",
    description: "Earn 1000 accumulated XP points."
  },
  {
    id: "perfect_tempo",
    title: "Perfect Tempo",
    description: "Complete a recipe with perfect timer accuracy."
  },
  {
    id: "expert_plates",
    title: "Master Seeker",
    description: "Reach Culinary Level 6 (Home Chef)."
  },
  {
    id: "flawless_run",
    title: "Zen Kitchen",
    description: "Complete an advanced or expert recipe with zero pauses."
  },
  {
    id: "favorites_lock",
    title: "Gourmet Curator",
    description: "Save 3 recipes in your favorites toolbox."
  }
];

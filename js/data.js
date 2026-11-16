/**
 * Recipe Discovery Website - Data Store
 * Pure Vanilla JavaScript
 */

const RECIPES_DATA = [
  {
    id: 1,
    name: "Classic Fluffy Blueberry Pancakes",
    category: "Breakfast",
    cookingTime: 20,
    prepTime: 10,
    servings: 4,
    calories: 340,
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 128,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-blueberry-pancakes.webp",
    description: "Golden, stackable fluffy pancakes packed with bursting fresh blueberries and served with warm pure maple syrup.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp granulated sugar",
      "2 tsp baking powder",
      "1/2 tsp fine sea salt",
      "1 1/2 cups whole milk",
      "2 large organic eggs",
      "1/4 cup unsalted butter, melted",
      "1 cup fresh blueberries",
      "Pure maple syrup & butter pats for serving"
    ],
    instructions: [
      "Whisk together flour, sugar, baking powder, and salt in a large mixing bowl.",
      "In a separate bowl, whisk together milk, eggs, and melted butter.",
      "Gently pour wet ingredients into dry ingredients and fold until just combined (small lumps ensure fluffiness).",
      "Fold in fresh blueberries with a silicone spatula.",
      "Heat a lightly oiled griddle or non-stick skillet over medium heat.",
      "Pour 1/4 cup of batter per pancake. Cook for 2-3 minutes until surface bubbles burst, then flip and cook for 1-2 minutes until golden brown.",
      "Serve warm stacked high with warm maple syrup and a knob of creamery butter."
    ]
  },
  {
    id: 2,
    name: "Creamy Tuscan Garlic Chicken",
    category: "Dinner",
    cookingTime: 30,
    prepTime: 15,
    servings: 4,
    calories: 520,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 245,
    isPopular: true,
    isHero: true, // Featured hero recipe
    image: "assets/images/recipe-tuscan-chicken.webp",
    description: "Tender pan-seared chicken breasts enveloped in a rich, velvety garlic parmesan cream sauce with sun-dried tomatoes and baby spinach.",
    ingredients: [
      "2 large chicken breasts, halved horizontally into 4 cutlets",
      "1 tbsp extra virgin olive oil",
      "1 tbsp unsalted butter",
      "5 cloves garlic, finely minced",
      "1/2 cup low-sodium chicken broth",
      "1 cup heavy whipping cream",
      "1/2 cup freshly grated Parmigiano-Reggiano",
      "1 cup fresh baby spinach",
      "1/2 cup sun-dried tomatoes in oil, drained & sliced",
      "1 tsp Italian seasoning, sea salt and cracked pepper"
    ],
    instructions: [
      "Season chicken cutlets on both sides with Italian seasoning, salt, and freshly cracked black pepper.",
      "Heat olive oil and butter in a large skillet over medium-high heat. Sear chicken 5-6 minutes per side until golden brown and cooked through (165°F). Transfer to a plate.",
      "In the same skillet, add minced garlic and saute for 60 seconds until fragrant.",
      "Pour in chicken broth, scraping up fond (browned bits) from the skillet bottom.",
      "Lower heat to medium and pour in heavy cream and grated parmesan. Simmer gently for 3-4 minutes until sauce thickens slightly.",
      "Stir in sliced sun-dried tomatoes and fresh baby spinach; cook until spinach is gently wilted.",
      "Return chicken and accumulated juices back to pan. Spoon creamy sauce over cutlets and garnish with fresh basil. Serve over pasta or rice."
    ]
  },
  {
    id: 3,
    name: "Avocado & Soft-Poached Egg Sourdough",
    category: "Breakfast",
    cookingTime: 15,
    prepTime: 5,
    servings: 2,
    calories: 290,
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 94,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-avocado-egg-toast.webp",
    description: "Crispy artisan sourdough toast spread with creamy seasoned avocado and topped with a runny poached egg and chili flakes.",
    ingredients: [
      "2 thick slices of artisan sourdough bread",
      "1 ripe Haas avocado",
      "2 fresh pasture-raised eggs",
      "1 tbsp fresh lemon juice",
      "1/2 tsp red pepper flakes",
      "1 tbsp white vinegar (for poaching)",
      "Flaky sea salt (Maldon) and black pepper",
      "Fresh microgreens or pea shoots for garnish"
    ],
    instructions: [
      "Bring 3 inches of water to a gentle simmer in a medium saucepan; add 1 tbsp white vinegar.",
      "In a bowl, coarsely mash avocado flesh with fresh lemon juice, sea salt, and black pepper.",
      "Toast sourdough slices until deeply golden and crispy.",
      "Stir the simmering water into a vortex, crack an egg in the center, and poach for 3 minutes for a soft, runny yolk. Remove with a slotted spoon.",
      "Spread mashed avocado generously over warm sourdough slices.",
      "Crown each toast with a poached egg, sprinkle with flaky sea salt and red chili flakes, and garnish with fresh microgreens."
    ]
  },
  {
    id: 4,
    name: "Mediterranean Quinoa Nourish Bowl",
    category: "Lunch",
    cookingTime: 25,
    prepTime: 15,
    servings: 2,
    calories: 410,
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 86,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-quinoa-bowl.webp",
    description: "Fluffy quinoa tossed with crisp English cucumbers, kalamata olives, cherry tomatoes, and tangy feta cheese in a lemon-oregano vinaigrette.",
    ingredients: [
      "1 cup cooked tri-color quinoa, cooled",
      "1 cup sweet cherry tomatoes, halved",
      "1 cup English cucumber, diced",
      "1/2 cup Kalamata olives, pitted and halved",
      "1/3 cup authentic Greek feta cheese, crumbled",
      "1/4 cup red onion, thinly slivered",
      "2 tbsp extra virgin Greek olive oil",
      "1 tbsp fresh lemon juice",
      "1 tsp dried oregano, sea salt and black pepper"
    ],
    instructions: [
      "Cook quinoa according to package directions, fluff with a fork, and let cool to room temperature.",
      "In a small glass jar, shake olive oil, fresh lemon juice, dried oregano, salt, and pepper into an emulsified dressing.",
      "Divide cooled quinoa into two wide shallow bowls.",
      "Artfully arrange halved tomatoes, diced cucumbers, Kalamata olives, and red onion atop the quinoa.",
      "Scatter crumbled feta cheese over the top and drizzle generously with vinaigrette.",
      "Toss lightly before enjoying."
    ]
  },
  {
    id: 5,
    name: "Artisan Grilled Margherita Panini",
    category: "Lunch",
    cookingTime: 12,
    prepTime: 8,
    servings: 2,
    calories: 460,
    difficulty: "Easy",
    rating: 4.6,
    reviewsCount: 52,
    isPopular: false,
    isHero: false,
    image: "assets/images/recipe-grilled-panini.webp",
    description: "Crispy golden ciabatta pressed with melted fresh mozzarella, ripe Roma tomatoes, aromatic basil leaves, and balsamic reduction.",
    ingredients: [
      "2 artisan ciabatta rolls, sliced lengthwise",
      "6 oz fresh mozzarella cheese, sliced",
      "2 ripe vine tomatoes, sliced",
      "1/4 cup fresh sweet basil leaves",
      "2 tbsp Genovese basil pesto",
      "1 tbsp aged balsamic glaze",
      "1 tbsp olive oil or butter for crust pressing"
    ],
    instructions: [
      "Spread fresh basil pesto evenly over the bottom halves of ciabatta rolls.",
      "Layer mozzarella slices, tomato rounds, and fresh basil leaves.",
      "Drizzle with aged balsamic glaze and cover with the top bread slices.",
      "Lightly brush outsides of bread with olive oil or butter.",
      "Heat a panini grill or cast iron grill pan over medium heat.",
      "Press sandwich firmly for 4-5 minutes until bread is crisp and mozzarella is completely melted and gooey."
    ]
  },
  {
    id: 6,
    name: "Authentic Thai Green Chicken Curry",
    category: "Dinner",
    cookingTime: 35,
    prepTime: 15,
    servings: 4,
    calories: 480,
    difficulty: "Medium",
    rating: 4.9,
    reviewsCount: 167,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-thai-green-curry.webp",
    description: "An authentic Thai coconut curry simmered with tender chicken, bamboo shoots, bell peppers, and fragrant Thai sweet basil.",
    ingredients: [
      "1 lb boneless chicken thighs, cut into bite-sized pieces",
      "3 tbsp authentic Thai green curry paste",
      "1 can (14 oz) full-fat coconut milk",
      "1/2 cup organic chicken stock",
      "1 cup bamboo shoots, drained",
      "1 red bell pepper, thinly sliced",
      "1 tbsp fish sauce",
      "1 tbsp palm sugar or dark brown sugar",
      "1/2 cup fresh Thai sweet basil leaves",
      "Steamed jasmine rice & lime wedges for serving"
    ],
    instructions: [
      "Heat 3 tbsp of thick coconut cream from top of the can in a wok over medium heat.",
      "Stir in green curry paste and fry for 2-3 minutes until aromatic and oil glistens.",
      "Add chicken pieces, searing until coated in the green curry paste.",
      "Pour in remaining coconut milk and chicken stock; bring to a gentle simmer.",
      "Add sliced bell peppers and bamboo shoots. Simmer for 10-12 minutes until chicken is tender.",
      "Season with fish sauce and palm sugar to balance sweet, salty, and spicy.",
      "Turn off the heat, fold in fresh Thai basil leaves, and serve with steaming jasmine rice."
    ]
  },
  {
    id: 7,
    name: "Decadent Molten Chocolate Lava Cakes",
    category: "Desserts",
    cookingTime: 14,
    prepTime: 15,
    servings: 4,
    calories: 450,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 310,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-chocolate-lava-cake.webp",
    description: "Rich dark chocolate individual cakes with an irresistible warm, gooey molten center that flows upon the first spoon.",
    ingredients: [
      "6 oz bittersweet Belgian chocolate (70%), chopped",
      "1/2 cup unsalted butter",
      "2 large whole eggs + 2 egg yolks",
      "1/3 cup granulated sugar",
      "1/4 tsp salt",
      "2 tbsp all-purpose flour",
      "Dutch-process cocoa powder for dusting ramekins",
      "Vanilla bean gelato and fresh raspberries for serving"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter four 6-oz ramekins and dust inside with cocoa powder.",
      "Melt chopped chocolate and butter in a heatproof bowl set over simmering water; whisk until glossy.",
      "In a separate bowl, whisk eggs, egg yolks, sugar, and salt until pale and frothy.",
      "Fold melted chocolate into egg mixture gently, then sift in flour and fold until just combined.",
      "Divide batter among the prepared ramekins.",
      "Bake for 12-14 minutes until sides are set and center is soft and slightly jiggly.",
      "Let sit for 1 minute, invert onto dessert plates, dust with powdered sugar, and serve with vanilla bean gelato."
    ]
  },
  {
    id: 8,
    name: "Classic Italian Coffee Tiramisu",
    category: "Desserts",
    cookingTime: 20,
    prepTime: 25,
    servings: 6,
    calories: 380,
    difficulty: "Easy",
    rating: 4.8,
    reviewsCount: 112,
    isPopular: false,
    isHero: false,
    image: "assets/images/recipe-italian-tiramisu.webp",
    description: "Layers of espresso-soaked Italian savoiardi cookies and velvety mascarpone cream, finished with fine Dutch cocoa powder.",
    ingredients: [
      "24 Italian savoiardi (ladyfinger biscuits)",
      "1 1/4 cups freshly brewed strong espresso, cooled",
      "16 oz mascarpone cheese, room temperature",
      "3 large egg yolks",
      "1/2 cup sugar",
      "1 cup cold heavy whipping cream",
      "2 tbsp dark rum or coffee liqueur (optional)",
      "Unsweetened cocoa powder for dusting"
    ],
    instructions: [
      "Beat egg yolks and sugar in a heatproof bowl over simmering water for 4-5 minutes until pale and creamy; let cool.",
      "Gently fold mascarpone into yolk mixture until velvety and smooth.",
      "Whip heavy cream in a chilled bowl until stiff peaks form. Fold gently into the mascarpone cream.",
      "Combine cooled espresso and liqueur in a shallow bowl.",
      "Quickly dip ladyfingers (1 second per side) and arrange in an even layer in a serving dish.",
      "Spread half of the mascarpone cream over cookies. Repeat with another layer of dipped cookies and remaining cream.",
      "Chill for at least 4 hours (ideally overnight). Dust generously with cocoa powder before slicing."
    ]
  },
  {
    id: 9,
    name: "Garlic Butter Herb-Seared Salmon",
    category: "Dinner",
    cookingTime: 18,
    prepTime: 10,
    servings: 2,
    calories: 420,
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 140,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-garlic-butter-salmon.webp",
    description: "Crispy skin wild salmon fillets pan-basted with golden garlic, butter, fresh rosemary sprigs, and lemon slices.",
    ingredients: [
      "2 wild salmon fillets (6 oz each), skin-on",
      "2 tbsp unsalted butter",
      "1 tbsp olive oil",
      "3 cloves garlic, smashed",
      "1/2 fresh lemon, sliced into wheels",
      "2 sprigs fresh rosemary & thyme",
      "Coarse sea salt and cracked black pepper",
      "Fresh Italian parsley, chopped"
    ],
    instructions: [
      "Pat salmon completely dry with paper towels; season both sides with salt and pepper.",
      "Heat olive oil in a non-stick skillet over medium-high heat until hot.",
      "Place salmon skin-side down, press gently for 15 seconds, and sear for 4-5 minutes until skin is ultra-crispy.",
      "Carefully flip fillets over and reduce heat to medium.",
      "Add butter, smashed garlic, lemon slices, and fresh rosemary sprigs into the skillet.",
      "As butter foams, spoon aromatic melted herb butter repeatedly over salmon fillets for 3-4 minutes until cooked to medium.",
      "Garnish with chopped fresh parsley and serve with roasted asparagus."
    ]
  },
  {
    id: 10,
    name: "Acai Berry Superfood Power Bowl",
    category: "Breakfast",
    cookingTime: 10,
    prepTime: 10,
    servings: 2,
    calories: 310,
    difficulty: "Easy",
    rating: 4.7,
    reviewsCount: 78,
    isPopular: false,
    isHero: false,
    image: "assets/images/recipe-acai-power-bowl.webp",
    description: "Thick, frosty organic acai smoothie bowl decorated with fresh sliced fruits, crunchy toasted granola, and chia seeds.",
    ingredients: [
      "2 frozen unsweetened acai puree packets",
      "1 frozen ripe banana",
      "1 cup frozen wild blueberries and strawberries",
      "1/2 cup unsweetened almond or oat milk",
      "1 tbsp raw wildflower honey or agave",
      "Toppings: Sliced banana, fresh berries, chia seeds, hemp hearts, toasted coconut flakes"
    ],
    instructions: [
      "Break acai packets into a high-powered blender alongside frozen banana, berries, and almond milk.",
      "Blend on low-to-medium speed using the tamper until thick like soft-serve ice cream.",
      "Pour into two chilled ceramic bowls.",
      "Arrange fresh banana slices, whole berries, crunchy granola, and chia seeds in decorative rows on top.",
      "Drizzle with honey and enjoy immediately with a spoon."
    ]
  },
  {
    id: 11,
    name: "Crispy Herbed Falafel Tahini Wrap",
    category: "Lunch",
    cookingTime: 22,
    prepTime: 18,
    servings: 3,
    calories: 390,
    difficulty: "Medium",
    rating: 4.6,
    reviewsCount: 65,
    isPopular: false,
    isHero: false,
    image: "assets/images/recipe-falafel-wrap.webp",
    description: "Crunchy chickpea falafel patties wrapped in warm pita bread with crisp greens, diced tomatoes, and rich garlic tahini sauce.",
    ingredients: [
      "1 can (15 oz) chickpeas, thoroughly drained and dried",
      "1/2 cup fresh flat-leaf parsley and cilantro",
      "3 cloves garlic, minced",
      "1 tsp ground cumin, 1/2 tsp coriander, 1/2 tsp baking powder",
      "3 tbsp chickpea or all-purpose flour",
      "3 large warm pita or flatbread rounds",
      "1/4 cup tahini paste mixed with lemon juice and ice water",
      "Sliced cucumbers, pickled turnips, and shredded romaine"
    ],
    instructions: [
      "Pulse chickpeas, fresh herbs, garlic, spices, and flour in a food processor until finely minced.",
      "Form mixture into 1-inch patties and rest in refrigerator for 10 minutes.",
      "Heat 2 tbsp oil in a skillet over medium heat; fry patties 3-4 minutes per side until golden brown and crispy.",
      "Warm pita bread in a dry skillet.",
      "Layer warm pita with crisp greens, sliced tomatoes, crispy falafels, and pickled turnips.",
      "Drizzle generously with lemon-garlic tahini sauce and roll up snugly."
    ]
  },
  {
    id: 12,
    name: "Classic French Glazed Strawberry Tart",
    category: "Desserts",
    cookingTime: 40,
    prepTime: 25,
    servings: 8,
    calories: 360,
    difficulty: "Hard",
    rating: 4.8,
    reviewsCount: 92,
    isPopular: false,
    isHero: false,
    image: "assets/images/recipe-strawberry-tart.webp",
    description: "Crispy sweet pâte sablée tart shell filled with silky vanilla pastry cream and topped with glazed fresh strawberries.",
    ingredients: [
      "1 blind-baked 9-inch sweet shortcrust tart shell",
      "2 cups whole milk",
      "1 vanilla bean, split and scraped",
      "4 egg yolks",
      "1/2 cup granulated sugar",
      "3 tbsp cornstarch",
      "2 tbsp unsalted butter",
      "1 lb fresh sweet strawberries, hulled and halved",
      "3 tbsp apricot preserves warmed with 1 tbsp water (glaze)"
    ],
    instructions: [
      "Heat milk and scraped vanilla bean in a saucepan over medium heat until steaming.",
      "Whisk egg yolks, sugar, and cornstarch together in a heatproof bowl until pale.",
      "Gradually whisk hot milk into yolk mixture to temper, then return mixture to saucepan.",
      "Whisk continuously over medium heat until pastry cream boils and thickens. Off heat, whisk in butter.",
      "Cover pastry cream with plastic wrap directly against the surface and chill until cold.",
      "Spread chilled pastry cream evenly into the baked tart shell.",
      "Arrange fresh strawberries in concentric circles on top.",
      "Brush strawberries with warm apricot glaze for a patisserie shine; chill 30 minutes before serving."
    ]
  },
  {
    id: 13,
    name: "Artisan Shakshuka with Feta & Crusty Bread",
    category: "Breakfast",
    cookingTime: 25,
    prepTime: 10,
    servings: 3,
    calories: 320,
    difficulty: "Easy",
    rating: 4.9,
    reviewsCount: 156,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-shakshuka-feta.webp",
    description: "Gently poached eggs in a simmering spiced tomato, sweet bell pepper, cumin, and smoked paprika sauce topped with crumbled sheep's feta.",
    ingredients: [
      "4 large farm-fresh eggs",
      "1 can (14 oz) whole peeled San Marzano tomatoes, crushed by hand",
      "1 medium yellow onion, diced",
      "1 red bell pepper, thinly sliced",
      "3 cloves garlic, minced",
      "1 tsp ground cumin, 1 tsp smoked Spanish paprika",
      "1/3 cup crumbled Greek feta cheese",
      "Fresh cilantro or flat-leaf parsley",
      "Thick slices of crusty artisan bread for dipping"
    ],
    instructions: [
      "Heat olive oil in a deep cast iron skillet over medium heat.",
      "Add diced onion and red bell pepper; saute for 6-8 minutes until soft and caramelized.",
      "Add minced garlic, cumin, and smoked paprika; saute for 1 minute until fragrant.",
      "Pour in crushed tomatoes and simmer gently for 10 minutes until sauce thickens.",
      "Make 4 small wells in the sauce with a spoon and crack an egg into each well.",
      "Cover skillet and cook for 5-8 minutes until egg whites are set and yolks remain runny.",
      "Remove lid, sprinkle with crumbled feta cheese and fresh cilantro, and serve immediately with crusty bread."
    ]
  },
  {
    id: 14,
    name: "Slow-Braised Beef Ragu Tagliatelle",
    category: "Dinner",
    cookingTime: 55,
    prepTime: 20,
    servings: 4,
    calories: 590,
    difficulty: "Medium",
    rating: 5.0,
    reviewsCount: 220,
    isPopular: true,
    isHero: false,
    image: "assets/images/recipe-beef-ragu-tagliatelle.webp",
    description: "Melt-in-your-mouth slow-braised beef chuck simmered with Chianti wine, San Marzano tomatoes, and fresh herbs over tagliatelle pasta.",
    ingredients: [
      "1.5 lbs beef chuck roast, cut into 1-inch cubes",
      "1 lb fresh egg tagliatelle pasta",
      "1 cup dry red wine (Chianti or Cabernet)",
      "1 can (28 oz) San Marzano crushed tomatoes",
      "1 finely diced onion, 1 carrot, and 1 celery stalk (soffritto)",
      "3 cloves garlic, minced",
      "2 sprigs fresh rosemary, 2 bay leaves",
      "Freshly grated Parmigiano-Reggiano and fresh basil"
    ],
    instructions: [
      "Pat beef cubes dry, season generously with salt and pepper, and brown deeply in olive oil in a Dutch oven.",
      "Remove beef, lower heat, and add soffritto (onion, carrot, celery) and garlic; cook until soft.",
      "Pour in red wine, scraping up browned bits, and simmer until reduced by half.",
      "Add crushed tomatoes, rosemary sprigs, and bay leaves. Return browned beef to the pot.",
      "Cover and simmer on low for 40-45 minutes until beef is fork-tender and shreds easily.",
      "Cook tagliatelle in well-salted boiling water until al dente.",
      "Toss pasta directly into the rich beef ragu, top with plenty of Parmigiano-Reggiano, and serve hot."
    ]
  }
];

const CATEGORIES_DATA = [
  {
    name: "Breakfast",
    subtitle: "Morning energy & pancakes",
    icon: "fa-solid fa-mug-saucer",
    image: "assets/images/category-breakfast.webp"
  },
  {
    name: "Lunch",
    subtitle: "Wholesome bowls & paninis",
    icon: "fa-solid fa-bowl-food",
    image: "assets/images/category-lunch.webp"
  },
  {
    name: "Dinner",
    subtitle: "Hearty steaks, curries & pasta",
    icon: "fa-solid fa-utensils",
    image: "assets/images/category-dinner.webp"
  },
  {
    name: "Desserts",
    subtitle: "Sweet tarts & chocolate cakes",
    icon: "fa-solid fa-cake-candles",
    image: "assets/images/category-desserts.webp"
  }
];

const CONTACT_INFO = {
  address: "MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008",
  email: "info@stackly.com",
  phone: "9876543210",
  phoneDisplay: "+91 9876543210",
  mapUrl: "https://www.google.com/maps/place/Stackly/@11.6829566,78.1739798,17z/data=!3m1!4b1!4m6!3m5!1s0x3babefef7fd970bb:0xe11aef1a71994f9!8m2!3d11.6829566!4d78.1739798!16s%2Fg%2F11l660s35r?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D",
  embedUrl: "https://maps.google.com/maps?q=11.6829566,78.1739798&hl=en&z=17&output=embed"
};

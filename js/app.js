/**
 * Recipe Discovery & Meal Planner - Master Application Controller
 * Supports Multi-Page Architecture (Home, Explore Recipes, My Meal Plan)
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  "use strict";

  // ================= 1. Storage Keys & Global State =================
  const STORAGE_KEYS = {
    MEAL_PLAN: "stackly_meal_plan",
    FAVORITES: "stackly_favorites"
  };

  function loadStorage(key, fallback) {
    try {
      let data = localStorage.getItem(key);
      if (!data) {
        // Fallback for previous storage key
        const oldKey = key.replace("stackly_", "tastecraft_");
        data = localStorage.getItem(oldKey);
      }
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`LocalStorage read error for ${key}:`, e);
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write error for ${key}:`, e);
    }
  }

  // Parse URL Query Parameters for deep-linking
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || "All";
  const initialFav = urlParams.get("fav") === "true";
  const initialSearch = urlParams.get("search") || "";

  // Application State
  const state = {
    page: document.body.dataset.page || "home",
    selectedCategory: initialCategory,
    searchQuery: initialSearch,
    sortBy: "default",
    showFavoritesOnly: initialFav,
    currentModalRecipeId: null,
    mealPlanIds: loadStorage(STORAGE_KEYS.MEAL_PLAN, [2]),
    favoriteIds: loadStorage(STORAGE_KEYS.FAVORITES, [2, 6, 9])
  };

  // ================= 2. DOM Elements Cache =================
  const DOM = {
    preloader: document.getElementById("preloader"),
    navMenu: document.getElementById("navLinks"),
    hamburgerBtn: document.getElementById("hamburgerBtn"),
    wishlistCountBadge: document.getElementById("wishlistCountBadge"),
    cartCountBadge: document.getElementById("cartCountBadge"),
    wishlistTriggerBtn: document.getElementById("wishlistTriggerBtn"),
    cartTriggerBtn: document.getElementById("cartTriggerBtn"),

    // Home Page Elements (if present)
    heroRecipeCard: document.getElementById("heroRecipeCard"),
    heroTitle: document.getElementById("heroTitle"),
    heroDesc: document.getElementById("heroDesc"),
    heroCookTime: document.getElementById("heroCookTime"),
    heroPrepTime: document.getElementById("heroPrepTime"),
    heroCategory: document.getElementById("heroCategory"),
    heroRating: document.getElementById("heroRating"),
    heroImage: document.getElementById("heroImage"),
    heroViewBtn: document.getElementById("heroViewBtn"),
    categoryGrid: document.getElementById("categoryGrid"),
    popularRecipesGrid: document.getElementById("popularRecipesGrid"),

    // Explore Page Elements (if present)
    searchInput: document.getElementById("searchInput"),
    searchClearBtn: document.getElementById("searchClearBtn"),
    categoryPills: document.getElementById("categoryPills"),
    sortSelect: document.getElementById("sortSelect"),
    favFilterToggle: document.getElementById("favFilterToggle"),
    resultsCount: document.getElementById("resultsCount"),
    activeFilterIndicator: document.getElementById("activeFilterIndicator"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    exploreRecipesGrid: document.getElementById("exploreRecipesGrid"),
    exploreEmptyState: document.getElementById("exploreEmptyState"),
    emptyResetBtn: document.getElementById("emptyResetBtn"),

    // Meal Plan Page Elements (if present)
    statTotalMeals: document.getElementById("statTotalMeals"),
    statTotalCookTime: document.getElementById("statTotalCookTime"),
    statTotalCalories: document.getElementById("statTotalCalories"),
    mealPlanList: document.getElementById("mealPlanList"),
    mealPlanEmptyState: document.getElementById("mealPlanEmptyState"),
    mealPlanActionsBar: document.getElementById("mealPlanActionsBar"),
    clearMealPlanBtn: document.getElementById("clearMealPlanBtn"),

    // Recipe Details Modal Elements
    modal: document.getElementById("recipeModal"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    modalFooterCloseBtn: document.getElementById("modalFooterCloseBtn"),
    modalImage: document.getElementById("modalImage"),
    modalCategory: document.getElementById("modalCategory"),
    modalTitle: document.getElementById("modalTitle"),
    modalDescription: document.getElementById("modalDescription"),
    modalPrepTime: document.getElementById("modalPrepTime"),
    modalCookTime: document.getElementById("modalCookTime"),
    modalServings: document.getElementById("modalServings"),
    modalDifficulty: document.getElementById("modalDifficulty"),
    modalIngredientsList: document.getElementById("modalIngredientsList"),
    modalInstructionsList: document.getElementById("modalInstructionsList"),
    modalMealPlanBtn: document.getElementById("modalMealPlanBtn"),
    modalFavBtn: document.getElementById("modalFavBtn"),
    modalFavIcon: document.getElementById("modalFavIcon"),
    modalFavText: document.getElementById("modalFavText"),

    // Favorites Drawer Elements
    favoritesDrawerBackdrop: document.getElementById("favoritesDrawerBackdrop"),
    favoritesDrawerList: document.getElementById("favoritesDrawerList"),
    favoritesDrawerCount: document.getElementById("favoritesDrawerCount"),
    favoritesDrawerClose: document.getElementById("favoritesDrawerClose"),

    // Toast Container
    toastContainer: document.getElementById("toastContainer")
  };

  // ================= 3. Toast Notifications =================
  function showToast(message, type = "info") {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = '<i class="fa-solid fa-circle-info"></i>';
    if (type === "success") icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === "danger") icon = '<i class="fa-solid fa-trash-can"></i>';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  // ================= 4. Badge Counters Sync =================
  function updateBadgeCounts() {
    // 1. Meal plan count badge
    if (DOM.cartCountBadge) {
      const planCount = state.mealPlanIds.length;
      DOM.cartCountBadge.textContent = planCount;
      if (planCount > 0) {
        DOM.cartCountBadge.style.display = "flex";
        DOM.cartCountBadge.classList.add("pulse");
        setTimeout(() => DOM.cartCountBadge.classList.remove("pulse"), 400);
      } else {
        DOM.cartCountBadge.style.display = "none";
      }
    }

    // 2. Favorites count badge
    if (DOM.wishlistCountBadge) {
      const favCount = state.favoriteIds.length;
      DOM.wishlistCountBadge.textContent = favCount;
      if (favCount > 0) {
        DOM.wishlistCountBadge.style.display = "flex";
        DOM.wishlistCountBadge.classList.add("pulse");
        setTimeout(() => DOM.wishlistCountBadge.classList.remove("pulse"), 400);
      } else {
        DOM.wishlistCountBadge.style.display = "none";
      }
    }
  }

  // ================= 5. Page: Home Page Logic =================
  function initHomePage() {
    if (!DOM.popularRecipesGrid) return;

    // 1. Hero Recipe using Array find()
    const hero = RECIPES_DATA.find((r) => r.isHero) || RECIPES_DATA[0];
    if (hero && DOM.heroTitle) {
      DOM.heroTitle.textContent = hero.name;
      DOM.heroDesc.textContent = hero.description;
      DOM.heroCookTime.textContent = `${hero.cookingTime} mins`;
      DOM.heroPrepTime.textContent = `${hero.prepTime} mins`;
      DOM.heroCategory.textContent = hero.category;
      DOM.heroRating.innerHTML = `${Components.renderStars(hero.rating)} <span>${hero.rating.toFixed(1)} (${hero.reviewsCount} reviews)</span>`;
      DOM.heroImage.src = hero.image;
      DOM.heroImage.alt = hero.name;

      if (DOM.heroViewBtn) {
        DOM.heroViewBtn.onclick = () => openRecipeModal(hero.id);
      }
    }

    // 2. Categories Grid using Array map()
    if (DOM.categoryGrid) {
      DOM.categoryGrid.innerHTML = CATEGORIES_DATA.map((cat) =>
        Components.categoryCard(cat)
      ).join("");
    }

    // 3. Popular Recipes using Array filter() & Array map()
    const popularRecipes = RECIPES_DATA.filter((recipe) => recipe.isPopular);
    DOM.popularRecipesGrid.innerHTML = popularRecipes
      .map((recipe) => {
        const isPlanned = state.mealPlanIds.includes(recipe.id);
        const isFav = state.favoriteIds.includes(recipe.id);
        return Components.recipeCard(recipe, isPlanned, isFav);
      })
      .join("");
  }

  // ================= 6. Page: Explore Recipes Logic =================
  function setCategoryFilter(categoryName) {
    state.selectedCategory = categoryName;

    // Update active filter pill
    if (DOM.categoryPills) {
      const pills = DOM.categoryPills.querySelectorAll(".filter-pill");
      pills.forEach((pill) => {
        if (pill.dataset.category === categoryName) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });
    }

    renderExploreGrid();
  }

  function getFilteredAndSortedRecipes() {
    // 1. Filter using Array filter()
    let filtered = RECIPES_DATA.filter((recipe) => {
      // Category match
      const matchesCategory =
        state.selectedCategory === "All" ||
        recipe.category.toLowerCase() === state.selectedCategory.toLowerCase();

      // Search match
      const query = state.searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query));

      // Favorites toggle match
      const matchesFav =
        !state.showFavoritesOnly || state.favoriteIds.includes(recipe.id);

      return matchesCategory && matchesSearch && matchesFav;
    });

    // 2. Sort by cooking time, rating, or name
    if (state.sortBy === "time-asc") {
      filtered.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (state.sortBy === "time-desc") {
      filtered.sort((a, b) => b.cookingTime - a.cookingTime);
    } else if (state.sortBy === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  function renderExploreGrid() {
    if (!DOM.exploreRecipesGrid) return;

    const recipes = getFilteredAndSortedRecipes();

    // Results count & info status
    if (DOM.resultsCount) {
      DOM.resultsCount.textContent = recipes.length;
    }

    let filterNotes = [];
    if (state.selectedCategory !== "All") filterNotes.push(`Category: "${state.selectedCategory}"`);
    if (state.searchQuery.trim()) filterNotes.push(`Search: "${state.searchQuery}"`);
    if (state.showFavoritesOnly) filterNotes.push("Favorites only");

    if (DOM.activeFilterIndicator && DOM.resetFiltersBtn) {
      if (filterNotes.length > 0) {
        DOM.activeFilterIndicator.textContent = ` (${filterNotes.join(", ")})`;
        DOM.resetFiltersBtn.style.display = "inline-flex";
      } else {
        DOM.activeFilterIndicator.textContent = "";
        DOM.resetFiltersBtn.style.display = "none";
      }
    }

    // Toggle clear search button visibility
    if (DOM.searchClearBtn) {
      if (state.searchQuery.trim()) {
        DOM.searchClearBtn.classList.add("visible");
      } else {
        DOM.searchClearBtn.classList.remove("visible");
      }
    }

    // Render cards or empty state using Array map()
    if (recipes.length === 0) {
      DOM.exploreRecipesGrid.innerHTML = "";
      if (DOM.exploreEmptyState) DOM.exploreEmptyState.style.display = "block";
    } else {
      if (DOM.exploreEmptyState) DOM.exploreEmptyState.style.display = "none";
      DOM.exploreRecipesGrid.innerHTML = recipes
        .map((recipe) => {
          const isPlanned = state.mealPlanIds.includes(recipe.id);
          const isFav = state.favoriteIds.includes(recipe.id);
          return Components.recipeCard(recipe, isPlanned, isFav);
        })
        .join("");
    }
  }

  function resetAllFilters() {
    state.selectedCategory = "All";
    state.searchQuery = "";
    state.sortBy = "default";
    state.showFavoritesOnly = false;

    if (DOM.searchInput) DOM.searchInput.value = "";
    if (DOM.sortSelect) DOM.sortSelect.value = "default";
    if (DOM.favFilterToggle) DOM.favFilterToggle.classList.remove("active");

    if (DOM.categoryPills) {
      const pills = DOM.categoryPills.querySelectorAll(".filter-pill");
      pills.forEach((p) => p.classList.toggle("active", p.dataset.category === "All"));
    }

    renderExploreGrid();
    showToast("Filters reset to default", "info");
  }

  function initExplorePage() {
    if (!DOM.exploreRecipesGrid) return;

    // Apply URL params into UI controls
    if (DOM.searchInput && state.searchQuery) {
      DOM.searchInput.value = state.searchQuery;
    }
    if (DOM.favFilterToggle && state.showFavoritesOnly) {
      DOM.favFilterToggle.classList.add("active");
    }
    if (DOM.categoryPills && state.selectedCategory) {
      const pills = DOM.categoryPills.querySelectorAll(".filter-pill");
      pills.forEach((p) =>
        p.classList.toggle("active", p.dataset.category === state.selectedCategory)
      );
    }

    renderExploreGrid();
  }

  // ================= 7. Page: My Meal Plan Logic =================
  function renderMealPlanSection() {
    if (!DOM.mealPlanList) return;

    // Filter planned recipes using Array filter()
    const plannedRecipes = RECIPES_DATA.filter((recipe) =>
      state.mealPlanIds.includes(recipe.id)
    );

    // Compute summary stats
    if (DOM.statTotalMeals) {
      DOM.statTotalMeals.textContent = plannedRecipes.length;
    }

    // Total estimated cooking time using Array reduce()
    const totalTime = plannedRecipes.reduce(
      (acc, r) => acc + (r.cookingTime || 0),
      0
    );
    if (DOM.statTotalCookTime) {
      DOM.statTotalCookTime.textContent = `${totalTime} mins`;
    }

    // Total estimated calories
    const totalCalories = plannedRecipes.reduce(
      (acc, r) => acc + (r.calories || 0),
      0
    );
    if (DOM.statTotalCalories) {
      DOM.statTotalCalories.textContent = `${totalCalories} kcal`;
    }

    // Render list or empty state
    if (plannedRecipes.length === 0) {
      DOM.mealPlanList.innerHTML = "";
      if (DOM.mealPlanEmptyState) DOM.mealPlanEmptyState.style.display = "block";
      if (DOM.mealPlanActionsBar) DOM.mealPlanActionsBar.style.display = "none";
    } else {
      if (DOM.mealPlanEmptyState) DOM.mealPlanEmptyState.style.display = "none";
      if (DOM.mealPlanActionsBar) DOM.mealPlanActionsBar.style.display = "flex";

      // Render items using Array map()
      DOM.mealPlanList.innerHTML = plannedRecipes
        .map((recipe) => Components.mealPlanItem(recipe))
        .join("");
    }

    updateBadgeCounts();
  }

  function initMealPlanPage() {
    if (!DOM.mealPlanList) return;
    renderMealPlanSection();
  }

  // Toggle meal plan item
  function toggleMealPlan(recipeId) {
    const numId = Number(recipeId);
    const recipe = RECIPES_DATA.find((r) => r.id === numId);
    if (!recipe) return;

    if (state.mealPlanIds.includes(numId)) {
      // Remove using Array filter()
      state.mealPlanIds = state.mealPlanIds.filter((id) => id !== numId);
      saveStorage(STORAGE_KEYS.MEAL_PLAN, state.mealPlanIds);
      showToast(`Removed "${recipe.name}" from Meal Plan`, "danger");
    } else {
      // Add to plan
      state.mealPlanIds.push(numId);
      saveStorage(STORAGE_KEYS.MEAL_PLAN, state.mealPlanIds);
      showToast(`Added "${recipe.name}" to your Meal Plan!`, "success");
    }

    syncCurrentPageView();
  }

  function removeMealPlanItem(recipeId) {
    const numId = Number(recipeId);
    const recipe = RECIPES_DATA.find((r) => r.id === numId);
    state.mealPlanIds = state.mealPlanIds.filter((id) => id !== numId);
    saveStorage(STORAGE_KEYS.MEAL_PLAN, state.mealPlanIds);
    showToast(
      recipe ? `Removed "${recipe.name}" from Meal Plan` : "Removed from Meal Plan",
      "danger"
    );
    syncCurrentPageView();
  }

  function clearAllMealPlan() {
    if (state.mealPlanIds.length === 0) return;
    state.mealPlanIds = [];
    saveStorage(STORAGE_KEYS.MEAL_PLAN, state.mealPlanIds);
    syncCurrentPageView();
    showToast("Cleared all items from your meal plan", "danger");
  }

  // Toggle favorite recipe
  function toggleFavorite(recipeId) {
    const numId = Number(recipeId);
    const recipe = RECIPES_DATA.find((r) => r.id === numId);
    if (!recipe) return;

    if (state.favoriteIds.includes(numId)) {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== numId);
      saveStorage(STORAGE_KEYS.FAVORITES, state.favoriteIds);
      showToast(`Removed "${recipe.name}" from favorites`, "info");
    } else {
      state.favoriteIds.push(numId);
      saveStorage(STORAGE_KEYS.FAVORITES, state.favoriteIds);
      showToast(`Added "${recipe.name}" to favorites! ❤️`, "success");
    }

    syncCurrentPageView();
  }

  // Synchronize cards and counts on the current active page
  function syncCurrentPageView() {
    if (DOM.popularRecipesGrid) {
      initHomePage();
    }
    if (DOM.exploreRecipesGrid) {
      renderExploreGrid();
    }
    if (DOM.mealPlanList) {
      renderMealPlanSection();
    }
    if (state.currentModalRecipeId) {
      updateModalButtons(state.currentModalRecipeId);
    }
    if (DOM.favoritesDrawerBackdrop && DOM.favoritesDrawerBackdrop.classList.contains("open")) {
      renderFavoritesDrawer();
    }
    updateBadgeCounts();
  }

  // ================= 8. Saved Favorites Drawer =================
  function renderFavoritesDrawer() {
    if (!DOM.favoritesDrawerList) return;
    const favRecipes = RECIPES_DATA.filter((r) => state.favoriteIds.includes(r.id));
    if (DOM.favoritesDrawerCount) {
      DOM.favoritesDrawerCount.textContent = favRecipes.length;
    }
    if (favRecipes.length === 0) {
      DOM.favoritesDrawerList.innerHTML = `
        <div class="favorites-empty">
          <i class="fa-regular fa-heart"></i>
          <h4>No Saved Favorites Yet</h4>
          <p>Click the heart icon on any recipe to save it here for instant access!</p>
        </div>
      `;
    } else {
      DOM.favoritesDrawerList.innerHTML = favRecipes
        .map((r) => Components.favoriteDrawerItem(r))
        .join("");
    }
  }

  let drawerScrollY = 0;

  function openFavoritesDrawer() {
    if (!DOM.favoritesDrawerBackdrop) return;
    renderFavoritesDrawer();
    drawerScrollY = window.pageYOffset || document.documentElement.scrollTop;
    document.documentElement.classList.add("drawer-open");
    document.body.classList.add("drawer-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${drawerScrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    DOM.favoritesDrawerBackdrop.classList.add("open");
    DOM.favoritesDrawerBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeFavoritesDrawer() {
    if (!DOM.favoritesDrawerBackdrop) return;
    DOM.favoritesDrawerBackdrop.classList.remove("open");
    DOM.favoritesDrawerBackdrop.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("drawer-open");
    document.body.classList.remove("drawer-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, drawerScrollY);
  }

  // ================= 9. Recipe Details Modal =================
  function openRecipeModal(recipeId) {
    if (!DOM.modal) return;

    const numId = Number(recipeId);
    // Find recipe by ID using Array find()
    const recipe = RECIPES_DATA.find((r) => r.id === numId);
    if (!recipe) return;

    state.currentModalRecipeId = numId;

    // Fill Modal Data
    DOM.modalImage.src = recipe.image;
    DOM.modalImage.alt = recipe.name;
    DOM.modalCategory.textContent = recipe.category;
    DOM.modalTitle.textContent = recipe.name;
    DOM.modalDescription.textContent = recipe.description;
    DOM.modalPrepTime.textContent = `${recipe.prepTime} mins`;
    DOM.modalCookTime.textContent = `${recipe.cookingTime} mins`;
    DOM.modalServings.textContent = `${recipe.servings} portions`;
    DOM.modalDifficulty.textContent = recipe.difficulty;

    // Render Ingredients using Array map()
    DOM.modalIngredientsList.innerHTML = recipe.ingredients
      .map((item) => Components.ingredientItem(item))
      .join("");

    // Render Instructions using Array map()
    DOM.modalInstructionsList.innerHTML = recipe.instructions
      .map((step) => Components.instructionItem(step))
      .join("");

    updateModalButtons(numId);

    // Open Modal
    DOM.modal.classList.add("open");
    DOM.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function updateModalButtons(recipeId) {
    if (!DOM.modalMealPlanBtn || !DOM.modalFavBtn) return;

    const isPlanned = state.mealPlanIds.includes(recipeId);
    const isFav = state.favoriteIds.includes(recipeId);

    // Meal Plan Button
    if (isPlanned) {
      DOM.modalMealPlanBtn.className = "btn btn-danger-outline";
      DOM.modalMealPlanBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Remove from Meal Plan';
    } else {
      DOM.modalMealPlanBtn.className = "btn btn-primary";
      DOM.modalMealPlanBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add to Meal Plan';
    }

    // Favorite Button
    DOM.modalFavIcon.className = isFav ? "fa-solid fa-heart" : "fa-regular fa-heart";
    DOM.modalFavText.textContent = isFav ? "Favorited" : "Favorite";
    if (isFav) {
      DOM.modalFavBtn.classList.add("btn-danger-outline");
      DOM.modalFavBtn.classList.remove("btn-outline");
    } else {
      DOM.modalFavBtn.classList.add("btn-outline");
      DOM.modalFavBtn.classList.remove("btn-danger-outline");
    }
  }

  function closeRecipeModal() {
    if (!DOM.modal) return;
    DOM.modal.classList.remove("open");
    DOM.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.currentModalRecipeId = null;
  }

  // ================= 9. Event Listeners Setup =================
  function setupEventListeners() {
    // 1. Delegated click handlers
    document.addEventListener("click", (e) => {
      // Category card click on Home Page -> navigate to explore.html?category=...
      const catCard = e.target.closest(".category-card");
      if (catCard && !e.target.closest(".btn")) {
        const cat = catCard.dataset.category;
        window.location.href = `explore.html?category=${encodeURIComponent(cat)}`;
        return;
      }

      // View Recipe Card Action
      const viewBtn = e.target.closest('[data-action="view-recipe"]');
      if (viewBtn) {
        const recipeId = viewBtn.dataset.id;
        openRecipeModal(recipeId);
        return;
      }

      // Toggle Meal Plan Card Action
      const mealPlanBtn = e.target.closest('[data-action="toggle-meal-plan"]');
      if (mealPlanBtn) {
        const recipeId = mealPlanBtn.dataset.id;
        toggleMealPlan(recipeId);
        return;
      }

      // Remove from Meal Plan Action
      const removePlanBtn = e.target.closest('[data-action="remove-meal-plan"]');
      if (removePlanBtn) {
        const recipeId = removePlanBtn.dataset.id;
        removeMealPlanItem(recipeId);
        return;
      }

      // Toggle Favorite Card Action
      const favBtn = e.target.closest('[data-action="toggle-fav"]');
      if (favBtn) {
        const recipeId = favBtn.dataset.id;
        toggleFavorite(recipeId);
        return;
      }
    });

    // Wishlist Trigger in header -> Open Favorites Drawer directly (no redirect!)
    if (DOM.wishlistTriggerBtn) {
      DOM.wishlistTriggerBtn.addEventListener("click", () => {
        openFavoritesDrawer();
      });
    }

    // Favorites Drawer Close Handlers
    if (DOM.favoritesDrawerClose) {
      DOM.favoritesDrawerClose.addEventListener("click", closeFavoritesDrawer);
    }

    if (DOM.favoritesDrawerBackdrop) {
      DOM.favoritesDrawerBackdrop.addEventListener("click", (e) => {
        if (e.target === DOM.favoritesDrawerBackdrop) {
          closeFavoritesDrawer();
        }
      });
    }

    // Cart / Meal Plan Trigger in header -> Go to meal-plan.html
    if (DOM.cartTriggerBtn) {
      DOM.cartTriggerBtn.addEventListener("click", () => {
        window.location.href = "meal-plan.html";
      });
    }

    // Mobile Hamburger Menu: Fullscreen Toggle & Complete Background Scroll Lock
    let menuScrollY = 0;

    function openMobileMenu() {
      menuScrollY = window.pageYOffset || document.documentElement.scrollTop;
      document.documentElement.classList.add("menu-open");
      document.body.classList.add("menu-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${menuScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      if (DOM.hamburgerBtn) DOM.hamburgerBtn.classList.add("open");
      if (DOM.navMenu) DOM.navMenu.classList.add("open");
    }

    function closeMobileMenu() {
      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, menuScrollY);
      if (DOM.hamburgerBtn) DOM.hamburgerBtn.classList.remove("open");
      if (DOM.navMenu) DOM.navMenu.classList.remove("open");
    }

    if (DOM.hamburgerBtn && DOM.navMenu) {
      DOM.hamburgerBtn.addEventListener("click", () => {
        if (DOM.navMenu.classList.contains("open")) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      // Close fullscreen menu when clicking any nav link
      DOM.navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
          closeMobileMenu();
        });
      });
    }

    // Explore Page Search & Filter Controls
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderExploreGrid();
      });
    }

    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.addEventListener("click", () => {
        DOM.searchInput.value = "";
        state.searchQuery = "";
        DOM.searchInput.focus();
        renderExploreGrid();
      });
    }

    if (DOM.categoryPills) {
      DOM.categoryPills.addEventListener("click", (e) => {
        const pill = e.target.closest(".filter-pill");
        if (pill) {
          const category = pill.dataset.category;
          setCategoryFilter(category);
        }
      });
    }

    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderExploreGrid();
      });
    }

    if (DOM.favFilterToggle) {
      DOM.favFilterToggle.addEventListener("click", () => {
        state.showFavoritesOnly = !state.showFavoritesOnly;
        DOM.favFilterToggle.classList.toggle("active", state.showFavoritesOnly);
        renderExploreGrid();
      });
    }

    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener("click", resetAllFilters);
    }
    if (DOM.emptyResetBtn) {
      DOM.emptyResetBtn.addEventListener("click", resetAllFilters);
    }

    // Meal Plan Page Clear All
    if (DOM.clearMealPlanBtn) {
      DOM.clearMealPlanBtn.addEventListener("click", () => {
        if (state.mealPlanIds.length === 0) return;
        if (confirm("Are you sure you want to clear all recipes from your meal plan?")) {
          clearAllMealPlan();
        }
      });
    }

    // Modal Close Handlers
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener("click", closeRecipeModal);
    if (DOM.modalFooterCloseBtn) DOM.modalFooterCloseBtn.addEventListener("click", closeRecipeModal);

    if (DOM.modal) {
      DOM.modal.addEventListener("click", (e) => {
        if (e.target === DOM.modal) {
          closeRecipeModal();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (DOM.navMenu && DOM.navMenu.classList.contains("open")) {
          closeMobileMenu();
        }
        if (DOM.modal && DOM.modal.classList.contains("open")) {
          closeRecipeModal();
        }
        if (DOM.favoritesDrawerBackdrop && DOM.favoritesDrawerBackdrop.classList.contains("open")) {
          closeFavoritesDrawer();
        }
      }
    });

    if (DOM.modalMealPlanBtn) {
      DOM.modalMealPlanBtn.addEventListener("click", () => {
        if (state.currentModalRecipeId) {
          toggleMealPlan(state.currentModalRecipeId);
        }
      });
    }

    if (DOM.modalFavBtn) {
      DOM.modalFavBtn.addEventListener("click", () => {
        if (state.currentModalRecipeId) {
          toggleFavorite(state.currentModalRecipeId);
        }
      });
    }

    // FAQ Accordion interaction (Explore Page)
    const faqAccordion = document.getElementById("faqAccordion");
    if (faqAccordion) {
      faqAccordion.addEventListener("click", (e) => {
        const questionBtn = e.target.closest(".faq-question");
        if (questionBtn) {
          const item = questionBtn.closest(".faq-item");
          const wasActive = item.classList.contains("active");
          faqAccordion.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
          if (!wasActive) {
            item.classList.add("active");
          }
        }
      });
    }

    // Smart Nutrition & Macro Target Goals Presets (Meal Plan Page)
    const macroPresetPills = document.getElementById("macroPresetPills");
    if (macroPresetPills) {
      const MACRO_PRESETS = {
        "balanced": {
          heading: "Executive Chef's Meal Plan Tip: Balanced Gourmet Focus",
          text: "Evenly distribute whole grains between breakfast and lunch to maintain steady daytime focus. Finish your dinner with lean proteins and fibrous roasted greens for effortless digestion.",
          cal: "2,150", calTag: "Optimal Baseline", calSub: "Target balance for standard active lifestyle", calBar: "72%",
          pro: "135", proTag: "25% of energy", proSub: "Sustained muscle recovery & metabolic fullness", proBar: "65%",
          carb: "240", carbTag: "45% of energy", carbSub: "Low-GI whole grains, sweet potatoes & vegetables", carbBar: "58%",
          fat: "72", fatTag: "30% of energy", fatSub: "Cold-pressed olive oil, avocado & raw nuts", fatBar: "48%"
        },
        "high-protein": {
          heading: "Executive Chef's Meal Plan Tip: High Protein & Athletic Fuel",
          text: "Incorporate wild salmon, grilled chicken, egg whites, and legume power salads to hit your daily target effortlessly while keeping post-workout recovery optimal.",
          cal: "2,300", calTag: "Muscle Fuel", calSub: "Formulated for high training volume & active days", calBar: "78%",
          pro: "185", proTag: "35% of energy", proSub: "Maximum protein synthesis and athletic repair", proBar: "88%",
          carb: "190", carbTag: "35% of energy", carbSub: "Clean complex carbs timed around peak activity", carbBar: "46%",
          fat: "60", fatTag: "30% of energy", fatSub: "Clean healthy fats from seeds, flax, and eggs", fatBar: "40%"
        },
        "mediterranean": {
          heading: "Executive Chef's Meal Plan Tip: Mediterranean Longevity Heart-Health",
          text: "Anchor every plate with polyphenol-rich extra virgin olive oil, wild-caught omega-3 fish, sun-ripened tomatoes, and crisp herbs like rosemary and oregano.",
          cal: "2,050", calTag: "Heart Longevity", calSub: "Gold-standard cardio-protective nutrient density", calBar: "68%",
          pro: "115", proTag: "22% of energy", proSub: "Sourced primarily from fresh seafood, beans, and nuts", proBar: "55%",
          carb: "220", carbTag: "43% of energy", carbSub: "Ancient grains, artichokes, lentils, and citrus", carbBar: "54%",
          fat: "80", fatTag: "35% of energy", fatSub: "Dominant monounsaturated fatty acids (EVOO & olives)", fatBar: "55%"
        },
        "low-carb": {
          heading: "Executive Chef's Meal Plan Tip: Low-Carb & Clean Ketogenic",
          text: "Swap starchy bases for cauliflower mash, steamed broccoli florets, and zucchini ribbons. Pair with grass-fed butter, avocado slices, and toasted seeds.",
          cal: "1,950", calTag: "Clean Ketosis", calSub: "Calibrated for metabolic flexibility & steady insulin", calBar: "65%",
          pro: "130", proTag: "27% of energy", proSub: "Consistent protein support without insulin spikes", proBar: "62%",
          carb: "45", carbTag: "9% of energy", carbSub: "Fibrous non-starchy leafy greens and avocado only", carbBar: "15%",
          fat: "140", fatTag: "64% of energy", fatSub: "MCT oils, ghee, avocado, and macadamia nuts", fatBar: "90%"
        },
        "plant-powered": {
          heading: "Executive Chef's Meal Plan Tip: Whole-Food Plant-Powered Energy",
          text: "Pair hearty legumes like lentils and chickpeas with quinoa and nutritional yeast to deliver all essential amino acids with abundant prebiotic fiber.",
          cal: "2,100", calTag: "Clean Plant Energy", calSub: "Zero cholesterol with maximum micronutrient density", calBar: "70%",
          pro: "110", proTag: "21% of energy", proSub: "Organic tempeh, hemp seeds, lentils, and edamame", proBar: "52%",
          carb: "285", carbTag: "54% of energy", carbSub: "Slow-burning complex starches & colorful phytonutrients", carbBar: "70%",
          fat: "58", fatTag: "25% of energy", fatSub: "Chia seeds, tahini, walnuts, and pumpkin seeds", fatBar: "38%"
        }
      };

      macroPresetPills.addEventListener("click", (e) => {
        const pill = e.target.closest(".macro-pill");
        if (!pill) return;

        const presetKey = pill.dataset.preset;
        const data = MACRO_PRESETS[presetKey];
        if (!data) return;

        macroPresetPills.querySelectorAll(".macro-pill").forEach((btn) => btn.classList.remove("active"));
        pill.classList.add("active");

        // Update Calories
        const valCal = document.getElementById("valCalories");
        const tagCal = document.getElementById("tagCalories");
        const subCal = document.getElementById("subCalories");
        const barCal = document.getElementById("barCalories");
        if (valCal) valCal.textContent = data.cal;
        if (tagCal) tagCal.textContent = data.calTag;
        if (subCal) subCal.textContent = data.calSub;
        if (barCal) barCal.style.width = data.calBar;

        // Update Protein
        const valPro = document.getElementById("valProtein");
        const tagPro = document.getElementById("tagProtein");
        const subPro = document.getElementById("subProtein");
        const barPro = document.getElementById("barProtein");
        if (valPro) valPro.textContent = data.pro;
        if (tagPro) tagPro.textContent = data.proTag;
        if (subPro) subPro.textContent = data.proSub;
        if (barPro) barPro.style.width = data.proBar;

        // Update Carbs
        const valCarb = document.getElementById("valCarbs");
        const tagCarb = document.getElementById("tagCarbs");
        const subCarb = document.getElementById("subCarbs");
        const barCarb = document.getElementById("barCarbs");
        if (valCarb) valCarb.textContent = data.carb;
        if (tagCarb) tagCarb.textContent = data.carbTag;
        if (subCarb) subCarb.textContent = data.carbSub;
        if (barCarb) barCarb.style.width = data.carbBar;

        // Update Fats
        const valFat = document.getElementById("valFats");
        const tagFat = document.getElementById("tagFats");
        const subFat = document.getElementById("subFats");
        const barFat = document.getElementById("barFats");
        if (valFat) valFat.textContent = data.fat;
        if (tagFat) tagFat.textContent = data.fatTag;
        if (subFat) subFat.textContent = data.fatSub;
        if (barFat) barFat.style.width = data.fatBar;

        // Update Chef Insight Box
        const insightHeading = document.getElementById("macroInsightHeading");
        const insightText = document.getElementById("macroInsightText");
        if (insightHeading) insightHeading.textContent = data.heading;
        if (insightText) insightText.textContent = data.text;
      });
    }
  }

  // ================= 10. Application Initialization =================
  function init() {
    // Dismiss preloader smoothly
    setTimeout(() => {
      if (DOM.preloader) {
        DOM.preloader.classList.add("loaded");
      }
    }, 400);

    setupEventListeners();
    updateBadgeCounts();

    // Initialize page-specific views
    initHomePage();
    initExplorePage();
    initMealPlanPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

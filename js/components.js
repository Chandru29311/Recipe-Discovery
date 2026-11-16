/**
 * Recipe Discovery Website - Reusable Component Renderers
 * Pure Vanilla JavaScript
 */

const Components = {
  /**
   * Helper: Render Star Rating HTML
   */
  renderStars(rating = 5) {
    const fullStars = Math.floor(rating);
    const hasHalf = (rating - fullStars) >= 0.4;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<i class="fa-solid fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        html += '<i class="fa-regular fa-star"></i>';
      }
    }
    return html;
  },

  /**
   * Recipe Card Component
   * Used dynamically in Popular Recipes & Explore Grid via Array map()
   */
  recipeCard(recipe, isPlanned = false, isFav = false) {
    return `
      <article class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="recipe-card-media">
          <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
          <span class="recipe-card-tag">${recipe.category}</span>
          <button 
            class="recipe-fav-btn ${isFav ? "favorited" : ""}" 
            data-action="toggle-fav" 
            data-id="${recipe.id}"
            title="${isFav ? "Remove from Favorites" : "Add to Favorites"}"
            aria-label="Toggle Favorite"
          >
            <i class="${isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}"></i>
          </button>
        </div>

        <div class="recipe-card-body">
          <div class="recipe-rating-row">
            ${this.renderStars(recipe.rating)}
            <span>${recipe.rating.toFixed(1)} (${recipe.reviewsCount})</span>
          </div>

          <h3 class="recipe-card-title">${recipe.name}</h3>
          <p class="recipe-card-desc">${recipe.description}</p>

          <div class="recipe-card-meta">
            <span class="recipe-meta-pill">
              <i class="fa-regular fa-clock"></i> ${recipe.cookingTime} mins
            </span>
            <span class="recipe-meta-pill">
              <i class="fa-solid fa-chart-simple"></i> ${recipe.difficulty}
            </span>
            <span class="recipe-meta-pill">
              <i class="fa-solid fa-fire-flame-curved"></i> ${recipe.calories} kcal
            </span>
          </div>

          <div class="recipe-card-actions">
            <button class="btn btn-outline btn-sm" data-action="view-recipe" data-id="${recipe.id}">
              <i class="fa-regular fa-eye"></i> View Recipe
            </button>
            <button 
              class="btn ${isPlanned ? "btn-danger-outline" : "btn-primary"} btn-sm" 
              data-action="toggle-meal-plan" 
              data-id="${recipe.id}"
            >
              <i class="${isPlanned ? "fa-solid fa-check" : "fa-solid fa-plus"}"></i>
              ${isPlanned ? "In Meal Plan" : "Add to Plan"}
            </button>
          </div>
        </div>
      </article>
    `;
  },

  /**
   * Category Card Component
   */
  categoryCard(category) {
    return `
      <div class="category-card" data-category="${category.name}">
        <img src="${category.image}" alt="${category.name}" loading="lazy">
        <div class="category-card-overlay">
          <i class="${category.icon} category-icon"></i>
          <h3>${category.name}</h3>
          <span>${category.subtitle}</span>
        </div>
      </div>
    `;
  },

  /**
   * Meal Plan Item Component
   */
  mealPlanItem(recipe) {
    return `
      <div class="meal-plan-item" data-recipe-id="${recipe.id}">
        <div class="meal-plan-item-img">
          <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        </div>
        <div class="meal-plan-item-content">
          <span class="meal-plan-item-tag">${recipe.category}</span>
          <h3 class="meal-plan-item-title">${recipe.name}</h3>
          <div class="meal-plan-item-meta">
            <span><i class="fa-regular fa-clock"></i> Cook: ${recipe.cookingTime} mins</span>
            <span><i class="fa-solid fa-kitchen-set"></i> Prep: ${recipe.prepTime} mins</span>
            <span><i class="fa-solid fa-user-group"></i> Serves: ${recipe.servings}</span>
            <span><i class="fa-solid fa-fire"></i> ${recipe.calories} kcal</span>
          </div>
        </div>
        <div class="meal-plan-item-actions">
          <button class="btn btn-outline btn-sm" data-action="view-recipe" data-id="${recipe.id}">
            <i class="fa-regular fa-eye"></i> View
          </button>
          <button class="btn btn-danger-outline btn-sm" data-action="remove-meal-plan" data-id="${recipe.id}">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Modal Ingredient item
   */
  ingredientItem(ingredient) {
    return `
      <li>
        <i class="fa-solid fa-circle-check"></i>
        <span>${ingredient}</span>
      </li>
    `;
  },

  /**
   * Modal Instruction item
   */
  instructionItem(step) {
    return `
      <li>
        <span>${step}</span>
      </li>
    `;
  },

  /**
   * Favorite Drawer Item Component
   */
  favoriteDrawerItem(recipe) {
    return `
      <div class="favorites-drawer-item" data-recipe-id="${recipe.id}">
        <div class="favorites-drawer-item-img">
          <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        </div>
        <div class="favorites-drawer-item-info">
          <span class="favorites-drawer-item-tag">${recipe.category}</span>
          <h4 class="favorites-drawer-item-title" title="${recipe.name}">${recipe.name}</h4>
          <div class="favorites-drawer-item-meta">
            <span><i class="fa-regular fa-clock"></i> ${recipe.cookingTime}m</span>
            <span><i class="fa-solid fa-chart-simple"></i> ${recipe.difficulty}</span>
          </div>
        </div>
        <div class="favorites-drawer-item-actions">
          <button class="btn btn-outline btn-sm" data-action="view-recipe" data-id="${recipe.id}" title="View Recipe">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="btn btn-danger-outline btn-sm" data-action="toggle-fav" data-id="${recipe.id}" title="Remove from Favorites">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }
};

import { recipes } from "./data/recipes.js";
import { recipesManager } from "./Manager/recipes/recipesManager.js";
import { filterManager } from "./Manager/filters/filtersManager.js";

/**
 * This function initialize the DOM elements
 * There is no logic here, just DOM manipulation
 */
export function initDomElements() {
  const { createRecipes: createRecipesCards } = recipesManager();
  const { createFilters } = filterManager();

  createRecipesCards(recipes);
  createFilters();
}

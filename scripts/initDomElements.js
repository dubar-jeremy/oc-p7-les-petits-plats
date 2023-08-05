import { recipes } from "./data/recipes.js";
import { recipesFactory } from "./factory/recipes/recipesFactory.js";
import { filterFactory } from "./factory/filters/filtersFactory.js";

/**
 * This function initialize the DOM elements
 * There is no logic here, just DOM manipulation
 */
export function initDomElements() {
  const { createRecipes: createRecipesCards } = recipesFactory();
  const { createFilters } = filterFactory();

  createRecipesCards(recipes);
  createFilters();
}

import { compareRecipes } from "./compareRecipes.js"

/**
 * This function will check if a recipe is already in the recipes array passed in parameter
 * It will return true if the recipe is already in the array
 * It will return false if the recipe is not in the array
 */
export function isRecipeDuplicate(recipe, recipes) {
    return recipes.some((otherRecipe) => otherRecipe.name === recipe.name);
}


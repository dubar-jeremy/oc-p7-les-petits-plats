import { filterManager } from '../Manager/filters/filtersManager.js'
import { recipesManager } from '../Manager/recipes/recipesManager.js'

/**
 * This function is called when the user click on the search button
 * It will search for recipes by recipes name, description or ingredients
 * If no recipe found, it will display a message
 * If recipes found, it will display the recipes
 * If there is less than 3 characters in the search input, it will do nothing
 */
export function searchRecipes() {
    const { recipeNotFound, createRecipes, filterRecipes } = recipesManager()

    const { displayRemainingFilters } = filterManager()

    const mainForm = document.querySelector('#main-form')

    const formData = new FormData(mainForm)
    const searchValue = formData.get('main-search')

    if (searchValue.length < 3) {
        return
    }

    const searchValueRegex = new RegExp('\\b' + searchValue + '\\b', 'gi')

    const filteredRecipes = filterRecipes(searchValueRegex)

    // for all recipes found, display the remaining filters
    displayRemainingFilters(filteredRecipes)

    const notFoundRecipes = filteredRecipes.length === 0 && searchValue.length >= 3

    // if no recipe found clean the cards container (remove all cards) and add "not found" in the cards container
    if (notFoundRecipes) {
        recipeNotFound(`Aucune recette ne contient "${searchValue}", vous pouvez chercher «
        tarte aux pommes », « poisson », etc.`)
        return
    }

    createRecipes(filteredRecipes)
}

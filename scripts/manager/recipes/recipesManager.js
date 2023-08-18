import { clean } from '../../helper/clean.js'
import { createCard } from './helper/createCard.js'
import { recipes } from '../../data/recipes.js'
import { isRecipeDuplicate } from './helper/isRecipeDuplicate.js'

/**
 * The recipes factory is used to create and manage recipes
 */
function recipesManager() {
    const cardsContainer = document.querySelector('.cards')
    const recipesFound = document.querySelector('.recipes-found')

    /**
     * This function will return all recipes
     */
    function getRecipes() {
        return recipes
    }

    /**
     * This function will return a recipe by its name
     */
    function getRecipeByName(recipeName) {
        const recipes = getRecipes()
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            if (recipe.name === recipeName) {
                return recipe
            }
        }
        return null
    }

    /**
     * Create a single recipe
     */
    function createRecipe(recipe) {
        cardsContainer.appendChild(createCard(recipe))
    }

    /**
     * Display the number of recipes found in the page
     */
    function displayNumberOfRecipes(numberOfRecipes) {
        if (numberOfRecipes === '1') {
            recipesFound.innerHTML = `${numberOfRecipes} recette`
            return
        }

        recipesFound.innerHTML = `${numberOfRecipes} recettes`
    }

    /**
     * Display a message when no recipe is found
     * Default message is "Not found"
     */
    function recipeNotFound(message = 'Not found') {
        cardsContainer.innerHTML = ''
        const container = document.querySelector('.error-message')
        container.classList.remove('d-none')
        container.classList.add('text-center', 'p-5')
        container.innerHTML = message

        displayNumberOfRecipes('0')
    }

    /**
     * This function will create recipes with the recipes array passed in parameter
     * It will remove duplicate recipes
     * It will display the number of recipes found
     */
    function createRecipes(recipes) {
        clean(cardsContainer)

        const uniqueRecipes = []

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            let isDuplicate = false

            for (let j = 0; j < uniqueRecipes.length; j++) {
                if (uniqueRecipes[j].id === recipe.id) {
                    isDuplicate = true
                    break
                }
            }

            if (!isDuplicate) {
                uniqueRecipes.push(recipe)
            }
        }

        for (let i = 0; i < uniqueRecipes.length; i++) {
            const recipe = uniqueRecipes[i]
            createRecipe(recipe)
        }

        displayNumberOfRecipes(uniqueRecipes.length.toString())
    }

    /**
     * This function will filter recipes by the user input passed in parameter
     * It will return an array of recipes found
     * It might return an empty array if no recipe found
     * It might return an array with duplicate recipes.
     */
    function filterRecipes(userInput) {
        const filteredRecipes = []

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            const recipeName = recipe.name.toLowerCase()
            const recipeDescription = recipe.description.toLowerCase()
            const recipeIngredients = recipe.ingredients

            if (userInput.test(recipeName)) {
                if (!isRecipeDuplicate(recipe, filteredRecipes)) {
                    filteredRecipes.push(recipe)
                }
            }

            if (userInput.test(recipeDescription)) {
                if (!isRecipeDuplicate(recipe, filteredRecipes)) {
                    filteredRecipes.push(recipe)
                }
            }

            let j = 0
            while (j < recipeIngredients.length) {
                const ingredient = recipeIngredients[j].ingredient.toLowerCase()
                if (userInput.test(ingredient)) {
                    if (!isRecipeDuplicate(recipe, filteredRecipes)) {
                        filteredRecipes.push(recipe)
                    }
                    break
                }
                j++
            }
        }

        return filteredRecipes
    }

    return {
        createRecipe,
        displayNumberOfRecipes,
        recipeNotFound,
        createRecipes,
        filterRecipes,
        getRecipes,
        getRecipeByName,
    }
}

export { recipesManager }

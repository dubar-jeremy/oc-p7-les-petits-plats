import { clean } from '../../helper/clean.js'
import { createCard } from './helper/createCard.js'
import { recipes } from '../../data/recipes.js'
import { isRecipeDuplicate } from './helper/isRecipeDuplicate.js'

/**
 * The recipes factory is used to create and manage recipes
 */
function recipesFactory() {
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
        const recipes = getRecipes();
        return recipes.find((recipe) => recipe.name === recipeName) || null;
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
        clean(cardsContainer);
    
        const uniqueRecipes = recipes.filter((recipe, index, recipes) => {
            return recipes.findIndex((otherRecipe) => otherRecipe.id === recipe.id) === index;
        });
    
        uniqueRecipes.forEach((recipe) => createRecipe(recipe));
    
        displayNumberOfRecipes(uniqueRecipes.length.toString());
    }


    function filterRecipes(userInput) {
        const filteredRecipes = recipes.filter((recipe) => {
            const recipeName = recipe.name.toLowerCase()
            const recipeDescription = recipe.description.toLowerCase()
            const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())

            return (
                userInput.test(recipeName) ||
                userInput.test(recipeDescription) ||
                recipeIngredients.some((ingredient) => userInput.test(ingredient))
            )
        })

        return filteredRecipes.filter((recipe, index, recipes) => {
            return !recipes.slice(0, index).some((otherRecipe) => isRecipeDuplicate(recipe, [otherRecipe]))
        })
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

export { recipesFactory }

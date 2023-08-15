import { filterFactory } from '../filters/filtersFactory.js'
import { getElementId } from '../filters/helper/getElementId.js'
import { recipesFactory } from '../recipes/recipesFactory.js'


function filtersBarFactory() {
    let allRecipes = []

    const { createRecipes, getRecipeByName, recipeNotFound } = recipesFactory()
    const { displayRemainingFilters, createFilter } = filterFactory();

    function initializeRecipes() {
        const cardsTitle = document.querySelectorAll('.card-title-recipe')

        cardsTitle.forEach((cardTitle) => {
            const recipeName = cardTitle.innerHTML
            const recipe = getRecipeByName(recipeName)
            allRecipes.push(recipe)
        })
    }

    function applyFilters(filterType) {
        let clickedIngredientNames = []
        let clickedUstenstilNames = []
        let clickedApplianceNames = []

        const clickedElements = document.querySelectorAll(`.${filterType}-list-group .clicked`)

        clickedElements.forEach((clickedElement) => {
            clickedApplianceNames.push(clickedElement.innerHTML.toLowerCase())
            clickedUstenstilNames.push(clickedElement.innerHTML.toLowerCase())
            clickedIngredientNames.push(clickedElement.innerHTML.toLowerCase())
        })

        let filteredRecipes = []

        allRecipes.forEach((recipe) => {
            let hasAllIngredients = true

            clickedIngredientNames.forEach((clickedIngredientName) => {
                const hasIngredient = recipe.ingredients.some(
                    (ingredient) => ingredient.ingredient.toLowerCase() === clickedIngredientName
                )

                if (!hasIngredient) {
                    hasAllIngredients = false
                    return // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            })

            if (hasAllIngredients) {
                filteredRecipes.push(recipe)
            }
        })

        allRecipes.forEach((recipe) => {
            let hasAllUstensils = true

            clickedUstenstilNames.forEach((clickedUstensilName) => {
                const hasUstensil = recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === clickedUstensilName)

                if (!hasUstensil) {
                    hasAllUstensils = false
                    return // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            })

            if (hasAllUstensils) {
                filteredRecipes.push(recipe)
            }
        })

        allRecipes.forEach((recipe) => {
            let hasAllAppliances = true

            clickedApplianceNames.forEach((clickedApplianceName) => {
                const hasAppliance = recipe.appliance.toLowerCase() === clickedApplianceName

                if (!hasAppliance) {
                    hasAllAppliances = false
                    return // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            })

            if (hasAllAppliances) {
                filteredRecipes.push(recipe)
            }
        })

        if (filteredRecipes.length === 0) {
            recipeNotFound(
                'Aucune recettes trouvée. Veuillez tenter une nouvelle recherche ou supprimer certains filtres'
            )
            return
        }

        let newListIngredients = [];
        let newListAppliances = [];
        let newListUstensils = [];
        filteredRecipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            newListIngredients.push(ingredient.ingredient);
          });
            newListAppliances.push(recipe.appliance);

            recipe.ustensils.forEach((ustensil) => {
                newListUstensils.push(ustensil);
            });
        })

        createRecipes(filteredRecipes)

        return {newListIngredients, newListAppliances, newListUstensils};
    }

    function removeFilter(event, filterType) {
        const ingredientElement = event.target.parentElement

        const filterText = ingredientElement.querySelector('.filter-text').innerHTML

        const id = getElementId(filterText)

        const filterElement = document.getElementById(id)

        filterElement.classList.remove('clicked')

        filterElement.classList.remove('d-none')

        filterElement.removeAttribute('haveBeenClicked')

        ingredientElement.remove()

        applyFilters(filterType)
    }

    return {
        initializeRecipes,
        applyFilters,
        removeFilter,
    }
}

export { filtersBarFactory }

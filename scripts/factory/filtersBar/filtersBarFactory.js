import { getElementId } from '../filters/helper/getElementId.js'
import { recipesFactory } from '../recipes/recipesFactory.js'

function filtersBarFactory() {
    let allRecipes = []

    const { createRecipes, getRecipeByName, recipeNotFound } = recipesFactory()

    function initializeRecipes() {
        const cardsTitle = document.querySelectorAll('.card-title-recipe')
        for (let i = 0; i < cardsTitle.length; i++) {
            const recipeName = cardsTitle[i].innerHTML
            const recipe = getRecipeByName(recipeName)
            allRecipes.push(recipe)
        }
    }

    function applyFilters(filterType) {
        let clickedIngredientNames = [];
        let clickedUstenstilNames = [];
        let clickedApplianceNames = [];
        
        const clickedElements = document.querySelectorAll(`.${filterType}-list-group .clicked`);
        
        for (let i = 0; i < clickedElements.length; i++) {
          const ingredient = clickedElements[i];
          clickedIngredientNames.push(ingredient.innerHTML.toLowerCase());
        
          const ustensil = clickedElements[i];
          clickedUstenstilNames.push(ustensil.innerHTML.toLowerCase());
        
          const appliance = clickedElements[i];
          clickedApplianceNames.push(appliance.innerHTML.toLowerCase());
        }

        
        let filteredRecipes = []
        for (let i = 0; i < allRecipes.length; i++) {
            const recipe = allRecipes[i]
            let hasAllIngredients = true

            for (let j = 0; j < clickedIngredientNames.length; j++) {
                const clickedIngredientName = clickedIngredientNames[j]
                const hasIngredient = recipe.ingredients.some(
                    (ingredient) => ingredient.ingredient.toLowerCase() === clickedIngredientName
                )

                if (!hasIngredient) {
                    hasAllIngredients = false
                    break
                }
            }

            if (hasAllIngredients) {
                filteredRecipes.push(recipe)
            }
        }

        for (let i = 0; i < allRecipes.length; i++) {
            const recipe = allRecipes[i]
            let hasAllUstensils = true

            for (let j = 0; j < clickedUstenstilNames.length; j++) {
                const clickedUstensilName = clickedUstenstilNames[j]
                const hasUstensil = recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === clickedUstensilName)

                if (!hasUstensil) {
                    hasAllUstensils = false
                    break
                }
            }

            if (hasAllUstensils) {
                filteredRecipes.push(recipe)
            }
        }

        for (let i = 0; i < allRecipes.length; i++) {
            const recipe = allRecipes[i]
            let hasAllAppliances = true

            for (let j = 0; j < clickedApplianceNames.length; j++) {
                const clickedApplianceName = clickedApplianceNames[j]
                const hasAppliance = recipe.appliance.toLowerCase() === clickedApplianceName

                if (!hasAppliance) {
                    hasAllAppliances = false
                    break
                }
            }

            if (hasAllAppliances) {
                filteredRecipes.push(recipe)
            }
        }
        if (filteredRecipes.length === 0) {
            recipeNotFound(
                'Aucune recettes trouvée. Veuillez tenter une nouvelle recherche ou supprimer certains filtres'
            )
            return
        }

        createRecipes(filteredRecipes)
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

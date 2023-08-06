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

        allRecipes.forEach(recipe => {
            let hasAllIngredients = true;
        
            clickedIngredientNames.forEach(clickedIngredientName => {
                const hasIngredient = recipe.ingredients.some(
                    ingredient => ingredient.ingredient.toLowerCase() === clickedIngredientName
                );
        
                if (!hasIngredient) {
                    hasAllIngredients = false;
                    return; // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            });
        
            if (hasAllIngredients) {
                filteredRecipes.push(recipe);
            }
        });
        

        allRecipes.forEach(recipe => {
            let hasAllUstensils = true;
        
            clickedUstenstilNames.forEach(clickedUstensilName => {
                const hasUstensil = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === clickedUstensilName);
        
                if (!hasUstensil) {
                    hasAllUstensils = false;
                    return; // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            });
        
            if (hasAllUstensils) {
                filteredRecipes.push(recipe);
            }
        });
        

        allRecipes.forEach(recipe => {
            let hasAllAppliances = true;
        
            clickedApplianceNames.forEach(clickedApplianceName => {
                const hasAppliance = recipe.appliance.toLowerCase() === clickedApplianceName;
        
                if (!hasAppliance) {
                    hasAllAppliances = false;
                    return; // On peut utiliser 'return' pour sortir de la boucle forEach
                }
            });
        
            if (hasAllAppliances) {
                filteredRecipes.push(recipe);
            }
        });
        
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

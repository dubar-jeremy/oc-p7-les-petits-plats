/**
 * This function returns an array of filters with the data passed in parameter
 * It takes an array of recipes in parameter
 * It returns an object with 3 arrays: ingredients, appareils, ustensils
 */
export function getFilters(recipes) {

    const filters = {
        ingredients: [],
        appareils: [],
        ustensils: [],
    }

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (recipes[i].ingredients[j].ingredient) {
                const ingredient = recipes[i].ingredients[j]?.ingredient?.toLowerCase()
                if (!filters.ingredients.includes(ingredient)) {
                    filters.ingredients.push(ingredient)
                }
            }
        }
    }

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].appliance) {
            const appliance = recipes[i].appliance?.toLowerCase()
            if (!filters.appareils.includes(appliance)) {
                filters.appareils.push(appliance)
            }
        }
    }

    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            if (recipes[i].ustensils[j]) {
                const ustensil = recipes[i].ustensils[j]?.toLowerCase()
                if (!filters.ustensils.includes(ustensil)) {
                    filters.ustensils.push(ustensil)
                }
            }
        }
    }

    return filters
}
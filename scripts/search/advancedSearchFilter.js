import { filterManager } from '../manager/filters/filtersManager.js'
import { filtersBarManager } from '../manager/filtersBar/filtersBarManager.js'

function advancedSearchFilter(event, filterType) {
    const { initializeRecipes, applyFilters, removeFilter } = filtersBarManager()
    const { createAdvancedFilter } = filterManager()

    
    initializeRecipes()

    event.target.classList.add('clicked')
    event.target.classList.add('d-none')
    event.target.setAttribute('haveBeenClicked', 'true')    

    const { newListIngredients, newListAppliances, newListUstensils } = applyFilters(filterType)

    createAdvancedFilter(event.target.innerHTML)

    const arrows = document.querySelectorAll('.arrow-filter')

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', (event) => removeFilter(event, filterType))
    }

    document.getElementById(`${filterType}-search`).value = ''

    return {
        newListIngredients,
        newListAppliances,
        newListUstensils
    }
}

export { advancedSearchFilter }

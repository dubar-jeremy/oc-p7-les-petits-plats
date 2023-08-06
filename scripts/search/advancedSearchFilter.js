import { filterFactory } from '../factory/filters/filtersFactory.js'
import { filtersBarFactory } from '../factory/filtersBar/filtersBarFactory.js'

function advancedSearchFilter(event, filterType) {
    const { initializeRecipes, applyFilters, removeFilter } = filtersBarFactory()
    const { createAdvancedFilter } = filterFactory()

    
    initializeRecipes()

    event.target.classList.add('clicked')
    event.target.classList.add('d-none')
    event.target.setAttribute('haveBeenClicked', 'true')    

    applyFilters(filterType)

    createAdvancedFilter(event.target.innerHTML)

    const arrows = document.querySelectorAll('.arrow-filter')

    arrows.forEach(arrow => {
        arrow.addEventListener('click', event => removeFilter(event, filterType));
      });

    document.getElementById(`${filterType}-search`).value = ''
}

export { advancedSearchFilter }

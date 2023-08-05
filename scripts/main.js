/**
 * You are in the branch "option-1"
 * It means all functions will be coded in a "traditional way"
 * It means all loop are cooded with for, while, do while loops
 * There is no includes, find, filter, map, reduce, etc.
 */

import { initDomElements } from './initDomElements.js'
import { advancedSearch } from './search/advancedSearch.js'
import { advancedSearchFilter } from './search/advancedSearchFilter.js'
import { searchRecipes } from './search/searchRecipes.js'

initDomElements()

const mainSearchBtn = document.querySelector('.main-search-button')
const ingredientsSearch = document.querySelector('#ingredients-search')
const ustensilsSearch = document.querySelector('#ustentiles-search')
const appliancesSearch = document.querySelector('#appareils-search')

/*
 * Basic search
 * User can search for recipes by recipes name, description or ingredients
 */
mainSearchBtn?.addEventListener('click', searchRecipes)

/*
 * Advanced search
 * User can search in the filters for ingredients, ustensils or appliances
 */
ingredientsSearch?.addEventListener('input', advancedSearch)
ustensilsSearch?.addEventListener('input', advancedSearch)
appliancesSearch?.addEventListener('input', advancedSearch)


/*
* click on the filter item
* User can click on the filter item to add it to the filters bar
*/
const ingredientListIems = document.querySelectorAll(`.ingredients-list-group li`)
const ustensilsListIems = document.querySelectorAll(`.ustentiles-list-group li`)
const appliancesListIems = document.querySelectorAll(`.appareils-list-group li`)

for (let i = 0; i < ingredientListIems.length; i++) {
    ingredientListIems[i].addEventListener('click', (event) => advancedSearchFilter(event, 'ingredients'))
}

for(let i = 0; i < ustensilsListIems.length; i++){
    ustensilsListIems[i].addEventListener('click', (event) => advancedSearchFilter(event, 'ustentiles'))
}

for (let i = 0; i < appliancesListIems.length; i++) {
    appliancesListIems[i].addEventListener('click', (event) => advancedSearchFilter(event, 'appareils'))
}

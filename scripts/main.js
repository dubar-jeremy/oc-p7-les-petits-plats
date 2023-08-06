/**
 * You are in the branch "option-B"
 * It means all functions will be coded with functionnal programming
 * It means all loop are cooded with map, filter, foreach, etc.
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

ingredientListIems.forEach((item) => {
    item.addEventListener('click', (event) => advancedSearchFilter(event, 'ingredients'))
})

ustensilsListIems.forEach((item) => {
    item.addEventListener('click', (event) => advancedSearchFilter(event, 'ustentiles'))
})

appliancesListIems.forEach((item) => {
    item.addEventListener('click', (event) => advancedSearchFilter(event, 'appareils'))
})

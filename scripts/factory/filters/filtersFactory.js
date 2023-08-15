import { recipesFactory } from '../recipes/recipesFactory.js'
import { getElementId } from './helper/getElementId.js'
import { getFilters } from './helper/getFilters.js'

function filterFactory() {
    const { getRecipes } = recipesFactory()

    /**
     * get the filters from the data
     */
    function getFilterItems() {
        const recipes = getRecipes()
        const filters = getFilters(recipes)
        return filters
    }

    function createFilter(selector, data) {
        const element = document.querySelector(selector)
        const content = element.querySelector(`${selector}-content`)
        const input = content.querySelector('input[type="text"]')
        const list = content.querySelector(`${selector}-list-group`)
        const icon = document.querySelector(`${selector}-icon`)

        for (let i = 0; i < data.length; i++) {
            const id = data[i]
                .replace(/'/g, '_')
                .replace(/\s/g, '-')
                .toLowerCase()
                .replace(/[\u0300-\u036f]/g, '')

            list.innerHTML += `
      <li class="list-group-item border-0" id=${id}>${data[i]}</li>
    `
        }

        element.addEventListener('click', () => {

            if(input.value.length > 0){
                input.value = ''
            }
            
            const allSelectors = ['.ingredients', '.appareils', '.ustentiles']

            // remove the current selector from the list
            const index = allSelectors.indexOf(selector)
            allSelectors.splice(index, 1)

            for (let i = 0; i < allSelectors.length; i++) {
                const selector = allSelectors[i]
                const content = document.querySelector(`${selector}-content`)
                const icon = document.querySelector(`${selector}-icon`)
                content.classList.remove('content-active')
                content.classList.add('content-inactive')
                icon.classList.remove('icon-active')
            }

            content.classList.toggle('content-active')
            content.classList.toggle('content-inactive')
            icon.classList.toggle('icon-active')
        })

        input.addEventListener('click', (event) => {
            event.stopPropagation()
        })

        list.addEventListener('click', (event) => {
            event.stopPropagation()
        })

        // return the list of elements displayed
        const displayedElements = document.querySelectorAll(`${selector}-list-group li:not(.d-none)`)

        const newListElements = []
        for (let i = 0; i < displayedElements.length; i++) {
            newListElements.push(displayedElements[i].textContent)
        }

        return newListElements
    }

    function createFilters() {
        const { ingredients, ustensils, appareils } = getFilterItems()
        createFilter('.ingredients', ingredients)
        createFilter('.appareils', appareils)
        createFilter('.ustentiles', ustensils)
    }

    /**
     * Hide <li> elements with the 'd-none' class that don't have the 'display' attribute.
     * These elements are provided in a list.
     */
    function hideItemsNotInList(list) {
        const listItems = document.querySelectorAll(`.${list}-list-group li`)
        for (let i = 0; i < listItems.length; i++) {
            if (!listItems[i].hasAttribute('display')) {
                listItems[i].remove();
            }
        }
    }

    /**
     * Filter an array of ingredients and set the 'display' attribute for each one.
     */
    function getRemainsIngredients(ingredients) {
        for (let j = 0; j < ingredients.length; j++) {

            const ingredient = ingredients[j].ingredient
            const ingredientElement = document.querySelector(`#${getElementId(ingredient)}`)
            ingredientElement.setAttribute('display', 'true')
        }
    }

    /**
     * Filter an array of utensils and set the 'display' attribute for each one.
     */
    function getRemainsUstensils(ustensils) {
        for (let j = 0; j < ustensils.length; j++) {
            const ustensil = ustensils[j]
            const ustensilElement = document.querySelector(`#${getElementId(ustensil)}`)
            ustensilElement.setAttribute('display', 'true')
        }
    }

    /**
     * Filter an appliance and set the 'display' attribute.
     */
    function getRemainsAppliances(appliance) {
        document.querySelector(`#${getElementId(appliance)}`).setAttribute('display', 'true')
    }

    /**
     * Get list of filtered recipes and apply the attribute "display" for ingredients, utensils, and appliances inside of it.
     * Then, hide ingredients, utensils, and appliances not in the list.
     */
    function displayRemainingFilters(filteredRecipes) {

        for (let i = 0; i < filteredRecipes.length; i++) {
            const ingredients = filteredRecipes[i].ingredients
            const appliance = filteredRecipes[i].appliance
            const utensils = filteredRecipes[i].ustensils
            getRemainsIngredients(ingredients)
            getRemainsAppliances(appliance)
            getRemainsUstensils(utensils)
        }

        hideItemsNotInList('ingredients')
        hideItemsNotInList('appliances')
        hideItemsNotInList('utensils')
    }

    function createAdvancedFilter(value){
        const filterItems = document.querySelector(".filter-items");

        const filterItem = document.createElement("div");
        filterItem.classList.add("bg-warning", "p-2", "me-2", "rounded", "rounded-4");
        filterItems.appendChild(filterItem);
      
        // add span inside filterItem
        const span = document.createElement("span");
        span.classList.add("pe-5", "filter-text");
        span.textContent = value;
        filterItem.appendChild(span);
      
        // add image inside filterItem
        const image = document.createElement("img");
        image.src = "./public/arrow.svg";
        image.classList.add("arrow-filter");
        image.alt = "...";
        filterItem.appendChild(image);
    }

    function displayRemainingOnClick(selector, remaining) {
        const list = document.querySelectorAll(`.${selector}-list-group li`);
    
        // Remove all li
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            item.classList.add('d-none');
        }
    
        // Display only the remaining
        for (let i = 0; i < remaining.length; i++) {
            const item = remaining[i];
            const id = getElementId(item);
            const li = document.querySelector(`#${id}`);
    
            // Remove only for those that don't have attribute "havebeenclicked"
            if (!li.hasAttribute('havebeenclicked')) {
                li.classList.remove('d-none');
            }
        }
    }
    

    return {
        displayRemainingFilters,
        getFilterItems,
        createFilters,
        createFilter,
        createAdvancedFilter,
        displayRemainingOnClick
    }
}

export { filterFactory }

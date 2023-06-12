import { recipes } from "./data/recipes";
import { createCard } from "./helper/createCard";
import { createFilter } from "./helper/createFilter";

/**
 * This function initialize the DOM elements
 * There is no logic here, just DOM manipulation
 */
export function initDomElements() {
  createFilter(".ingredients");
  createFilter(".appareils");
  createFilter(".ustentiles");

  const cardContainer = document.querySelector(".cards");

  recipes.forEach((card) => {
    cardContainer?.appendChild(createCard(card));
  });
}

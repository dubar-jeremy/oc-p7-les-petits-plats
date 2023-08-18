
/**
 * This function creates a card for a recipe with the data passed in parameter
 */
function createCard(data) {
  const mainContainer = document.createElement("div");

  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  if(data.id < 10){
    image.src = `./public/assets/recipes/Recette0${data.id}.jpg`;
  }
  if(data.id >= 10){
    image.src = `./public/assets/recipes/Recette${data.id}.jpg`;
  }
  image.classList.add("card-img", "recipes-img");
  image.alt = "...";

  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add("card-img-overlay");

  const dFlexContainer = document.createElement("div");
  dFlexContainer.classList.add("d-flex", "justify-content-end");

  const cardTime = document.createElement("span");
  cardTime.classList.add(
    "card-text",
    "card-time",
    "ps-2",
    "pe-2",
    "px-1",
    "py-1",
    "font-sm"
  );
  cardTime.textContent = "10min";

  dFlexContainer.appendChild(cardTime);
  cardOverlay.appendChild(dFlexContainer);
  card.appendChild(image);
  card.appendChild(cardOverlay);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title", "card-title-recipe");
  title.textContent = data.name;

  const recipe = document.createElement("p");
  recipe.classList.add("card-text", "card-recipe");
  recipe.textContent = "RECETTE";

  const descriptionContainer = document.createElement("div");
  const description = document.createElement("p");
  descriptionContainer.classList.add("card-text", "card-description");
  description.textContent = data.description;
  descriptionContainer.appendChild(description);

  const ingredientsTitle = document.createElement("p");
  ingredientsTitle.classList.add("card-text", "card-ingredients");
  ingredientsTitle.textContent = "INGREDIENTS";

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("row", "gx-5", "gy-2");

  data.ingredients.forEach((ingredient) => {
    const ingredientContainer = document.createElement("div");
    ingredientContainer.classList.add("col-6", "card-line-height");

    const ingredientTitle = document.createElement("p");
    ingredientTitle.classList.add("title-ingredient");

    ingredientTitle.textContent = ingredient.ingredient || "";

    const ingredientAmount = document.createElement("p");
    ingredientAmount.classList.add("amount-ingredient");
    ingredientAmount.textContent = ingredient.quantity?.toString() || "";

    ingredientContainer.appendChild(ingredientTitle);
    ingredientContainer.appendChild(ingredientAmount);
    ingredientsContainer.appendChild(ingredientContainer);
  });

  const ingredientsCardBody = document.createElement("div");
  ingredientsCardBody.classList.add("card-body-ingredients");
  ingredientsCardBody.appendChild(ingredientsTitle);
  ingredientsCardBody.appendChild(ingredientsContainer);

  cardBody.appendChild(title);
  cardBody.appendChild(recipe);
  cardBody.appendChild(descriptionContainer);
  cardBody.appendChild(ingredientsCardBody);
  card.appendChild(cardBody);

  mainContainer.appendChild(card);

  return mainContainer;
}

export { createCard }
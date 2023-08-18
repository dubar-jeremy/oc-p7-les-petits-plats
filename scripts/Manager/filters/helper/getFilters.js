export function getFilters(recipes) {
    const filters = {
      ingredients: [],
      appareils: [],
      ustensils: [],
    };
  
    // Get unique ingredients
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredientObj => {
        if (ingredientObj.ingredient) {
          const ingredient = ingredientObj.ingredient.toLowerCase();
          if (!filters.ingredients.includes(ingredient)) {
            filters.ingredients.push(ingredient);
          }
        }
      });
    });
  
    // Get unique appliances
    recipes.forEach(recipe => {
      if (recipe.appliance) {
        const appliance = recipe.appliance.toLowerCase();
        if (!filters.appareils.includes(appliance)) {
          filters.appareils.push(appliance);
        }
      }
    });
  
    // Get unique ustensils
    recipes.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        if (ustensil) {
          const lowerCasedUstensil = ustensil.toLowerCase();
          if (!filters.ustensils.includes(lowerCasedUstensil)) {
            filters.ustensils.push(lowerCasedUstensil);
          }
        }
      });
    });
  
    return filters;
  }
  
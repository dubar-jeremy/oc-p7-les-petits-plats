interface Ingredients {
  ingredient?: string;
  quantity?: number;
  unit?: string;
}

export interface Recipes {
  id: number;
  image: string;
  name: string;
  servings: number;
  ingredients: Ingredients[];
  time: number;
  description: string;
  appliance: string | string[];
  ustensils: string[];
}

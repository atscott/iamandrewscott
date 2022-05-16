import { Ingredient } from "../new-recipe/ingredient/ingredient.component";
import { Recipe } from "../new-recipe/new-recipe.component";

export interface RecipeInfo {
  recipe: Recipe&{key: string};
  have: Ingredient[];
  dontHave: Ingredient[];
  percentIHave: number;
}

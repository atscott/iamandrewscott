import {NewRecipeComponent} from './new-recipe.component';

export const routes = [
      {
        path: 'new',
        component: NewRecipeComponent,
      },
      {
        path: 'edit/:recipeId',
        component: NewRecipeComponent,
      },
    ];
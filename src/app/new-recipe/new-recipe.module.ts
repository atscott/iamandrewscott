import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';

import {IngredientComponent} from './ingredient/ingredient.component';
import {NewRecipeComponent} from './new-recipe.component';

@NgModule({
  declarations: [NewRecipeComponent, IngredientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: 'new',
        component: NewRecipeComponent,
      },
      {
        path: 'edit/:recipeId',
        component: NewRecipeComponent,
      },
    ]),
  ]
})
export class NewRecipeModule {
}

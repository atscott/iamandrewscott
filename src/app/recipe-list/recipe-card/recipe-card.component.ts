import {Component, Input} from '@angular/core';
import {Recipe} from '../../new-recipe/new-recipe.component';

@Component({
  selector : 'recipe-card',
  templateUrl : './recipe-card.component.html',
  styleUrls : [ './recipe-card.component.css' ]
})
export class RecipeCardComponent {
  @Input() recipeInfo: Recipe;
}

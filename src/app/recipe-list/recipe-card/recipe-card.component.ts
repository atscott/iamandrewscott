import {Component, Input} from '@angular/core';
import { RecipeInfo } from '../recipe-list.component';

@Component({
  selector : 'recipe-card',
  templateUrl : './recipe-card.component.html',
  styleUrls : [ './recipe-card.component.css' ]
})
export class RecipeCardComponent {
  @Input() recipeInfo: RecipeInfo;
}

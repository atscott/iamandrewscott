import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';

import {RecipeInfo} from '../recipe-list.component';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
  ]
})
export class RecipeCardComponent {
  @Input() recipeInfo: RecipeInfo;
}

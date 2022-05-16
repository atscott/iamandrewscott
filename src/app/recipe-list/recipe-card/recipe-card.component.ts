import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import { RecipeInfo } from '../recipe-info';


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
    MatButtonModule,
  ]
})
export class RecipeCardComponent {
  @Input() recipeInfo: RecipeInfo;
}

import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {Observable} from 'rxjs';

import {Recipe} from '../new-recipe/new-recipe.component';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
  ]
})
export class RecipeViewComponent {
  recipe: Observable<Recipe>;
  recipeId?: string;

  constructor(
      private db: AngularFireDatabase, private router: Router,
      private route: ActivatedRoute) {
    this.recipeId = this.route.snapshot.params['recipeId'];
    this.checkParamsForDbid();
  }

  checkParamsForDbid() {
    if (this.recipeId) {
      this.recipe =
          this.db.object(`/beer-cocktails/${this.recipeId}`).valueChanges() as
          Observable<Recipe>;
    } else {
      this.router.navigate(['/list']);
    }
  }
}

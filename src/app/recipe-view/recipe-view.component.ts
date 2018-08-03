import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

import {Recipe} from '../new-recipe/new-recipe.component';

@Component({
  selector : 'app-recipe-view',
  templateUrl : './recipe-view.component.html',
  styleUrls : [ './recipe-view.component.css' ]
})
export class RecipeViewComponent {
  recipe: Observable<Recipe>;
  recipeId?: string;

  constructor(private db: AngularFireDatabase, private router: Router,
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
      this.router.navigate([ '/list' ]);
    }
  }
}

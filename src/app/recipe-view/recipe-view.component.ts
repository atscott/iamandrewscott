import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {Recipe} from '../new-recipe/new-recipe.component';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent {
  recipe: FirebaseObjectObservable<Recipe>;

  constructor(
      private db: AngularFireDatabase, private router: Router,
      private route: ActivatedRoute) {
        this.checkParamsForDbid(this.route.snapshot.params);
      }

  checkParamsForDbid(params: Params) {
    if (params['recipeId']) {
      this.recipe = this.db.object(`/beer-cocktails/${params['recipeId']}`);
    } else {
      this.router.navigate(['/list']);
    }
  }
}

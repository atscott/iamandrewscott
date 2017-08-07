import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  private cocktails: FirebaseListObservable<any>;
  private existingRecipe: FirebaseObjectObservable<any>;
  recipeForm: FormGroup;
  name: FormControl;
  ingredients: FormArray;
  imageUrl: FormControl;
  description: FormControl;

  constructor(
      private db: AngularFireDatabase, private router: Router,
      private route: ActivatedRoute) {
    this.cocktails = db.list('beer-cocktails');

    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.imageUrl = new FormControl('', [Validators.required]);
    this.recipeForm = new FormGroup({
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
    });

    this.checkParamsForDbid(route.snapshot.params);
  }
  
  ngOnInit(){}

  private checkParamsForDbid(params: Params) {
    if (params['recipeId']) {
      this.existingRecipe =
          this.db.object(`/beer-cocktails/${params['recipeId']}`);
      const subscription = this.existingRecipe.subscribe((o) => {
        this.recipeForm.setValue(o);
        subscription.unsubscribe();
      });
    }
  }

  onSubmit() {
    if (this.existingRecipe) {
      this.existingRecipe.update(this.recipeForm.getRawValue()).then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.cocktails.push(this.recipeForm.getRawValue())
          .then(() => {
            this.router.navigate(['/']);
          })
          .catch((e) => {
            console.log('error saving');
          });
    }
  }
}

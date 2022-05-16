import {CommonModule, Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ActivatedRoute, Params} from '@angular/router';

import {Ingredient, IngredientComponent} from './ingredient/ingredient.component';

export type Recipe = {
  ingredients: Ingredient[],
  name: string,
  description?: string,
  directions?: string,
  recipeUrl?: string, imageUrl: string,
};

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    IngredientComponent,
  ]
})
export class NewRecipeComponent implements OnInit {
  private cocktails: AngularFireList<any>;
  private existingRecipeRef: AngularFireObject<any>;
  recipeForm: FormGroup;
  name: FormControl;
  ingredients: FormArray;
  imageUrl: FormControl;
  description: FormControl;
  directions: FormControl;

  constructor(
      private db: AngularFireDatabase, route: ActivatedRoute,
      public location: Location) {
    this.cocktails = db.list('beer-cocktails');

    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.directions = new FormControl('');
    this.imageUrl = new FormControl('');
    this.ingredients = new FormArray([], Validators.minLength(1));
    this.recipeForm = new FormGroup({
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      ingredients: this.ingredients,
      directions: this.directions
    });

    this.checkParamsForDbid(route.snapshot.params);
  }

  ngOnInit() {}

  newIngredient() {
    this.ingredients.push(new FormControl());
  }

  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }

  private checkParamsForDbid(params: Params) {
    if (params['recipeId']) {
      this.existingRecipeRef =
          this.db.object(`/beer-cocktails/${params['recipeId']}`);
      const subscription =
          this.existingRecipeRef.valueChanges().subscribe((o) => {
            o.ingredients = o.ingredients || [];
            o.ingredients.forEach(
                () => this.ingredients.push(new FormControl()));
            o.description = o.description || '';
            o.directions = o.directions || '';
            this.recipeForm.setValue(o);
            subscription.unsubscribe();
          });
    }
  }

  onSubmit() {
    if (this.existingRecipeRef) {
      this.existingRecipeRef.update(this.recipeForm.getRawValue()).then(() => {
        this.location.back();
      });
    } else {
      this.addNewRecipe();
    }
  }

  private async addNewRecipe() {
    try {
      await this.cocktails.push(this.recipeForm.getRawValue());
      this.location.back();
    } catch {
      console.log('error saving');
    }
  }
}

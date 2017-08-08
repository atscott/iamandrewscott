import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable, Subscription} from 'rxjs/Rx';

import {Ingredient} from '../new-recipe/ingredient/ingredient.component';
import {Recipe} from '../new-recipe/new-recipe.component';

export type RecipeInfo = {
  recipe: Recipe; have: string[]; dontHave: string[]; percentIHave: number;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
}) export class RecipeListComponent implements OnInit {
  cocktails: FirebaseListObservable<any>;
  latestCocktails: Recipe[];
  private haversAndHaveNotes: RecipeInfo[] = [];
  filteredCocktails: Recipe[];
  sortOption: FormControl;
  myIngredients: FormArray;
  allIngredients: string[];
  subscription: Subscription;
  keys: Set<string>;
  sortedKeys: string[];
  ingredientsByType: Map<string, Set<string>>;
  types: Set<string>;

  constructor(db: AngularFireDatabase) {
    this.myIngredients = new FormArray([]);
    this.sortOption = new FormControl('missing');
    this.cocktails = db.list('beer-cocktails');

    this.subscription = this.cocktails.subscribe((l: Recipe[]) => {
      this.latestCocktails = l;
      this.keys = new Set();
      this.ingredientsByType = new Map();
      this.types = new Set();
      l.map((r) => r.ingredients)
          .forEach((ingredientsInRecipe) => ingredientsInRecipe.forEach((i) => {
            const type = (i.type as {} as string) || 'other';
            const key = `${i.name.toLowerCase()}-${type}`;
            this.types.add(type);
            this.keys.add(key);
            this.ingredientsByType.set(
                type,
                (this.ingredientsByType.get(type) || new Set())
                    .add(i.name.toLowerCase()));
          }));
      this.sortedKeys = Array.from(this.keys);
      this.sortedKeys.sort(
          (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      this.keys.forEach(() => this.myIngredients.push(new FormControl()));
    });

    this.sortOption.valueChanges.subscribe(() => {
      this.filteredCocktails = this.applyFilters(this.haversAndHaveNotes);
    });

    this.myIngredients.valueChanges
        .map(
            (v) => v.reduce(
                (myIngredients, checked, i) => {
                  if (checked) {
                    const key = this.sortedKeys[i];
                    const ingredientName =
                        key.substring(0, key.lastIndexOf('-'));
                    return myIngredients.add(ingredientName);
                  }
                  return myIngredients;
                },
                new Set<string>()))
        .debounceTime(100)
        .distinctUntilChanged()
        .map((myIngredientSet) => this.latestCocktails.map((recipe) => {
          const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
            if (myIngredientSet.has(i.name.toLowerCase())) {
              return {
                have: acc.have.add(i.name.toLowerCase()), dontHave: acc.dontHave
              }
            } else {
              return {
                have: acc.have, dontHave: acc.dontHave.add(i.name)
              }
            }
          }, {have: new Set<string>(), dontHave: new Set<string>()});
          // not sure this is useful. probably just want to rank by
          // ingredients I don't have, descending
          const percentIHave =
              have.size === 0 ? 0 : have.size / recipe.ingredients.length;

          return {
            recipe,
            have: Array.from(have),
            dontHave: Array.from(dontHave),
            percentIHave
          };
        }))
        .subscribe((v: RecipeInfo[]) => {
          this.haversAndHaveNotes = v;
          this.filteredCocktails = this.applyFilters(v);
        });
  }

  applyFilters(recipes: RecipeInfo[]) {
    let filterFunctions = [];
    if (this.sortOption.value === 'missing') {
      filterFunctions.push(this.sortByMissingIngredientCount);
    } else {
      filterFunctions.push(this.sortByPercent);
    }
    return filterFunctions.reduce((result, f) => f(recipes), recipes);
  }

  sortByMissingIngredientCount(l: RecipeInfo[]) {
    return l.sort((a, b) => a.dontHave.length - b.dontHave.length);
  }

  sortByPercent(l: RecipeInfo[]) {
    return l.sort((a, b) => {
      if (a.percentIHave - b.percentIHave === 0) {
        return b.have.length - a.have.length;
      }
      return b.percentIHave - a.percentIHave;
    });
  }

  removeGarnishIngredients(l: RecipeInfo[]) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  view(recipe) {
    console.log(recipe);
  }

  formControlFor(ingredientName: string, type: string) {
    const key = `${ingredientName}-${type}`;
    return this.myIngredients.at(this.sortedKeys.indexOf(key));
  }
}

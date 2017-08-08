import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable, Subscription} from 'rxjs/Rx';

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
  haversAndHaveNots: Observable<RecipeInfo[]>;
  sortOption: FormControl;
  myIngredients: FormArray;
  allIngredients: string[];
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    this.myIngredients = new FormArray([]);
    this.sortOption = new FormControl('missing');
    this.cocktails = db.list('beer-cocktails');

    this.subscription = this.cocktails.subscribe((l: Recipe[]) => {
      this.latestCocktails = l;
      this.allIngredients =
          Array
              .from(l.map((r) => r.ingredients)
                        .reduce(
                            (allIngredients, ingredientsInRecipe) =>
                                ingredientsInRecipe.reduce(
                                    (newSet, i) => newSet.add(i.name),
                                    allIngredients),
                            new Set<string>()))
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      this.allIngredients.forEach(
          () => this.myIngredients.push(new FormControl()));
    });

    this.haversAndHaveNots =
        this.myIngredients.valueChanges
            .map(
                (v) => v.reduce(
                    (myIngredients, checked, i) => checked ?
                        myIngredients.add(this.allIngredients[i]) :
                        myIngredients,
                    new Set<string>()))
            .map((myIngredientSet) => this.latestCocktails.map((recipe) => {

              const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
                if (myIngredientSet.has(i.name.toLowerCase())) {
                  return {
                    have: acc.have.add(i.name.toLowerCase()),
                        dontHave: acc.dontHave
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
            }));
  }

  applyFilters(recipes: RecipeInfo[]) {
    let filterFunctions = [];
    if (this.sortOption.value === 'missing') {
      filterFunctions.push(this.sortByMissingIngredientCount);
    } else {
      filterFunctions.push(this.sortByHaveThenPercent);
    }
    return filterFunctions.reduce((result, f) => f(result), recipes);
  }

  sortByMissingIngredientCount(l: RecipeInfo[]) {
    return l.sort((a, b) => a.dontHave.length - b.dontHave.length);
  }

  sortByHaveThenPercent(l: RecipeInfo[]) {
    return l.sort((a, b) => {
      if (a.have.length - b.have.length === 0) {
        return b.percentIHave - a.percentIHave;
      }
      return b.have.length - a.have.length
    });
  }

  removeGarnishIngredients(l: RecipeInfo[]) {
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(recipe) {
    this.cocktails.remove(recipe);
  }

  view(recipe) {
    console.log(recipe);
  }
}

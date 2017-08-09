
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {MdSidenav} from '@angular/material';
import {MdCheckboxChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable, Subscription} from 'rxjs/Rx';

import {Ingredient} from '../new-recipe/ingredient/ingredient.component';
import {Recipe} from '../new-recipe/new-recipe.component';

import {sortByMissingIngredientCount, sortByPercent} from './filters';

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
  sidenavMode = window.outerWidth < 720 ? 'over' : 'side';
  selectedIngredientKeys: Set<string> = new Set();
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(
      db: AngularFireDatabase, private router: Router,
      private route: ActivatedRoute) {
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
            const key = this.makeIngredientKey(i);
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

      this.sortedKeys.forEach((k) => {
        this.myIngredients.push(
            new FormControl(this.selectedIngredientKeys.has(k)));
      });
      this.updateList();
    });

    this.sortOption.valueChanges.subscribe(() => {
      this.filteredCocktails = this.applyFilters(this.haversAndHaveNotes);
    });

    // this is currently a race condition and has to execute before
    // this.cocktails emits
    this.route.queryParams.subscribe((params) => {
      try {
        this.selectedIngredientKeys =
            new Set(JSON.parse(params['ingredients']) as string[]);
        this.updateList();
      } catch (e) {
      }
    });
  }

  parseIngredientParam() {
    try {
      const ingredientParam = this.route.snapshot.params['ingredients'];
      if (ingredientParam) {
        this.selectedIngredientKeys =
            new Set(JSON.parse(ingredientParam) as string[]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  updateList() {
    const v = (this.latestCocktails || []).map((recipe) => {
      const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
        if (this.selectedIngredientKeys.has(this.makeIngredientKey(i))) {
          return {
            have: acc.have.add(i.name.toLowerCase()), dontHave: acc.dontHave
          }
        } else {
          return {
            have: acc.have, dontHave: acc.dontHave.add(i.name)
          }
        }
      }, {have: new Set<string>(), dontHave: new Set<string>()});
      const percentIHave =
          have.size === 0 ? 0 : have.size / recipe.ingredients.length;

      return {
        recipe,
        have: Array.from(have),
        dontHave: Array.from(dontHave),
        percentIHave
      };
    });
    this.haversAndHaveNotes = v;
    this.filteredCocktails = this.applyFilters(v);
  }

  ingredientCheckChange(
      event: MdCheckboxChange, ingredientName: string, ingredientType: string) {
    if (event.checked) {
      this.selectedIngredientKeys.add(
          this.makeKey(ingredientName, ingredientType));
    } else {
      this.selectedIngredientKeys.delete(
          this.makeKey(ingredientName, ingredientType));
    }
    this.router.navigate(['/list'], {
      queryParams: {
        ingredients: JSON.stringify(Array.from(this.selectedIngredientKeys))
      }
    });
  }

  applyFilters(recipes: RecipeInfo[]) {
    let filterFunctions = [];
    if (this.sortOption.value === 'missing') {
      filterFunctions.push(sortByMissingIngredientCount);
    } else {
      filterFunctions.push(sortByPercent);
    }
    return filterFunctions.reduce((result, f) => f(recipes), recipes);
  }

  removeGarnishIngredients(l: RecipeInfo[]) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 720) {
      this.sidenavMode = 'over';
    } else {
      this.sidenavMode = 'side';
      this.sidenav.open();
    }
  }

  toggleSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  view(recipe) {
    console.log(recipe);
  }

  private makeKey(ingredientName: string, type: string = 'other') {
    return `${ingredientName.toLowerCase()}-${type.toLowerCase()}`;
  }

  private makeIngredientKey(i: Ingredient) {
    return this.makeKey(i.name, (i.type as {} as string));
  }

  formControlFor(ingredientName: string, type: string) {
    const key = this.makeKey(ingredientName, type);
    return this.myIngredients.at(this.sortedKeys.indexOf(key));
  }
}

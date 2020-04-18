import {Component, HostListener, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase,} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Ingredient} from '../new-recipe/ingredient/ingredient.component';
import {Recipe} from '../new-recipe/new-recipe.component';

import {removeGarnishIngredients, sortByMissingIngredientCount, sortByPercent} from './filters';

export type RecipeInfo = {
  recipe: Recipe; have: Ingredient[]; dontHave: Ingredient[];
  percentIHave: number;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
}) export class RecipeListComponent {
  cocktails: Observable<any[]>;
  latestCocktails: Recipe[];
  private haversAndHaveNotes: RecipeInfo[] = [];
  filteredCocktails: Recipe[];
  sortOption: FormControl;
  ignoreGarnishIngredients: FormControl;
  allIngredients: Ingredient[] = [];
  sidenavMode: string;
  selectedIngredients: Set<string> = new Set();
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  get selectedIngredientsArray() {
    return Array.from(this.selectedIngredients);
  }

  constructor(
      db: AngularFireDatabase, private router: Router,
      private route: ActivatedRoute) {
    this.sortOption = new FormControl('missing');
    this.ignoreGarnishIngredients = new FormControl(false);
    this.cocktails = db.list('beer-cocktails')
                         .snapshotChanges()
                         .pipe(
                             map(actions => actions.map(
                                     a => ({key: a.key, ...a.payload.val()}))));

    const subscription = this.cocktails.subscribe((l: Recipe[]) => {
      this.latestCocktails = l;
      this.allIngredients = [];
      l.map((r) => r.ingredients)
          .forEach((ingredientsInRecipe) => ingredientsInRecipe.forEach((i) => {
            this.allIngredients.push(i);
          }));

      this.updateList();

      subscription.unsubscribe();
    });

    // this is currently a race condition and has to execute before
    // this.cocktails emits
    this.route.queryParams.subscribe((params) => {
      try {
        this.selectedIngredients = new Set(JSON.parse(params['ingredients']));
        this.updateList();
      } catch (e) {
      }
    });
  }

  updateList() {
    const v = (this.latestCocktails || []).map((recipe) => {
      const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
        if (this.selectedIngredients.has(i.name.toLowerCase())) {
          return {
            have: acc.have.concat(i), dontHave: acc.dontHave
          }
        } else {
          return {
            have: acc.have, dontHave: acc.dontHave.concat(i)
          }
        }
      }, {have: [], dontHave: []});
      const percentIHave =
          have.length === 0 ? 0 : have.length / recipe.ingredients.length;

      return {recipe, have, dontHave, percentIHave};
    });
    this.haversAndHaveNotes = v;
    this.applyFilters();
  }

  selectedIngredientsChange(ingredientNames: Set<string>) {
    this.selectedIngredients = ingredientNames;
    this.router.navigate(['/list'], {
      queryParams: {
        ingredients: JSON.stringify([...Array.from(this.selectedIngredients)])
      }
    });
  }

  applyFilters() {
    let filterFunctions = [];
    if (this.ignoreGarnishIngredients.value) {
      filterFunctions.push(removeGarnishIngredients);
    }
    if (this.sortOption.value === 'missing') {
      filterFunctions.push(sortByMissingIngredientCount);
    } else {
      filterFunctions.push(sortByPercent);
    }
    this.filteredCocktails = filterFunctions.reduce(
        (result, f) => f(result), this.haversAndHaveNotes);
  }

  ngOnInit() {
    if (window.outerWidth < 800) {
      this.sidenavMode = 'over';
    } else {
      this.sidenavMode = 'side';
      this.sidenav.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 720) {
      this.sidenavMode = 'over';
      this.sidenav.close();
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
}

import {CommonModule} from '@angular/common';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDrawerMode, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {merge, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {Ingredient} from '../new-recipe/ingredient/ingredient.component';
import {Recipe} from '../new-recipe/new-recipe.component';

import {removeGarnishIngredients, sortByMissingIngredientCount, sortByPercent} from './filters';
import {IngredientSelectorComponent} from './ingredient-selector/ingredient-selector.component';
import {RecipeCardComponent} from './recipe-card/recipe-card.component';
import { RecipeInfo } from './recipe-info';

type RecipeWithDbKey = Recipe&{key: string};

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatChipsModule,
    IngredientSelectorComponent,
    MatCheckboxModule,
    FlexLayoutModule,
    CommonModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RecipeCardComponent,
  ],
  standalone: true,
})
export class RecipeListComponent implements OnInit {
  cocktails: Observable<RecipeWithDbKey[]>;
  latestCocktails: RecipeWithDbKey[];
  private haversAndHaveNots: RecipeInfo[] = [];
  filteredCocktails: RecipeInfo[];
  sortOption: FormControl;
  ignoreGarnishIngredients: FormControl;
  allIngredients: Ingredient[] = [];
  sidenavMode: MatDrawerMode;
  selectedIngredients: Set<string> = new Set();
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  get selectedIngredientsArray() {
    return Array.from(this.selectedIngredients);
  }

  constructor(db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.sortOption = new FormControl('missing');
    this.ignoreGarnishIngredients = new FormControl(false);
    merge(this.sortOption.valueChanges, this.ignoreGarnishIngredients.valueChanges)
        .subscribe(() => this.navigateToUpdateUrlState());

    this.cocktails =
        db.list<Recipe>('beer-cocktails')
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => ({key: a.key, ...a.payload.val()}))));

    this.cocktails.pipe(take(1)).subscribe((recipeList: RecipeWithDbKey[]) => {
      this.latestCocktails = recipeList;
      this.allIngredients = [];
      recipeList.map((recipe) => recipe.ingredients)
          .forEach((ingredientsInRecipe) => ingredientsInRecipe.forEach((ingredient) => {
            this.allIngredients.push(ingredient);
          }));

      this.updateList();
    });

    // this is currently a race condition and has to execute before
    // this.cocktails emits
    this.route.queryParams.subscribe((params) => {
      try {
        this.selectedIngredients =
            new Set(JSON.parse(params['ingredients']).map(ingredient => ingredient.toLowerCase()));
      } catch (e) {
      }
      this.sortOption.setValue(params['sort'] === 'missing' ? 'missing' : 'have');
      this.ignoreGarnishIngredients.setValue(params['ignoreGarnish'] === 'false' ? false : true);
      this.updateList();
      this.applyFilters();
    });
  }

  updateList() {
    const result = (this.latestCocktails || []).map((recipe) => {
      const {have, dontHave} = recipe.ingredients.reduce((acc, i) => {
        return this.selectedIngredients.has(i.name.toLowerCase()) ?
            {have: acc.have.concat(i), dontHave: acc.dontHave} :
            {have: acc.have, dontHave: acc.dontHave.concat(i)};
      }, {have: [], dontHave: []});
      const percentIHave = have.length === 0 ? 0 : have.length / recipe.ingredients.length;

      return {recipe, have, dontHave, percentIHave};
    });
    this.haversAndHaveNots = result;
    this.applyFilters();
  }

  selectedIngredientsChange(ingredientNames: Set<string>) {
    this.selectedIngredients = ingredientNames;
    this.router.navigate(
        ['/list'],
        {queryParams: {ingredients: JSON.stringify([...Array.from(this.selectedIngredients)])}});
  }

  navigateToUpdateUrlState() {
    this.router.navigate(['/list'], {
      queryParams: {
        ingredients: JSON.stringify([...Array.from(this.selectedIngredients)]),
        sort: this.sortOption.value,
        ignoreGarnish: this.ignoreGarnishIngredients.value,
      }
    });
  }

  applyFilters() {
    const filterFunctions = [];
    if (this.ignoreGarnishIngredients.value) {
      filterFunctions.push(removeGarnishIngredients);
    }
    if (this.sortOption.value === 'missing') {
      filterFunctions.push(sortByMissingIngredientCount);
    } else {
      filterFunctions.push(sortByPercent);
    }
    this.filteredCocktails =
        filterFunctions.reduce((result, f) => f(result), this.haversAndHaveNots);
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

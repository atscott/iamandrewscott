import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {Ingredient} from '../../new-recipe/ingredient/ingredient.component';


@Component({
  selector: 'ingredient-selector',
  templateUrl: './ingredient-selector.component.html',
  styleUrls: ['./ingredient-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientSelectorComponent {
  @Input() ingredients: Ingredient[] = [];
  @Input() selectedIngredients: Set<string> = new Set();
  @Output() selectedIngredientsChange = new EventEmitter<Set<string>>();
  ingredientsByType: Map<string, Set<string>> = new Map();
  ingredientNames: Set<string> = new Set();

  readonly filteredIngredientTypes:
      Observable<Array<{name: string, ingredients: string[]}>>;
  readonly ingredientControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('ingredientInput', { static: true }) ingredientInput: ElementRef;

  constructor() {
    this.filteredIngredientTypes = this.ingredientControl.valueChanges.pipe(
        startWith(''),
        map(ingredient => this.filterTypes(ingredient)),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredients']) {
      this.ingredientsByType = new Map();
      for (const ingredient of this.ingredients) {
        const type = ingredient.type as any as string || 'misc ingredients';
        this.ingredientNames.add(ingredient.name.toLocaleLowerCase());

        const ingredientsOfType = this.ingredientsByType.get(type) || new Set();
        ingredientsOfType.add(ingredient.name.toLocaleLowerCase());
        this.ingredientsByType.set(type, ingredientsOfType);
      }
    }
  }

  private filterTypes(value: string):
      Array<{name: string, ingredients: string[]}> {
    const filterValue = value.toLowerCase();
    const typesArray =
        Array.from(this.ingredientsByType.keys()).reduce((types, type) => {
          const ingredients = Array.from(this.ingredientsByType.get(type));
          types.push({
            name: type,
            ingredients: this.filterIngredients(ingredients, filterValue)
          });
          return types;
        }, []);
    return typesArray
        .map(type => ({name: type.name, ingredients: type.ingredients}))
        .filter(type => type.ingredients.length > 0);
  }

  private filterIngredients(opt: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) >= 0)
        .filter(item => !this.selectedIngredients.has(item));
  };


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!this.ingredientNames.has(value) ||
        this.selectedIngredients.has(value)) {
      return;
    }

    // Add our ingredient
    if (value) {
      this.selectedIngredients.add(value);
      this.selectedIngredientsChange.emit(this.selectedIngredients);
    }

    // Reset the input value
    const input = event.input;
    if (input) {
      input.value = '';
    }

    this.ingredientControl.setValue('');
  }

  remove(ingredient: string): void {
    this.selectedIngredients.delete(ingredient);
    this.selectedIngredientsChange.emit(this.selectedIngredients);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredients.add(event.option.viewValue);
    this.selectedIngredientsChange.emit(this.selectedIngredients);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientControl.setValue('');
  }
}

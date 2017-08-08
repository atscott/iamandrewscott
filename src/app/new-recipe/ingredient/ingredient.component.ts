import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {};

export enum abc {
  'ounce',
  'liter',
  'teaspoon',
  'tablespoon',
  'cup',
  'garnish',
}

export type MeasurementType =
    'ounce'|'liter'|'teaspoon'|'tablespoon'|'cup'|'garnish';

export type Measurement = {
  amount: number,
  type: MeasurementType
}

export type Ingredient = {
  name: string,
  details?: string,
  measurement?: Measurement,
};

@Component({
  selector: 'recipe-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IngredientComponent),
    multi: true
  }]
})
export class IngredientComponent implements ControlValueAccessor {
  ingredientForm: FormGroup;
  name: FormControl;
  details: FormControl;
  measurement: FormGroup;
  amount: FormControl;
  type: FormControl;
  measurementTypes: string[] = [];

  constructor(builder: FormBuilder) {
    for (const x in abc) {
      if(typeof abc[x] === 'number') this.measurementTypes.push(x);
    }

    this.name = new FormControl();
    this.details = new FormControl();
    this.amount = new FormControl();
    this.type = new FormControl();

    this.measurement = builder.group({amount: this.amount, type: this.type});
    this.ingredientForm = builder.group({
      name: this.name,
      details: this.details,
      measurement: this.measurement
    });


    this.ingredientForm.valueChanges.subscribe(() => {
      this.propagateChange(this.ingredientForm.getRawValue());
    });
  }

  private propagateChange: (c: any) => void = noop;

  writeValue(obj?: Ingredient) {
    if (obj) {
      this.name.setValue(obj.name || '');
      this.details.setValue(obj.details || '');
      if (obj.measurement) {
        this.amount.setValue(obj.measurement.amount);
        this.type.setValue(obj.measurement.type || '');
      }
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}
}

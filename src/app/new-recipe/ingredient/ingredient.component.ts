import {Component, forwardRef, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

const noop = () => {};

export enum MeasurementType {
  'ounce',
  'liter',
  'teaspoon',
  'tablespoon',
  'cup',
  'garnish',
}

export enum IngredientType {
  'beer',
  'liquor',
  'liqueur',
  'sugar/syrup/sweetener',
  'bitters',
  'juice',
  'garnish'
}

export type Measurement = {
  amount: number,
  type: MeasurementType
}

export type Ingredient = {
  name: string,
  details?: string,
  measurement?: Measurement, type: IngredientType
};

@Component({
  selector : 'recipe-ingredient',
  templateUrl : './ingredient.component.html',
  styleUrls : [ './ingredient.component.css' ],
  providers : [ {
    provide : NG_VALUE_ACCESSOR,
    useExisting : forwardRef(() => IngredientComponent),
    multi : true
  } ]
})
export class IngredientComponent implements ControlValueAccessor {
  ingredientForm: FormGroup;
  name: FormControl;
  details: FormControl;
  measurement: FormGroup;
  amount: FormControl;
  measurementType: FormControl;
  measurementTypes: string[] = [];
  ingredientType: FormControl;
  ingredientTypes: string[] = [];

  constructor(builder: FormBuilder) {
    for (const x in MeasurementType) {
      if (typeof MeasurementType[x] === 'number')
        this.measurementTypes.push(x);
    }
    for (const x in IngredientType) {
      if (typeof IngredientType[x] === 'number')
        this.ingredientTypes.push(x);
    }

    this.name = new FormControl();
    this.details = new FormControl();
    this.amount = new FormControl();
    this.measurementType = new FormControl();
    this.ingredientType = new FormControl();

    this.measurement =
        builder.group({amount : this.amount, type : this.measurementType});
    this.ingredientForm = builder.group({
      name : this.name,
      details : this.details,
      type : this.ingredientType,
      measurement : this.measurement
    });

    this.ingredientForm.valueChanges.subscribe(
        () => { this.propagateChange(this.ingredientForm.getRawValue()); });
  }

  private propagateChange: (c: any) => void = noop;

  writeValue(obj?: Ingredient) {
    if (obj) {
      this.name.setValue(obj.name || '');
      this.details.setValue(obj.details || '');
      this.ingredientType.setValue(obj.type || '');
      if (obj.measurement) {
        this.amount.setValue(obj.measurement.amount);
        this.measurementType.setValue(obj.measurement.type || '');
      }
    }
  }

  public registerOnChange(fn: any) { this.propagateChange = fn; }

  public registerOnTouched() {}
}

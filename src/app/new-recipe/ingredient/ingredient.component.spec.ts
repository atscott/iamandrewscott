import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppModule} from '../../app.module';

import {IngredientComponent} from './ingredient.component';

describe('IngredientComponent', () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports : [ AppModule ]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => { expect(component).toBeTruthy(); });
});

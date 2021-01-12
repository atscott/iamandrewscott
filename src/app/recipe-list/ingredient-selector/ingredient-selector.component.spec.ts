import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IngredientSelectorComponent} from './ingredient-selector.component';

describe('IngredientSelectorComponent', () => {
  let component: IngredientSelectorComponent;
  let fixture: ComponentFixture<IngredientSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({declarations: [IngredientSelectorComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

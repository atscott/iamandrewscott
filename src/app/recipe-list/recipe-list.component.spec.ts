import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppModule} from '../app.module';
import {RecipeListComponent} from './recipe-list.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports : [ AppModule ]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => { expect(component).toBeTruthy(); });
});

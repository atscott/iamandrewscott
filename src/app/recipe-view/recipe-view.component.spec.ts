import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AppModule} from '../app.module';

import {RecipeViewComponent} from './recipe-view.component';

describe('RecipeViewComponent', () => {
  let component: RecipeViewComponent;
  let fixture: ComponentFixture<RecipeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [AppModule]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

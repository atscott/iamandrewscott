import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppModule} from '../app.module';
import {LandingComponent} from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports : [ AppModule ]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => { expect(component).toBeTruthy(); });
});

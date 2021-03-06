import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProgressiveImageComponent} from './progressive-image.component';

describe('ProgressiveImageComponent', () => {
  let component: ProgressiveImageComponent;
  let fixture: ComponentFixture<ProgressiveImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [ProgressiveImageComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressiveImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

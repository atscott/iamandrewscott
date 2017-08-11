import {Component, DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ProgressiveBackgroundImageDirective} from './progressive-background-image.directive';

@Component({
  selector: 'test-cmp',
  template:
      '<div progressiveBackgroundImage [lq]="lqImage" [hq]="hqImage"></div>'
})
export class TestCmp {
  lqImage: string;
  hqImage: string;
}

describe('progressive background image', () => {

  let fixture: ComponentFixture<TestCmp>;
  let component: TestCmp;
  let imageElement: DebugElement;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [TestCmp, ProgressiveBackgroundImageDirective],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmp);
    component = fixture.componentInstance;
    imageElement = fixture.debugElement.query(
        By.directive(ProgressiveBackgroundImageDirective));
    fixture.detectChanges();
  });

  it('has transition for background image', () => {
    expect(imageElement.nativeElement.style.transition)
        .toEqual('background-image 1s linear');
  });

  it('has blur class when hq is not loaded', () => {
    expect(imageElement.nativeElement.classList.contains('blur')).toBe(true);
  });

  it('does not have blur when hq image is loaded', () => {
    imageElement.injector.get(ProgressiveBackgroundImageDirective).hqLoaded =
        true;
    fixture.detectChanges();
    expect(imageElement.nativeElement.classList.contains('blur')).toBe(false);
  });
});
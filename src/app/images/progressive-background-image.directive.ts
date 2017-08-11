import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[progressiveBackgroundImage]',
  host: {
    '[style.transition]': '"background-image 1s linear"',
    '[class.blur]': '!hqLoaded'
  },
  inputs: ['hq', 'lq'],
})
export class ProgressiveBackgroundImageDirective {
  lq: string;
  hq: string;

  hqLoaded = false;

  ngOnChanges() {
    if (!this.hq) return;
    this.hqLoaded = false;

    const img = new Image();
    img.onload = () => {
      this.hqLoaded = true;
    };
    img.src = this.hq;
  }

  @HostBinding('style.backgroundImage')
  get backgroundImage() {
    const url = this.hqLoaded ? this.hq : this.lq;
    return `url(${url})`;
  }
}

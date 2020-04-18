import {Component, OnInit} from '@angular/core';

@Component({
  selector : 'progressive-image',
  inputs : [ 'lowQualityImage', 'highQualityImage', 'srcset' ],
  templateUrl : './progressive-image.component.html',
  styleUrls : [ './progressive-image.component.css' ]
})
export class ProgressiveImageComponent {
  lowQualityImage: string;
  highQualityImage: string;
  srcset?: string[];
  highQualityImageLoaded = false;
  lowQualityImageLoaded = false;
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progressive-image',
  inputs: ['lowQualityImage', 'highQualityImage'],
  templateUrl: './progressive-image.component.html',
  styleUrls: ['./progressive-image.component.css']
})
export class ProgressiveImageComponent {
  lowQualityImage: string;
  highQualityImage: string;
  highQualityImageLoaded = false;
  lowQualityImageLoaded = false;
}

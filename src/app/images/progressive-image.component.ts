import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'progressive-image',
  inputs: ['lowQualityImage', 'highQualityImage', 'srcset'],
  templateUrl: './progressive-image.component.html',
  styleUrls: ['./progressive-image.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class ProgressiveImageComponent {
  lowQualityImage: string;
  highQualityImage: string;
  srcset?: string[];
  highQualityImageLoaded = false;
  lowQualityImageLoaded = false;
}

import { Component } from '@angular/core';
import { RoadmapComponent } from '../roadmap/roadmap.component';
import { GamesComponent } from '../games/games.component';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { FooterComponent } from '../../footer/footer.component';
import { InfoSectionComponent } from '../../info-section/info-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RoadmapComponent,
    GamesComponent,
    LottieComponent,
    InfoSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  options: AnimationOptions = {
    path: '../../../assets/logo-animation.json',
  };

  private animationItem: AnimationItem;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;

    this.animationItem.playSpeed = 0.4;
  }
}

import { Component, Input } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss',
})
export class RewardComponent {
  options: AnimationOptions = {
    path: '/assets/earnplaying.json',
  };

  @Input()
  lockedBalance: number;
}

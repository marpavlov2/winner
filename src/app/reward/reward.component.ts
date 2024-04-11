import { Component, Input } from '@angular/core';
import { heroRocketLaunch } from '@ng-icons/heroicons/outline';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { SetBetComponent } from '../set-bet/set-bet.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [
    NgIconComponent,
    SetBetComponent,
    MatSnackBarModule,
    FormsModule,
    LottieComponent,
  ],
  providers: [
    provideIcons({
      heroRocketLaunch,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss',
})
export class RewardComponent {
  options: AnimationOptions = {
    path: '../../../assets/logo-animation-1-w.json',
  };

  @Input()
  lockedBalance: number;

  @Input()
  luckyTicket: number;

  private animationItem: AnimationItem;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;

    this.animationItem.playSpeed = 0.8;
  }
  constructor() {}
}

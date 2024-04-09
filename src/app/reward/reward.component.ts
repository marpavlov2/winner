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

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [NgIconComponent, SetBetComponent, MatSnackBarModule, FormsModule],
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
  @Input()
  lockedBalance: number;

  constructor() {}
}

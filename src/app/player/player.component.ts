import { Component, Input } from '@angular/core';
import { Player } from '../player.model';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { heroTrophy, heroReceiptPercent } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      heroTrophy,
      heroReceiptPercent,
    }),
    provideNgIconsConfig({
      size: '1.3em',
    }),
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  @Input()
  player: Player;

  @Input()
  totalPlayers: number;

  @Input()
  index: number;
}

import { Component, Input } from '@angular/core';
import { Player } from '../player.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
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

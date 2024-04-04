import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-players-in-round',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-in-round.component.html',
  styleUrl: './players-in-round.component.scss',
})
export class PlayersInRoundComponent {
  @Input()
  playersCurrent: number;

  @Input()
  playersMax: number;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss',
})
export class RewardComponent {
  @Input()
  lockedBalance: number;
}

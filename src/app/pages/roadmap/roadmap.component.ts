import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
})
export class RoadmapComponent {
  items = [
    {
      phase: 'Phase-1',
      year: 'Q2 2024',
      firstText: 'Create Pot of TON game',
      secondText: 'Create Telegram Bot',
      thirdText: 'Complete website',
    },
    {
      phase: 'Phase-2',
      year: 'Q3 2024',
      firstText: 'Create New Game',
      secondText: 'Presale Token',
      thirdText: 'Create airdrop',
    },
    {
      phase: 'Phase-3',
      year: 'Q4 2024',
      firstText: 'Create New Game',
      secondText: 'Commodi dignissimos odit consequatur placeat!',
      thirdText: 'Explicabo eaque qui nostrum iste!',
    },
    {
      phase: 'Phase-4',
      year: 'Q1 2025',
      firstText: 'Labore et dolore magna aliqua.',
      secondText: 'Ut enim ad minim veniam.',
      thirdText:
        'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];
}

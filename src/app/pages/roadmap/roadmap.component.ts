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
      firstText: 'Cum, neque non iusto odit quidem animi sequi.',
      secondText: 'Lorem ipsum dolor sit amet',
      thirdText:
        'Consectetur adipisicing elit. Odio, minima dolores? Recusandae non voluptate',
    },
    {
      phase: 'Phase-2',
      year: 'Q3 2024',
      firstText: 'Doloribus, explicabo qui possimus ullam rem voluptatum aut?',
      secondText: 'Consectetur adipisicing elit. Dignissimos, facere!',
      thirdText: 'Illum magni ipsam dolorum soluta. Ipsa, dolore, repellat.',
    },
    {
      phase: 'Phase-3',
      year: 'Q4 2024',
      firstText: 'Voluptates doloribus dolorum incidunt?',
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

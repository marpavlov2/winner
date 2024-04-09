import { Component } from '@angular/core';
import { RoadmapComponent } from '../roadmap/roadmap.component';
import { GamesComponent } from '../games/games.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoadmapComponent, GamesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

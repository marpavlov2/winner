import { Component, Input } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  heroUsers,
  heroTrophy,
  heroRocketLaunch,
  heroShieldCheck,
  heroScale,
  heroPencilSquare,
  heroXMark,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-game-info-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgIconComponent],
  providers: [
    provideIcons({
      heroUsers,
      heroTrophy,
      heroRocketLaunch,
      heroShieldCheck,
      heroScale,
      heroPencilSquare,
      heroXMark,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  templateUrl: './game-info-dialog.component.html',
  styleUrl: './game-info-dialog.component.scss',
})
export class GameInfoDialogComponent {
  @Input()
  fee: number;

  constructor(public dialogRef: MatDialogRef<GameInfoDialogComponent>) {}

  closeButton(): void {
    this.dialogRef.close();
  }
}

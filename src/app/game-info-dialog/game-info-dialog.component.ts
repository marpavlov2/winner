import { Component, Input } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroQrCode,
  heroClipboardDocument,
  heroUsers,
  heroTrophy,
  heroXMark,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-game-info-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgIconComponent],
  templateUrl: './game-info-dialog.component.html',
  styleUrl: './game-info-dialog.component.scss',
})
export class GameInfoDialogComponent {
  @Input()
  fee: number;

  constructor(public dialogRef: MatDialogRef<GameInfoDialogComponent>) {}
}

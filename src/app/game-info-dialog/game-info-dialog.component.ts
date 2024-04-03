import { Component, Input } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-game-info-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './game-info-dialog.component.html',
  styleUrl: './game-info-dialog.component.scss',
})
export class GameInfoDialogComponent {
  @Input()
  fee: number;

  constructor(public dialogRef: MatDialogRef<GameInfoDialogComponent>) {}
}

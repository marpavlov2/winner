import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContractService } from './services/main-contract.service';
import { HeaderComponent } from './header/header.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  heroQrCode,
  heroClipboardDocument,
  heroUsers,
  heroTrophy,
  heroBanknotes,
} from '@ng-icons/heroicons/outline';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoDialogComponent } from './game-info-dialog/game-info-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    QrCodeDialogComponent,
    NgIconComponent,
    PlayerComponent,
    MatSnackBarModule,
    GameInfoDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideIcons({
      heroQrCode,
      heroClipboardDocument,
      heroUsers,
      heroTrophy,
      heroBanknotes,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class AppComponent {
  constructor(
    public mainContractService: MainContractService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.mainContractService.useMainContract();
  }

  qrCodeDialog(): void {
    const dialogRef = this.dialog.open(QrCodeDialogComponent, {
      width: '380px',
      panelClass: 'custom-dialog',
    });
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(GameInfoDialogComponent, {
      width: '680px',
      panelClass: 'custom-dialog',
    });

    dialogRef.componentInstance.fee = this.mainContractService.feePercent;
  }

  copyMessage(): void {
    this._snackBar.open('Copied', '', {
      verticalPosition: 'bottom',
      panelClass: 'snackbar-layout',
      duration: 1000,
    });
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.mainContractService.contractAddress;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

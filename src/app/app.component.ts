import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainContractService } from './services/main-contract.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header/header.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import { PlayerComponent } from './player/player.component';
import { GameInfoDialogComponent } from './game-info-dialog/game-info-dialog.component';
import { SocialIconsComponent } from './social-icons/social-icons.component';
import { RewardComponent } from './reward/reward.component';
import { PlayersInRoundComponent } from './players-in-round/players-in-round.component';
import AOS from 'aos';

import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import {
  heroQrCode,
  heroClipboardDocument,
  heroUsers,
  heroTrophy,
  heroRocketLaunch,
} from '@ng-icons/heroicons/outline';
import { TonConnectService } from './ton-connect.service';
import { Address, toNano } from '@ton/core';

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
    SocialIconsComponent,
    RewardComponent,
    PlayersInRoundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideIcons({
      heroQrCode,
      heroClipboardDocument,
      heroUsers,
      heroTrophy,
      heroRocketLaunch,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class AppComponent {
  constructor(
    public mainContractService: MainContractService,
    private _tonConnectService: TonConnectService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    AOS.init();
    this.mainContractService.useMainContract();
  }

  placeBet(): void {
    if (this._tonConnectService.tonConnectUI.connected) {
      this._tonConnectService.sendTransaction({
        value: toNano(1),
        to: Address.parse(this.mainContractService.contractAddress),
      });
    } else {
      this._snackBar.open('Wallet not connected', '', {
        verticalPosition: 'bottom',
        duration: 3000,
        panelClass: 'custom-snackbar',
      });
    }
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(GameInfoDialogComponent, {
      width: '868px',
    });

    dialogRef.componentInstance.fee = this.mainContractService.feePercent;
  }

  qrCodeDialog(): void {
    this.dialog.open(QrCodeDialogComponent, {
      width: '380px',
    });
  }

  identify(index: number): number {
    return index;
  }

  copyMessage(): void {
    this._snackBar.open('Address is copied to clipboard', '', {
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: 'custom-snackbar',
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

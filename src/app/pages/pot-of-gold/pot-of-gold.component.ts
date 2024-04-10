import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QrCodeDialogComponent } from '../../qr-code-dialog/qr-code-dialog.component';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MainContractService } from '../../services/main-contract.service';
import { TonConnectService } from '../../ton-connect.service';
import { MatDialog } from '@angular/material/dialog';
import AOS from 'aos';
import { Address, toNano } from '@ton/core';
import { GameInfoDialogComponent } from '../../game-info-dialog/game-info-dialog.component';
import { PlayersInRoundComponent } from '../../players-in-round/players-in-round.component';
import { SocialIconsComponent } from '../../social-icons/social-icons.component';
import { RewardComponent } from '../../reward/reward.component';
import { PlayerComponent } from '../../player/player.component';
import { FormsModule } from '@angular/forms';
import { SetBetComponent } from '../../set-bet/set-bet.component';

@Component({
  selector: 'app-pot-of-gold',
  standalone: true,
  imports: [
    CommonModule,
    QrCodeDialogComponent,
    NgIconComponent,
    PlayerComponent,
    MatSnackBarModule,
    GameInfoDialogComponent,
    SocialIconsComponent,
    RewardComponent,
    PlayersInRoundComponent,
    FormsModule,
    SetBetComponent,
  ],
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
  templateUrl: './pot-of-gold.component.html',
  styleUrl: './pot-of-gold.component.scss',
})
export class PotOfGoldComponent {
  betAmount: number = 1;

  constructor(
    public mainContractService: MainContractService,
    private _tonConnectService: TonConnectService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    AOS.init({ once: true });
    this.mainContractService.useMainContract();
  }

  placeBet(): void {
    if (this._tonConnectService.tonConnectUI.connected) {
      this._tonConnectService.sendTransaction({
        value: toNano(this.betAmount),
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

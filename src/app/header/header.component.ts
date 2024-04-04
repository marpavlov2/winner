import { Component } from '@angular/core';
import { THEME, TonConnectUI } from '@tonconnect/ui';
import { heroTrophy } from '@ng-icons/heroicons/outline';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoDialogComponent } from '../game-info-dialog/game-info-dialog.component';
import { MainContractService } from '../services/main-contract.service';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, GameInfoDialogComponent, LottieComponent],
  providers: [
    provideIcons({
      heroTrophy,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  options: AnimationOptions = {
    path: '/assets/earnplaying.json',
  };

  constructor(
    public dialog: MatDialog,
    public mainContractService: MainContractService
  ) {}

  async ngAfterViewInit() {
    const tonConnectUI = new TonConnectUI({
      manifestUrl:
        'https://raw.githubusercontent.com/marpavlov2/winner/master/tonconnect-manifest.json',
      buttonRootId: 'ton-wallet-button',
    });

    tonConnectUI.uiOptions = {
      language: 'en',
      uiPreferences: {
        theme: THEME.DARK,
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: '#4ade80',
            },
          },
        },
      },
    };
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(GameInfoDialogComponent, {
      width: '868px',
      panelClass: 'custom-dialog',
    });

    dialogRef.componentInstance.fee = this.mainContractService.feePercent;
  }
}

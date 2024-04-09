import { Component } from '@angular/core';
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
import { TonConnectService } from '../ton-connect.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterModule,
    GameInfoDialogComponent,
    LottieComponent,
  ],
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
    private _tonConnectService: TonConnectService,
    public mainContractService: MainContractService
  ) {}

  async ngAfterViewInit() {
    this._tonConnectService.initializeTonConnectUI();
  }

  openInfoDialog(): void {
    const dialogRef = this.dialog.open(GameInfoDialogComponent, {
      width: '1068px',
    });

    dialogRef.componentInstance.fee = this.mainContractService.feePercent;
  }
}

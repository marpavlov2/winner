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
import { heroQrCode } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    QrCodeDialogComponent,
    NgIconComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideIcons({ heroQrCode }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class AppComponent {
  title = 'jackpot-frontend';
  isDialogVisible = false;

  toggleDialog() {
    this.isDialogVisible = !this.isDialogVisible;
  }

  constructor(public mainContractService: MainContractService) {}

  async ngOnInit() {
    this.mainContractService.useMainContract();
  }
}

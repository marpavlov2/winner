import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { THEME, TonConnectUI } from '@tonconnect/ui';
import { MainContractService } from './services/main-contract.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'jackpot-frontend';

  constructor(public mainContractService: MainContractService) {}

  async ngOnInit() {
    this.mainContractService.useMainContract();
  }

  async ngAfterViewInit() {
    //TODO: change manifestURL
    const tonConnectUI = new TonConnectUI({
      manifestUrl: 'http://localhost:4200/tonconnect-manifest.json',
      buttonRootId: 'ton-wallet-button',
    });

    tonConnectUI.uiOptions = {
      language: 'en',
      uiPreferences: {
        theme: THEME.DARK,
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: '#75c4ee',
            },
          },
        },
      },
    };

    const walletsList = await tonConnectUI.getWallets();
    console.log(walletsList);

    console.log(tonConnectUI.modalState);
  }
}

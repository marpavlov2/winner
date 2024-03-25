import { Component } from '@angular/core';
import { THEME, TonConnectUI } from '@tonconnect/ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
              background: '#75c4ee',
            },
          },
        },
      },
    };
  }
}

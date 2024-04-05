import { Injectable } from '@angular/core';
import { Sender, SenderArguments } from '@ton/core';
import { THEME, TonConnectUI } from '@tonconnect/ui';

@Injectable({
  providedIn: 'root',
})
export class TonConnectService {
  tonConnectUI: TonConnectUI;
  sender: Sender;
  connected: boolean;

  constructor() {}

  initializeTonConnectUI() {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl:
        'https://raw.githubusercontent.com/earnplayingorg/potofgold/main/tonconnect-manifest.json',
      buttonRootId: 'ton-wallet-button',
    });

    this.tonConnectUI.uiOptions = {
      language: 'en',
      uiPreferences: {
        theme: THEME.DARK,
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: '#4ade80',
              foreground: '#000a1e',
            },
          },
        },
      },
    };
  }

  async getSender() {
    this.sender = {
      send: async (args: SenderArguments) => {
        await this.tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    };
    this.connected = this.tonConnectUI.connected;
  }

  async sendTransaction(args: SenderArguments) {
    try {
      await this.tonConnectUI.sendTransaction({
        messages: [
          {
            address: args.to.toString(),
            amount: args.value.toString(),
            payload: args.body?.toBoc().toString('base64'),
          },
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      });

      console.log('Transaction sent successfully.');
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }
}

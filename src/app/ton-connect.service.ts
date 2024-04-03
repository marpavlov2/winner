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
    console.log(this.sender);
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

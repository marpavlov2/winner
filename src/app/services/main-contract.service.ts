import { Injectable } from '@angular/core';
import { Address, OpenedContract, TonClient } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { MainContract } from '../../wrappers/MainContract';

@Injectable({
  providedIn: 'root',
})
export class MainContractService {
  contractAddress = 'EQA4QN9z54gwFoFZRLkFRsbkp2d9xNUz_b8zM5FUbitj7Slz';
  feePercent: number;
  betMin: string;
  playersMax: number;
  playersCurrent: number;
  lockedBalance: string;

  isDialogVisible: boolean;

  constructor() {}

  async useMainContract() {
    const client = await this.useTonClient();

    if (!client) return;

    const contract = new MainContract(
      Address.parse(this.contractAddress) // replace with your address from tutorial 2 step 8
    );

    const mainContract = client.open(contract) as OpenedContract<MainContract>;
    console.log(
      await client.getTransactions(
        Address.parse('EQA4QN9z54gwFoFZRLkFRsbkp2d9xNUz_b8zM5FUbitj7Slz'),
        { limit: 10 }
      ),
      'transactions'
    );
    // Fetch all contract data concurrently
    const [feePercent, betMin, playersMax, playersCurrent, lockedBalance] =
      await Promise.all([
        mainContract.getFeePercent(),
        mainContract.getBetMin(),
        mainContract.getPlayersMax(),
        mainContract.getPlayersCurrent(),
        mainContract.getLockedBalance(),
      ]);

    // Assign fetched data to class properties
    this.feePercent = feePercent;
    this.betMin = betMin;
    this.playersMax = playersMax;
    this.playersCurrent = playersCurrent;
    this.lockedBalance = lockedBalance;
  }

  async useTonClient(): Promise<TonClient> {
    // get the decentralized RPC endpoint
    const endpoint = await getHttpEndpoint({
      network: 'testnet',
    });

    // initialize ton library
    return new TonClient({ endpoint });
  }
}

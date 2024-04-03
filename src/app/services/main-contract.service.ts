import { Injectable } from '@angular/core';
import {
  Address,
  OpenedContract,
  SenderArguments,
  TonClient4,
  fromNano,
  toNano,
} from '@ton/ton';
import { getHttpV4Endpoint } from '@orbs-network/ton-access';
import { MainContract } from '../../wrappers/MainContract';
import { THEME, TonConnectUI } from '@tonconnect/ui';
import { TonConnectService } from '../ton-connect.service';
import { Player } from '../player.model';

@Injectable({
  providedIn: 'root',
})
export class MainContractService {
  contractAddress = 'EQDUrOIt7J2-wXkizz42NTuW4Z8Rd3Y25EXDENIJpr9M8VBa';
  feePercent: number;
  betMin: string;
  betMax: string;
  playersMax: number;
  playersCurrent: number;
  lockedBalance: string;
  closestTicket: number;
  transactions: any;
  currentRound: Player[] = [];
  lastRound: Player[] = [];
  winner: Player | undefined;

  isDialogVisible: boolean;

  constructor(private _tonService: TonConnectService) {}

  async useMainContract() {
    const client = await this.useTonClient();

    if (!client) return;

    const contract = new MainContract(
      Address.parse(this.contractAddress) // replace with your address from tutorial 2 step 8
    );

    const mainContract = client.open(contract) as OpenedContract<MainContract>;
    // Fetch all contract data concurrently
    const [
      feePercent,
      betMin,
      betMax,
      playersMax,
      playersCurrent,
      lockedBalance,
      closestTicket,
      currentRound,
      lastRound,
    ] = await Promise.all([
      mainContract.getFeePercent(),
      mainContract.getBetMin(),
      mainContract.getBetMax(),
      mainContract.getPlayersMax(),
      mainContract.getPlayersCurrent(),
      mainContract.getLockedBalance(),
      mainContract.getLuckyTicket(),
      mainContract.getCurrentRound(),
      mainContract.getLastRound(),
    ]);

    /* mainContract.sendWithdrawalRequest(
      this._tonService.sender,
      toNano('0.05'),
      toNano('0.05')
    ); */

    /* mainContract.sendNewBetMinRequest(
      this._tonService.sender,
      toNano('0.05'),
      toNano('1')
    ); */

    // Assign fetched data to class properties
    this.feePercent = feePercent;
    this.betMin = betMin;
    this.betMax = betMax;
    this.playersMax = playersMax;
    this.playersCurrent = playersCurrent;
    this.lockedBalance = lockedBalance;
    this.closestTicket = closestTicket;
    this.currentRound = currentRound;
    this.lastRound = lastRound;

    this.findWinner(lastRound);
  }

  findWinner(players: Player[]) {
    this.winner = players.find((player) => player.isWinner === 1);
    this.lastRound = players.filter((player) => player.id !== this.winner!.id);
    /*  if (winner) {
      this.lastRound = players.filter((player) => player.id !== winner.id);
      this.winner = this.lastRound.find(
        (player) =>
          player.startTicket === winner.startTicket &&
          player.endTicket === winner.endTicket
      );
      console.log(this.lastRound, 'lastRound');

      this.winner!.isWinner = 1;

      console.log(this.winner, 'winner');
    } */
  }

  async useTonClient(): Promise<TonClient4> {
    // get the decentralized RPC endpoint
    const endpoint = await getHttpV4Endpoint({
      network: 'testnet',
    });

    // initialize ton library
    return new TonClient4({ endpoint });
  }
}

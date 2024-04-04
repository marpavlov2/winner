import { Injectable } from '@angular/core';
import { Address, OpenedContract, TonClient4, toNano } from '@ton/ton';
import { getHttpV4Endpoint } from '@orbs-network/ton-access';
import { MainContract } from '../../wrappers/MainContract';
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
  mainContract: OpenedContract<MainContract>;

  constructor(private _tonService: TonConnectService) {}

  async useMainContract() {
    const client = await this.useTonClient();

    if (!client) return;

    const contract = new MainContract(
      Address.parse(this.contractAddress) // replace with your address from tutorial 2 step 8
    );

    this.mainContract = client.open(contract) as OpenedContract<MainContract>;
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
      this.mainContract.getFeePercent(),
      this.mainContract.getBetMin(),
      this.mainContract.getBetMax(),
      this.mainContract.getPlayersMax(),
      this.mainContract.getPlayersCurrent(),
      this.mainContract.getLockedBalance(),
      this.mainContract.getLuckyTicket(),
      this.mainContract.getCurrentRound(),
      this.mainContract.getLastRound(),
    ]);

    this.feePercent = feePercent;
    this.betMin = betMin;
    this.betMax = betMax;
    this.playersMax = playersMax;
    this.playersCurrent = playersCurrent;
    this.lockedBalance = lockedBalance;
    this.closestTicket = Math.ceil(Number(closestTicket) / 1000);
    this.currentRound = currentRound;
    this.lastRound = lastRound;

    this.findWinner(lastRound);

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

    /* this.mainContract.sendNewBetPlayersMaxRequest(
      this._tonService.sender,
      toNano('0.05'),
      10
    ); */

    setInterval(() => {
      this.refreshData();
    }, 2000);
  }

  async refreshData() {
    const [
      playersCurrent,
      lockedBalance,
      closestTicket,
      currentRound,
      lastRound,
    ] = await Promise.all([
      this.mainContract.getPlayersCurrent(),
      this.mainContract.getLockedBalance(),
      this.mainContract.getLuckyTicket(),
      this.mainContract.getCurrentRound(),
      this.mainContract.getLastRound(),
    ]);

    this.playersCurrent = playersCurrent;
    this.lockedBalance = lockedBalance;
    this.closestTicket = Math.ceil(Number(closestTicket) / 1000);
    this.currentRound = currentRound;
    this.lastRound = lastRound;

    this.findWinner(lastRound);
  }

  findWinner(players: Player[]) {
    this.winner = players.find((player) => player.isWinner === 1);
    this.lastRound = players.filter((player) => player.id !== this.winner!.id);
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

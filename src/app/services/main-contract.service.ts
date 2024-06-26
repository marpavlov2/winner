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
  contractAddress = 'EQCgcmiMffDhYuf3dvGheCLahpin49eLSIa9AtIdOWbcr55T';
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
  lastTicketCurrentRound: number = 0;
  lastTicketLastRound: number = 0;

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
    this.refreshData();

    setTimeout(() => {
      setInterval(() => {
        this.refreshData();
      }, 5000);
    }, 3000);

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
  }

  async refreshData() {
    try {
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

      if (this.currentRound.length) {
        this.getPercentagesCurrentRound();
      }

      if (this.lastRound.length) {
        this.getPercentagesLastRound();

        this.findWinner(this.lastRound);
      }
    } catch (error) {
      this.refreshData();
    }
  }

  findWinner(players: Player[]): void {
    this.winner = players.find((player) => player.isWinner === 1);
    this.lastRound = players.filter((player) => player.id !== this.winner!.id);
  }

  getPercentagesCurrentRound(): void {
    this.lastTicketCurrentRound = this.currentRound[0].endTicket;
    this.currentRound = this.currentRound.map((player) => {
      return {
        ...player,
        percentage: parseFloat(
          (
            ((player.endTicket - player.startTicket + 1) /
              this.lastTicketCurrentRound) *
            100
          ).toFixed(2)
        ),
      };
    });
  }

  getPercentagesLastRound(): void {
    this.lastTicketLastRound = this.lastRound[1].endTicket;
    this.lastRound = this.lastRound.map((player) => {
      return {
        ...player,
        percentage: parseFloat(
          (
            ((player.endTicket - player.startTicket + 1) /
              this.lastTicketLastRound) *
            100
          ).toFixed(2)
        ),
      };
    });
  }

  async useTonClient(): Promise<TonClient4> {
    // get the decentralized RPC endpoint
    const endpoint = await getHttpV4Endpoint();

    // initialize ton library
    return new TonClient4({ endpoint });
  }
}

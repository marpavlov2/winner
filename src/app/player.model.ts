import { IPlayer } from './player.interface';

export class Player {
  id: string;
  address: string;
  startTicket: bigint;
  endTicket: bigint;
  bet: string;
  isWinner: number;

  constructor(query: IPlayer) {
    this.id = query.id.toString();
    this.address = query.address;
    this.startTicket = query.startTicket;
    this.endTicket = query.endTicket;
    this.bet = query.bet;
    this.isWinner = query.isWinner;
  }
}

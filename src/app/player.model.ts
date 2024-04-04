import { IPlayer } from './player.interface';

export class Player {
  id: string;
  address: string;
  startTicket: number;
  endTicket: number;
  bet: string;
  isWinner: number;

  constructor(query: IPlayer) {
    this.id = query.id.toString();
    this.address = query.address;
    this.startTicket = Math.ceil(Number(query.startTicket) / 1000);
    this.endTicket = Math.ceil(Number(query.endTicket) / 1000);
    this.bet = query.bet;
    this.isWinner = query.isWinner;
  }
}

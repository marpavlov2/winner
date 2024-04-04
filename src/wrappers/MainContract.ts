import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  fromNano,
  Sender,
  SendMode,
} from '@ton/core';
import { uid } from 'uid';
import { Player } from '../app/player.model';

export type MainContractConfig = {
  number: number;
  address: Address;
  owner_address: Address;
};

export function mainContractConfigToCell(config: MainContractConfig): Cell {
  return beginCell()
    .storeUint(config.number, 32)
    .storeAddress(config.address)
    .storeAddress(config.owner_address)
    .endCell();
}

export class MainContract implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromConfig(
    config: MainContractConfig,
    code: Cell,
    workchain = 0
  ) {
    const data = mainContractConfigToCell(config);
    const init = { code, data };
    const address = contractAddress(workchain, init);

    return new MainContract(address, init);
  }

  async getFeePercent(provider: ContractProvider) {
    const { stack } = await provider.get('get_fee_percent', []);

    return stack.readNumber();
  }

  async getBetMin(provider: ContractProvider) {
    const { stack } = await provider.get('get_bet_min', []);

    return fromNano(stack.readNumber());
  }

  async getBetMax(provider: ContractProvider) {
    const { stack } = await provider.get('get_bet_max', []);

    return fromNano(stack.readNumber());
  }

  async getPlayersMax(provider: ContractProvider) {
    const { stack } = await provider.get('get_players_max', []);

    return stack.readNumber();
  }

  async getPlayersCurrent(provider: ContractProvider) {
    const { stack } = await provider.get('get_players_current', []);

    return stack.readNumber();
  }

  async getLockedBalance(provider: ContractProvider) {
    const { stack } = await provider.get('get_locked_balance', []);

    return fromNano(stack.readNumber());
  }

  async getContractBalance(provider: ContractProvider) {
    const { stack } = await provider.get('get_contract_balance', []);

    return fromNano(stack.readNumber());
  }

  async getLuckyTicket(provider: ContractProvider) {
    const { stack } = await provider.get('get_lucky_ticket', []);

    return stack.readNumber();
  }

  async getCurrentRound(provider: ContractProvider): Promise<any[]> {
    const result = (await provider.get('get_players_list_current_round', []))
      .stack;

    let players: any[] = [];
    let record = result.readTuple();
    while (record.remaining) {
      let record2 = record.readTuple();
      players.push(
        new Player({
          id: uid(16),
          address: Address.normalize(record2.readAddress()),
          startTicket: record2.readBigNumber(),
          endTicket: record2.readBigNumber(),
          bet: fromNano(record2.readBigNumber()),
          isWinner: 0,
        })
      );
    }
    return players.reverse();
  }

  async getLastRound(provider: ContractProvider): Promise<Player[]> {
    const result = (await provider.get('get_players_list_last_round', []))
      .stack;

    let players: Player[] = [];
    let record = result.readTuple();
    while (record.remaining) {
      let record2 = record.readTuple();
      players.push(
        new Player({
          id: uid(16),
          address: Address.normalize(record2.readAddress()),
          startTicket: record2.readBigNumber(),
          endTicket: record2.readBigNumber(),
          bet: fromNano(record2.readBigNumber()),
          isWinner: record2.readNumber(),
        })
      );
    }

    return players.reverse();
  }

  async sendWithdrawalRequest(
    provider: ContractProvider,
    sender: Sender,
    value: bigint,
    amount: bigint
  ) {
    const msg_body = beginCell()
      .storeUint(204, 32) // OP code
      .storeCoins(amount)
      .endCell();

    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: msg_body,
    });
  }

  async sendNewBetMinRequest(
    provider: ContractProvider,
    sender: Sender,
    value: bigint,
    amount: bigint
  ) {
    const msg_body = beginCell()
      .storeUint(202, 32) // OP code
      .storeCoins(amount)
      .endCell();

    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: msg_body,
    });
  }

  // 202 Players Max
  async sendNewBetPlayersMaxRequest(
    provider: ContractProvider,
    sender: Sender,
    value: bigint,
    amount: number
  ) {
    const msg_body = beginCell()
      .storeUint(202, 32) // OP code
      .storeCoins(value)
      .storeInt(amount, 8)
      .endCell();

    await provider.internal(sender, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: msg_body,
    });
  }
}

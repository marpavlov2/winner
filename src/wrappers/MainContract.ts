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
}

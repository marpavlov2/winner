import { Injectable } from '@angular/core';
import { Address, OpenedContract, TonClient } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { MainContract } from '../../wrappers/MainContract';

@Injectable({
  providedIn: 'root',
})
export class MainContractService {
  recent_sender: Address;
  owner_address: Address;
  counter_value: number = 0;
  contract_address: string;

  constructor() {}

  async useMainContract() {
    const client = await this.useTonClient();

    if (!client) return;

    const contract = new MainContract(
      Address.parse('0QDjFnHzpusPk-RtkxkHFdmZcEyTwhiQ1T0OvvyN-vBBnWBj') // replace with your address from tutorial 2 step 8
    );

    const mainContract = client.open(contract) as OpenedContract<MainContract>;

    if (!mainContract) return;

    const val = await mainContract.getData();
    (this.counter_value = val.number),
      (this.recent_sender = val.recent_sender),
      (this.owner_address = val.owner_address);

    const contract_address = mainContract.address.toString();
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

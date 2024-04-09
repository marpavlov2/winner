import { Component } from '@angular/core';
import { TonConnectService } from '../ton-connect.service';
import { Address, toNano } from '@ton/core';
import { MainContractService } from '../services/main-contract.service';
import { NgIconComponent } from '@ng-icons/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-bet',
  standalone: true,
  imports: [NgIconComponent, SetBetComponent, MatSnackBarModule, FormsModule],
  templateUrl: './set-bet.component.html',
  styleUrl: './set-bet.component.scss',
})
export class SetBetComponent {
  betAmount: number = 1;

  constructor(
    private _tonConnectService: TonConnectService,
    private mainContractService: MainContractService,
    private _snackBar: MatSnackBar
  ) {}

  increaseBet() {
    this.betAmount++;
  }

  decreaseBet() {
    this.betAmount--;
  }

  placeBet(): void {
    if (this._tonConnectService.tonConnectUI.connected) {
      this._tonConnectService.sendTransaction({
        value: toNano(this.betAmount),
        to: Address.parse(this.mainContractService.contractAddress),
      });
    } else {
      this._snackBar.open('Wallet not connected', '', {
        verticalPosition: 'bottom',
        duration: 3000,
        panelClass: 'custom-snackbar',
      });
    }
  }
}

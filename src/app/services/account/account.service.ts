import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import accountData from '../../data/account/accountData';
import { IAccount } from '../../models/account/IAccount';
import { LedgerTransactionType } from '../../models/ledger/ledger-transaction-type.enum';
import { ErrorService } from '../error/error.service';
import { InformationService } from '../information/information.service';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private errorService: ErrorService,
    private informationService: InformationService,
    private http: HttpClient
  ) {}

  get(): Observable<{ data: IAccount }> {
    return this.http.get<{ data: IAccount }>(`${config.apiUrl}/user`);
  }

  set(amount: number) {
    accountData.accountBalance = amount;
  }

  compute(amount: number, type: LedgerTransactionType) {
    let computedBalance: number = 0;

    this.get()
      .subscribe((info) => {
        switch (type) {
          case LedgerTransactionType.PurchaseToken:
            computedBalance = info.data.accountBalance + amount;
            this.set(computedBalance);

            this.informationService.handle(
              `${amount} Tokens have been successfully added to your account`
            );

            break;
          case LedgerTransactionType.SpendTokens:
            computedBalance = info.data.accountBalance - amount;

            if (computedBalance < 0) {
              return this.errorService.handle(
                'Not enough tokens on the account'
              );
            }

            this.set(computedBalance);

            break;
          default:
            break;
        }
      })
      .unsubscribe();
  }
}

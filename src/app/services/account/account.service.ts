import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pairwise, Subject } from 'rxjs';
// import accountData from '../../data/account/accountData';
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
  private accountData: Subject<{ data: IAccount }> = new Subject();
  private accountDataCached: Subject<{ data: IAccount }>;

  constructor(
    private errorService: ErrorService,
    private informationService: InformationService,
    private http: HttpClient
  ) {
    this.initializeData();
  }

  refreshData() {
    this.http
      .get<{ data: IAccount[] }>(`${config.apiUrl}/user`)
      .subscribe((res: any) => {
        this.accountDataCached.next(res);
      });
  }

  initializeData() {
    if (!this.accountDataCached) {
      this.accountDataCached = new Subject();
      this.refreshData();
    }
  }

  get(): Observable<{ data: IAccount }> {
    this.accountDataCached.subscribe((data) => {
      this.accountData.next(data);
    });

    return this.accountData;
  }

  set(amount: number) {
    this.accountDataCached.next({
      data: {
        accountBalance: amount,
      },
    });
  }

  compute(amount: number, type: LedgerTransactionType) {
    let computedBalance: number = 0;

    switch (type) {
      case LedgerTransactionType.PurchaseToken:
        computedBalance = 0 + amount;
        this.set(computedBalance);

        this.informationService.handle(
          `${amount} Tokens have been successfully added to your account`
        );

        break;
      case LedgerTransactionType.SpendTokens:
        computedBalance = 0 - amount;

        if (computedBalance < 0) {
          return this.errorService.handle('Not enough tokens on the account');
        }

        this.set(computedBalance);

        break;
      default:
        break;
    }
  }
}

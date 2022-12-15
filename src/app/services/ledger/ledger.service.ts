import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config } from '../../config/config';
import { IGame } from '../../models/games/IGame';
import { ILedger } from '../../models/ledger/ILedger';
import { LedgerTransactionType } from '../../models/ledger/ledger-transaction-type.enum';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerStoreService {
  private ledger: ILedger[] = [];
  private cachedLedgerData: Subject<{ data: ILedger[] }>;

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {
    this.initializeData();
  }

  refreshData() {
    this.http
      .get<{ data: ILedger[] }>(`${config.apiUrl}/ledger`)
      .subscribe((res: any) => this.cachedLedgerData.next(res));
  }

  initializeData() {
    if (!this.cachedLedgerData) {
      this.cachedLedgerData = new Subject();
      this.refreshData();
    }
  }

  add(record: ILedger | ILedger[]) {
    if (Array.isArray(record)) {
      this.ledger.push(...record);
    } else {
      this.ledger.push(record);
    }
  }

  getAll(): ILedger[] {
    this.cachedLedgerData.subscribe((data) => {
      this.ledger = data.data;
    });
    return this.ledger;
  }

  clear() {
    this.ledger = [];
  }

  factory(
    transactionType: LedgerTransactionType,
    record: IGame | number
  ): ILedger {
    const id = this.ledger.length
      ? this.ledger[this.ledger.length - 1].id + 1
      : 1;
    let amount = typeof record == 'number' ? record : record.price;
    let accountBalance = 0;
    let title = '';

    this.accountService.get().subscribe((info) => {
      accountBalance = info.data.accountBalance;
    });

    switch (transactionType) {
      case LedgerTransactionType.PurchaseToken:
        title = `Purchased ${amount} tokens`;
        accountBalance += amount;
        break;
      case LedgerTransactionType.SpendTokens:
        title = `Spend ${amount} tokens ${
          typeof record !== 'number' && 'to ' + record.title
        }`;
        accountBalance -= amount;
        break;
      default:
        break;
    }

    return {
      id,
      title,
      amount,
      transactionType,
      date: new Date(),
      accountBalance,
    };
  }
}

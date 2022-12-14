import { Component, OnInit } from '@angular/core';
import { LedgerTransactionType } from '../../../models/ledger/ledger-transaction-type.enum';
import { AccountService } from '../../../services/account/account.service';
import { LedgerStoreService } from '../../../services/ledger/ledger.service';

@Component({
  selector: 'token-pricing',
  templateUrl: './token-pricing.component.html',
  styleUrls: ['./token-pricing.component.css'],
})
export class TokenPricingComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private ledgerService: LedgerStoreService
  ) {}

  ngOnInit() {}

  purchaseTokens(amount: number) {
    this.accountService.compute(amount, LedgerTransactionType.PurchaseToken);

    this.ledgerService.add(
      this.ledgerService.factory(LedgerTransactionType.PurchaseToken, amount)
    );
  }
}

import { Component } from '@angular/core';
import { LedgerStoreService } from '../../services/ledger/ledger.service';

@Component({
  selector: 'ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
})
export class LedgerComponent {
  constructor(private ledgerService: LedgerStoreService) {}

  getLedgerRecords() {
    return this.ledgerService.getAll();
  }
}

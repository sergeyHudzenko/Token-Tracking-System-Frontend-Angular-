import { Component, OnInit } from '@angular/core';
// import ledgerData from './data/ledger/ledgerData';
// import { LedgerStoreService } from './services/ledger/ledger.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // constructor(private ledgerService: LedgerStoreService) {}

  ngOnInit() {
    // this.ledgerService.add(ledgerData);
  }
}

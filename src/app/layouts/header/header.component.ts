import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAccount } from '../../models/account/IAccount';
import { AccountService } from '../../services/account/account.service';
import { SearchProviderService } from '../../services/search/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  account$: Observable<IAccount>;
  tokenObservable = new BehaviorSubject<boolean>(true);
  searchValue: string = '';

  constructor(
    public searchService: SearchProviderService,
    private accountService: AccountService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getAccountBalance();
  }

  setQuery(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value.trim();
    this.searchService.setQuery(this.searchValue);
  }

  getAccountBalance() {
    this.account$ = this.accountService.get();
  }
}

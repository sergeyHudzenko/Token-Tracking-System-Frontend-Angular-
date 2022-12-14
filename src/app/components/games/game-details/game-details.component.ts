import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGame } from '../../../models/games/IGame';
import { LedgerTransactionType } from '../../../models/ledger/ledger-transaction-type.enum';
import { AccountService } from '../../../services/account/account.service';
import { GamesService } from '../../../services/games/games.service';
import { LedgerStoreService } from '../../../services/ledger/ledger.service';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent {
  game: IGame;
  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
    private ledgerService: LedgerStoreService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.gamesService.getGame(id).subscribe((data) => {
        this.game = data;
      });
    }
  }

  payForGame() {
    this.accountService.compute(this.game.price, LedgerTransactionType.SpendTokens);
    this.addToLedgerTable();
  }

  addToLedgerTable() {
    this.ledgerService.add(
      this.ledgerService.factory(LedgerTransactionType.SpendTokens, this.game)
    );
  }
}

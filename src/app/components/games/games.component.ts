import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '../../models/games/IGame';
import { GamesService } from '../../services/games/games.service';
import { SearchProviderService } from '../../services/search/search.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  // games: IGame[] = [];
  games$: Observable<IGame[]>;

  constructor(
    private gamesService: GamesService,
    public searchService: SearchProviderService
  ) {}

  ngOnInit(): void {
    console.log(this.gamesService.getAll());
    this.games$ = this.gamesService.getAll();
    // this.gamesService.getAll().subscribe((games) => {
    //   this.games = games;
    // });
  }
}

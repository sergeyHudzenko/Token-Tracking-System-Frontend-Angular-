import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../../config/config';
import gamesData from '../../data/games/gamesData';
import { IGame } from '../../models/games/IGame';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IGame[]> {
    return this.http.get<IGame[]>(`${config.apiUrl}/games`);
  }

  getGame(id: number): Observable<IGame> {
    // const gameData: IGame = gamesData.filter((data) => data.id === id)[0];
    // return new BehaviorSubject<IGame>(gameData).asObservable();
    return this.http.get<IGame>(`${config.apiUrl}/games/${id}`);
  }
}

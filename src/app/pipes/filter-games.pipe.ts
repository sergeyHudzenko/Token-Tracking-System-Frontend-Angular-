import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from '../models/games/IGame';

@Pipe({
  name: 'filterGames',
})
export class FilterGamesPipe implements PipeTransform {
  transform(games: IGame[], search: string) {
    if (!games) {
      return [];
    }
    if (!search) {
      return games;
    }

    return games.filter((g) =>
      g.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}

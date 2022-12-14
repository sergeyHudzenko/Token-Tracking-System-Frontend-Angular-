import { Component, Input } from '@angular/core';
import { IGame } from '../../../models/games/IGame';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game: IGame;
}

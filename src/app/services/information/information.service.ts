import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  infoMessage$ = new Subject<string>();

  constructor() {}

  handle(infoMessage: string) {
    this.infoMessage$.next(infoMessage);

    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.infoMessage$.next('');
  }
}

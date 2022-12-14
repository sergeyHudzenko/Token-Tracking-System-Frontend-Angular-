import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorMessage$ = new Subject<string>();

  constructor() {}

  handle(errorMessage: string) {
    this.errorMessage$.next(errorMessage);

    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.errorMessage$.next('');
  }
}

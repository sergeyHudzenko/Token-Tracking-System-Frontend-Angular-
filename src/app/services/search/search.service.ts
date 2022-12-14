import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchProviderService {
  private query: string = '';

  setQuery(q: string) {
    this.query = q;
  }

  getQuery(): string {
    return this.query;
  }

  clearQuery() {
    this.query = '';
    return this.query;
  }
}

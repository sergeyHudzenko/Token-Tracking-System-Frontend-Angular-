import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyTokensPageComponent } from './pages/buy-tokens-page/buy-tokens-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LedgerPageComponent } from './pages/ledger-page/ledger-page/ledger-page.component';
import { MainPageComponent } from './pages/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game/:id', component: GamePageComponent },
  { path: 'ledger', component: LedgerPageComponent },
  { path: 'buy-tokens', component: BuyTokensPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

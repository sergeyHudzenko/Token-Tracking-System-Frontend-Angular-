import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { GamesComponent } from './components/games/games.component';
import { GameCardComponent } from './components/games/game-card/game-card.component';
import { FilterGamesPipe } from './pipes/filter-games.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './pages/main-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { LedgerPageComponent } from './pages/ledger-page/ledger-page/ledger-page.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { ErrorComponent } from './components/error/error.component';
import { TokenPricingComponent } from './components/tokens/token-pricing/token-pricing.component';
import { BuyTokensPageComponent } from './pages/buy-tokens-page/buy-tokens-page.component';
import { InformationComponent } from './components/information/information.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterGamesPipe,
    MainPageComponent,
    // Game Components
    GamesComponent,
    GameCardComponent,
    GamePageComponent,
    GameDetailsComponent,
    // Ledger Components
    LedgerPageComponent,
    LedgerComponent,
    // Error
    ErrorComponent,
    // Information
    InformationComponent,
    // Token Components
    TokenPricingComponent,
    BuyTokensPageComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

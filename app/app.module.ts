import "./rxjs-extensions";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {HeroService} from "./services/hero.service";
import {HeroesComponent} from "./hero/heroes.component";
import {HeroDetailsComponent} from "./hero/hero-details.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./services/in-memory-data.service";
import {SearchHeroService} from "./services/search-hero.service";
import {SearchHeroComponent} from "./hero/search-hero.component";
import {AppRoutingModule} from "./app.routing.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailsComponent,
    HeroesComponent,
    SearchHeroComponent
  ],
  providers: [
    HeroService,
    SearchHeroService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

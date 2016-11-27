import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HeroesComponent} from "./hero/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailsComponent} from "./hero/hero-details.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

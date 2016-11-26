import {Component, OnInit} from "@angular/core";
import {HeroService} from "../services/hero.service";
import {Hero} from "../models/hero";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(0, 4));
  }

  goHeroDetails(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}

import {Component, OnInit} from "@angular/core";
import {HeroService} from "../services/hero.service";
import {Hero} from "../models/hero";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

  onSelectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

  viewDetails(): void {
    this.router.navigate(['/heroes', this.selectedHero.id]);
  }
}

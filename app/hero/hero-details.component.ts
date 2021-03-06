import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Hero} from "../models/hero";
import {HeroService} from "../services/hero.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'hero-details',
  templateUrl: 'hero-details.component.html',
  styleUrls: ['hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

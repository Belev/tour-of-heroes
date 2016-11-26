import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {SearchHeroService} from "../services/search-hero.service";
import {Hero} from "../models/hero";

@Component({
  moduleId: module.id,
  selector: 'search-hero',
  templateUrl: 'search-hero.component.html',
  styleUrls: ['search-hero.component.css']
})
export class SearchHeroComponent implements OnInit {
  private searchTerms = new Subject<string>();

  heroes: Observable<Hero[]>;

  constructor(
    private heroSearchService: SearchHeroService,
    private router: Router) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  viewDetails(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}

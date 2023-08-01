import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, delay, distinctUntilChanged, map, of, startWith, switchMap, tap } from 'rxjs';
import { PaginatedPokemon, Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

interface IPagination {
  page: number,
  pageCount: number,
  rows: number,
  totalRecords: number
}

interface IPage {
  page: number,
  pageCount: number,
  rows: number,
  totalRecords: number,
  key: string,
  list?: PaginatedPokemon,
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  initPaginator: IPagination = {
    page: 1, pageCount: 50, rows: 10, totalRecords: 50
  }

  vm$: Observable<IPage> = new Observable();
  // vm: any;
  page = 1;
  pageChanged$ = new Subject<IPagination>();
  query = new FormControl();

  listPokemon: Pokemon[] = [];

  constructor(
    private _servicePokemon: PokemonService
  ) { }

  ngOnInit(): void {
    const _pageChanged$ = this.pageChanged$.asObservable().pipe(
      startWith(this.initPaginator)
    );
    const _query$ = this.query.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith("")
    );
    combineLatest([_pageChanged$, _query$]).pipe(
      map(([obsPageChanged, obsQuery]) => {
        const res: IPage = {
          page: obsPageChanged.page,
          pageCount: obsPageChanged.pageCount,
          rows: obsPageChanged.rows,
          totalRecords: obsPageChanged.totalRecords,
          key: obsQuery
        }
        this.vm$ = of(res);
        return res
      }),
      switchMap(res => {
        let offset = res.page-1;
        let limit = res.rows;
        return this._servicePokemon.getPokemon(offset,limit)
      })
    ).subscribe(res => {
      console.log('get api');
      this.listPokemon = res.results;
    })
  }

  onPageChanged(event: any) {
    this.pageChanged$.next({
      page: event.page,
      pageCount: event.pageCount,
      rows: event.rows,
      totalRecords: event.totalRecords
    })
    // this.page = event;
  }


}

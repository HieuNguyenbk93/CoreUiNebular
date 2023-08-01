import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedPokemon, Pokemon } from '../models/pokemon.model';
import { Observable, Subject, map, tap } from 'rxjs';
import { getApiResponse } from '../ultils/operator-utils';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemon: Subject<Pokemon[]> = new Subject<Pokemon[]>;
  pokemon$: Observable<Pokemon[]> = this.pokemon.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getPokemon(offset: number, limit: number) {
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };
    return this.httpClient.get<PaginatedPokemon>("https://pokeapi.co/api/v2/pokemon", {params})
    // .pipe(
    //   tap(val => console.log(val)),
    //   map((result : PaginatedPokemon) => result.results)
    // )
  }
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PaginatedPokemon {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

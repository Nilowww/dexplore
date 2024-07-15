import type { IAbilityShort, IMovesShort, ISpeciesShort, ISprites } from "./pokemon";

export interface IPokemonShortGQLResponse {
  results: IPokemonShortResponse[];
  count: {
    aggregate: {
      count: number;
    };
  };
}

export interface IPokemonGQLResponse {
  results: IPokemonResponse[];
}

export interface IPokemonShortResponse {
    name: string,
    id: number,
    sprites: {
        sprites: ISprites
    }[]
    types: {
        type: {
            name: string;
        }
    }[]
}

export interface IPokemonResponse extends IPokemonShortResponse {
  base_experience: number;
  weight: number;
  abilities: IAbilityShort[];
  species: ISpeciesShort;
  moves: IMovesShort[];
}

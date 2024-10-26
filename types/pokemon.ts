export interface IList<T extends any> {
  count: number;
  results: T[];
}

export interface IPokemonShort {
  name: string;
  id: number;
  sprites: ISprites;
  types: string[]
}

export interface IPokemonSaved {
  id: number;
  user_id: string;
  pokemon_id: number;
}

export interface IPokemon extends IPokemonShort {
  base_experience: number;
  weight: number;
  abilities: IAbilityShort[];
  species: ISpeciesShort;
  moves: IMovesShort[];
  stats: IPokemonStat[];
}

export interface IAbilityShort {
  ability: {
    name: string;
  };
}

export interface ISpeciesShort {
  name: string;
}

export interface ISprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    "official-artwork" ?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
  versions: {
    'generation-v': {
      'black-white': {
        animated: {
          front_default: string | null;
          back_default: string | null;
        }
      }
    }
  }
}

export interface IMovesShort {
  move: {
    name: string;
  }
}

export interface ITypesShort {
  type: {
    name: string;
    url: string;
  }
}

export interface IPokemonStat {
  base_stat: number;
  stat: {
    name: string;
    id: number;
  }
}
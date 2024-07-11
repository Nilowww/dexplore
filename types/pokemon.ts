export interface IList<T extends any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IPokemonShort {
  name: string;
  url: string;
}

export interface IPokemon {
  name: string;
  id: number;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: IAbilityShort[];
  species: ISpeciesShort;
  moves: IMovesShort[];
  sprites: ISprites;
}

export interface IAbilityShort {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface ISpeciesShort {
  name: string;
  url: string;
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
}

export interface IMovesShort {
  move: {
    name: string;
  }
}

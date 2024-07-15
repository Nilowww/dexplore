import { IList, IPokemon, IPokemonShort } from "~/types/pokemon";
import { IPokemonGQLResponse } from "~/types/responses";
import { fetchGraphQL } from "~/utils/server";

function processResponse(object: IPokemonGQLResponse): IPokemon {
  const { sprites, types, ...rest } = object.results[0];

  const myObject: IPokemon = {
    ...rest,
    sprites: sprites[0].sprites,
    types: types.map((type) => type.type.name),
  };

  return myObject;
}

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const query = `query getPokemons($id: Int) {
  results: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
    name
    id
    sprites: pokemon_v2_pokemonsprites {
      sprites
    }
    base_experience
    weight
    abilities: pokemon_v2_pokemonabilities {
      ability: pokemon_v2_ability {
        name
      }
    }
    species: pokemon_v2_pokemonspecy {
      name
    }
    moves: pokemon_v2_pokemonmoves {
      move: pokemon_v2_move {
        name
      }
    }
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
      }
    }
  }
}
`;
  const response = (await fetchGraphQL(
    query,
    { id: params.id },
    "getPokemons"
  )) as IPokemonGQLResponse;
  return processResponse(response);
});

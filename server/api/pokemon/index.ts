import { IList, IPokemonShort } from "~/types/pokemon";
import { IPokemonShortGQLResponse } from "~/types/responses";
import { fetchGraphQL } from "~/utils/server";

function processResponse(object: IPokemonShortGQLResponse): IList<IPokemonShort> {
  const myObject:  IList<IPokemonShort> = {
    count: object.count.aggregate.count,
    results: object.results.map(pokemon => {
      const { sprites, types, ...rest } = pokemon;

      return {
        ...rest,
        sprites: sprites[0].sprites,
        types: types.map(type => type.type.name)
      }
    })
  };

  return myObject;
}

export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const query = `query getPokemons($offset: Int, $name: String = "%%") {
  count: pokemon_v2_pokemon_aggregate(where: {name: {_like: $name}}) {
    aggregate {
      count
    }
  }
  results: pokemon_v2_pokemon(limit: 20, offset: $offset, where: {name: {_like: $name}}) {
    name
    id
    sprites: pokemon_v2_pokemonsprites {
      sprites
    }
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
      }
    }
  }
}
`
  const response = await fetchGraphQL(query, { offset: params.offset, name: `%${params.name || ''}%` }, "getPokemons") as IPokemonShortGQLResponse;
  return processResponse(response);
});
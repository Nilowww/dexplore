import { IList, IPokemonShort } from "~/types/pokemon";
import { IPokemonShortGQLResponse } from "~/types/responses";
import { fetchGraphQL } from "~/utils/server";

function processResponse(
  object: IPokemonShortGQLResponse
): IList<IPokemonShort> {
  const myObject: IList<IPokemonShort> = {
    count: object.count.aggregate.count,
    results: object.results.map((pokemon) => {
      const { sprites, types, ...rest } = pokemon;

      return {
        ...rest,
        sprites: sprites[0].sprites,
        types: types.map((type) => type.type.name),
      };
    }),
  };

  return myObject;
}

const types = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ice",
  "dragon",
  "ghost",
  "steel",
  "dark",
]

export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const query = `query getPokemons($offset: Int, $name: String = "%%", $type: [String!]) {
    count: pokemon_v2_pokemon_aggregate(
      where: {
        name: {_like: $name},
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: {
            name: {_in: $type}
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    results: pokemon_v2_pokemon(
      limit: 20,
      offset: $offset,
      where: {
        name: {_like: $name},
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: {
            name: {_in: $type} 
          }
        }
      },
      order_by: {id: asc}
    ) {
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

  const response = (await fetchGraphQL(
    query,
    {
      offset: params.offset,
      name: `%${params.name || ""}%`,
      type: params.type ? (params.type as string).split(',') : types,
    },
    "getPokemons"
  )) as IPokemonShortGQLResponse;
  return processResponse(response);
});

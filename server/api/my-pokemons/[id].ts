import { serverSupabaseClient } from "#supabase/server";
import { ICustomPokemon } from "~/types/pokemon";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<{ pokemons: ICustomPokemon }>(
    event
  );
  const params = getRouterParams(event);

  const response = await client
    .from("pokemons")
    .select<"*", ICustomPokemon>()
    .eq("id", params.id);

  const pokemon = response.data ? response.data[0] : null;

  if (pokemon) {
    pokemon.abilities = pokemon.abilities.map((ability) => {
      return {
        ability: {
          name: ability as unknown as string,
        },
      };
    });
    pokemon.moves = pokemon.moves.map((move) => {
      return {
        move: {
          name: move as unknown as string,
        },
      };
    });
    pokemon.stats = pokemon.stats.map((base_stat, index) => {
      const statNames = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
      return {
        base_stat: base_stat as unknown as number,
        stat: {
          name: statNames[index],
          id: index + 1,
        },
      };
    });
  }

  
  const formattedResponse: ICustomPokemon | null = pokemon;
  return formattedResponse;
});

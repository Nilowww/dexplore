import { serverSupabaseClient } from "#supabase/server";
import { ICustomPokemon, IList, IPokemon, IPokemonShort } from "~/types/pokemon";


export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<{ pokemons: ICustomPokemon }>(
    event
  );

  const response = await client
  .from("pokemons")
  .select<"*", ICustomPokemon>();
  const formattedResponse: IList<ICustomPokemon> = {
    count: response.count || 0,
    results: response.data || [],
  };
  return formattedResponse;
});

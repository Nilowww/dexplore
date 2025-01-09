import { defineEventHandler, readBody } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { IPokemon, WithUser } from "~/types/pokemon";
type ICustomPokemon = WithUser<Omit<IPokemon, "id">>;

export default defineEventHandler(async (event) => {
  const body: IPokemon = await readBody(event);

  const client = await serverSupabaseClient<{ pokemons: ICustomPokemon }>(
    event
  );

  const user = await client.auth.getUser();
  if (!user.data.user) {
    return { status: 401, body: "Unauthorized" };
  }

  const newPokemon: ICustomPokemon = {
    name: body.name.toLowerCase(),
    weight: body.weight,
    types: body.types,
    base_experience: body.base_experience,
    abilities: body.abilities,
    moves: body.moves,
    stats: body.stats,
    sprites: body.sprites,
    user_id: user.data.user?.id,
  };

  const matchedPokemons = await client
    .from("pokemons")
    .select()
    .eq("name", newPokemon.name);
  if (matchedPokemons.data?.length) {
    event.res.statusCode = 409;
    return { status: 409, body: "Pokemon already exists" };
  } else {
    return await client.from("pokemons").insert([newPokemon]);
  }
});

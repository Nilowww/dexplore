import { defineStore } from "pinia";
import type { IList, IPokemonSaved, IPokemonShort } from "~/types/pokemon";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import _, { isEmpty } from "lodash";

export const useFavoritesStore = defineStore("favorites", () => {
  const pokemons = ref<IPokemonShort[]>([]);
  const supabase = useSupabaseClient<{ favorites: IPokemonSaved }>();
  const user = useSupabaseUser();

  async function loadFavorites() {
    if (user.value) {
      const { data, error } = await supabase
        .from("favorites")
        .select("pokemon_id")
        .eq("user_id", user.value.id);

      console.log(data);
      const pokemons_ids = data?.map((current) => {
        return current.pokemon_id;
      });
      console.log(pokemons_ids);
      const params: Record<string, any> = {};

      if (!isEmpty(pokemons_ids)) {
        params.pokemon_ids = JSON.stringify(pokemons_ids);
      }

      const response = (await getData(
        `/pokemon?` + new URLSearchParams(params)
      )) as IList<IPokemonShort>;
      pokemons.value = response.results
      if (error) {
        console.error("Error al cargar favoritos:", error);
      }
    }
  }

  async function addPokemons(pokemon: IPokemonShort) {
    if (!user.value) return;

    const pokemonExists = pokemons.value.some(
      (currentPokemon) => currentPokemon.id === pokemon.id
    );

    if (pokemonExists) {
      await removePokemon(pokemon);
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.value.id, pokemon_id: pokemon.id });

      if (error) {
        console.error("Error al agregar favorito:", error);
      } else {
        pokemons.value.push(pokemon);
      }
    }
  }

  async function removePokemon(pokemon: IPokemonShort) {
    if (!user.value) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.value.id)
      .eq("pokemon_id", pokemon.id);

    if (error) {
      console.error("Error al quitar favorito:", error);
    } else {
      pokemons.value = pokemons.value.filter(
        (currentPokemon) => pokemon.id !== currentPokemon.id
      );
    }
  }

  loadFavorites();

  return { pokemons, addPokemons, removePokemon, loadFavorites };
});
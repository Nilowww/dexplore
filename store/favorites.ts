import { defineStore } from "pinia";
import type { IList, IPokemonSaved, IPokemonShort } from "~/types/pokemon";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import pkg from 'lodash';

const { isEmpty } = pkg;

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

      if (error) {
        console.error("Error loading favorites:", error);
        return;
      }

      const pokemons_ids = data?.map((current) => current.pokemon_id) || [];
      if (!isEmpty(pokemons_ids)) {
        const params = new URLSearchParams();
        params.append('pokemon_ids', JSON.stringify(pokemons_ids));

        const response = await getData(`/pokemon?${params.toString()}`) as IList<IPokemonShort>;
        pokemons.value = response.results || [];
      } else {
        pokemons.value = [];
      }
    } else {
      pokemons.value = [];
    }
  }

  async function addPokemons(pokemon: IPokemonShort) {
    if (!user.value) return;

    const pokemonExists = pokemons.value.some((currentPokemon) => currentPokemon.id === pokemon.id);

    if (pokemonExists) {
      await removePokemon(pokemon);
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.value.id, pokemon_id: pokemon.id });

      if (error) {
        console.error("Error adding favorite:", error);
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
      console.error("Error removing favorite:", error);
    } else {
      pokemons.value = pokemons.value.filter((currentPokemon) => pokemon.id !== currentPokemon.id);
    }
  }

  watch(user, (newUser) => {
    loadFavorites();
  }, { immediate: true });

  return { pokemons, addPokemons, removePokemon };
});

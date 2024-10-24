<template>
    <v-container>
      <v-row>
        <v-col v-if="!favoritePokemons.length" cols="12" class="text-center">
          <v-alert type="info">No favorites found.</v-alert>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="pokemon in favoritePokemons"
          :key="pokemon.id"
        >
        <PokemonCard :pokemon="pokemon" hide-types show-id title-size></PokemonCard>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { useFavoritesStore } from '~/store/favorites';
  import type { IPokemonShort } from '~/types/pokemon';
  
  const favoriteStore = useFavoritesStore();
  
  const favoritePokemons = computed(() => favoriteStore.pokemons);
  
  function getImage(pokemon: IPokemonShort) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  
  function capitalizeName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  function removeFavorite(pokemon: IPokemonShort) {
    favoriteStore.removePokemon(pokemon);
  }
  </script>
  
  <style scoped>
  .pokemon-card {
    transition: transform 0.2s ease;
  }
  
  .pokemon-card:hover {
    transform: scale(1.05);
  }
  
  .pokemon-img {
    border-radius: 12px 12px 0 0;
  }
  
  .v-card-title {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .v-btn {
    margin: 0 4px;
  }
  </style>
  
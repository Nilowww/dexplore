<template>
  <v-container>
    <v-row>
      <v-col
        v-if="!filteredFavoritePokemons.length"
        cols="12"
        class="text-center"
      >
        <v-alert type="info">No favorites found.</v-alert>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="pokemon in filteredFavoritePokemons"
        :key="pokemon.id"
      >
        <PokemonCard
          :pokemon="pokemon"
          hide-types
          show-id
          title-size
          animated
        ></PokemonCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/store/favorites";

useHead({
  title: 'Dexplore | Favorites',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

const favoriteStore = useFavoritesStore();

const filteredFavoritePokemons = computed(() => favoriteStore.filteredPokemons);

onMounted(() => {
  favoriteStore.filterFavorites("");
});
</script>

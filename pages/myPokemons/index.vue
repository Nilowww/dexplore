<template>
  <v-container>
    <v-row>
      <v-col v-if="!pokemons.length" cols="12" class="text-center">
        <v-alert type="info">No pokemons found.</v-alert>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
      >
        <PokemonCard
          :pokemon="pokemon"
          animated
          hide-favorites
          title-size
        ></PokemonCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { ICustomPokemon, IList } from "~/types/pokemon";

const pokemons = ref<Required<ICustomPokemon>[]>([]);
const loaded = ref(false);

async function handleClick() {
  loaded.value = false;
  const value = await getData<IList<Required<ICustomPokemon>>>(
    `/my-pokemons?` + new URLSearchParams(/*params*/)
  );
  if (value.error) return;

  pokemons.value = value.results;
  loaded.value = true;
}

onMounted(() => handleClick());
</script>

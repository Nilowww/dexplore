<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" v-for="index in 12" :key="index" v-if="!loaded">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="3" v-else v-for="pokemon in pokemons" :key="pokemon.name">
          <v-card class="pa-2" outlined>
            <v-img :src="getImage(pokemon)" width="100%" />
            <v-divider></v-divider>
            <div class="text-center">
              <div class="pokemon-name">
                {{ pokemon.name }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import getData from "~/composables/getData";
import type { IList, IPokemonShort } from "~/types/pokemon";

const loaded = ref(false);
const pokemons = ref<IPokemonShort[]>([]);

async function handleClick() {
  const value = (await getData("/pokemon")) as IList<IPokemonShort>;
  pokemons.value = value.results;
  loaded.value = true;
}

onMounted(() => {
  handleClick();
});

function getImage(pokemon: IPokemonShort) {
  const id = pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return imageURL;
}
</script>

<style scoped>
.v-card {
  text-align: center;
}

.pokemon-name {
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 4px;
  margin-top: 8px;
}
</style>

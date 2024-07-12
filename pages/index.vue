<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="totalPage"
              :total-visible="11"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              :disabled="!loaded"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" v-for="index in 12" :key="index" v-if="!loaded">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="3" v-else v-for="pokemon in pokemons" :key="pokemon.name">
          <NuxtLink :to="getPokemonID(pokemon)">
            <v-card class="pa-2" outlined>
              <v-img :src="getImage(pokemon)" width="100%" />
              <v-divider></v-divider>
              <div class="text-center">
                <div class="pokemon-name">
                  {{ pokemon.name }}
                </div>
              </div>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import getData from "~/composables/getData";
import type { IList, IPokemonShort } from "~/types/pokemon";

const loaded = ref(false);
const pokemons = ref<IPokemonShort[]>([]);
const page = ref(1);
const totalPokemon = ref(0);

const offset = computed(() => {
  return (page.value-1)*20
});


const totalPage = computed(() => {
  return Math.ceil(totalPokemon.value / 20);
});

async function handleClick() {
  loaded.value = false;
  const value = (await getData(`/pokemon?offset=${offset.value}`)) as IList<IPokemonShort>;
  totalPokemon.value = value.count;
  pokemons.value = value.results;
  loaded.value = true;
}

watch(page, () => {
  handleClick();
});

onMounted(() => {
  handleClick();
});

function getImage(pokemon: IPokemonShort) {
  const id = getPokemonID(pokemon);
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return imageURL;
}

function getPokemonID(pokemon: IPokemonShort) {
  const id = pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
  return id;
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

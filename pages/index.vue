<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="11">
          <div class="text-center">
            <v-text-field
              v-if="showSearch"
              @input="searchDebounced"
              label="Search Pokemon"
              variant="underlined"
              v-model="pokemonName"
            ></v-text-field>
            <v-pagination
              v-else
              v-model="page"
              :length="totalPage"
              :total-visible="11"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              :disabled="!loaded"
            ></v-pagination>
          </div>
        </v-col>
        <v-col cols="1">
          <v-btn
            variant="flat"
            @click="toggleSearch"
            :icon="showSearch ? 'mdi-close' : 'mdi-magnify'"
          ></v-btn>
        </v-col>
      </v-row>
      <v-row v-if="showSearch">
        <v-col cols="12">
          <div class="d-flex flex-wrap justify-center ga-2">
            <v-chip
              @click="clearFilter"
              :class="{ 'chip-selected': isEmpty(selectedType) }"
              color="grey lighten-2"
            >
              All
            </v-chip>
            <v-chip
              v-for="type in types"
              :key="type"
              :color="getTypeColor(type)"
              @click="selectType(type)"
              :prepend-icon="
                selectedType.includes(type)
                  ? 'mdi-checkbox-marked'
                  : 'mdi-checkbox-blank-outline'
              "
            >
              {{ type }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="showSearch && loaded && !pokemons.length"
          cols="12"
          class="text-center"
        >
          No pokemons found
        </v-col>
        <v-col cols="3" v-for="index in 12" :key="index" v-if="!loaded">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="3" v-else v-for="pokemon in pokemons" :key="pokemon.name">
          <NuxtLink :to="String(pokemon.id)">
            <v-card class="pa-2" outlined>
              <v-img
                :src="
                  pokemon.sprites.other['official-artwork']?.front_default ||
                  getImage(pokemon)
                "
                width="100%"
              />
              <v-divider></v-divider>
              <div class="d-flex justify-center ga-2 mt-2">
                <v-chip
                  class="text-decoration-none"
                  v-for="type in pokemon.types"
                  :color="getTypeColor(type)"
                >
                  {{ type }}
                </v-chip>
              </div>
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
import { debounce, isEmpty } from "lodash";
import { ref, watch } from "vue";
import getData from "~/composables/getData";
import type { IList, IPokemonShort } from "~/types/pokemon";

const loaded = ref(false);
const pokemons = ref<IPokemonShort[]>([]);
const page = ref(1);
const totalPokemon = ref(0);
const showSearch = ref(false);
const pokemonName = ref("");
const selectedType = ref<string[]>([]);
const types = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ice",
  "dragon",
  "ghost",
  "steel",
  "dark",
];

const searchDebounced = debounce(() => {
  if (page.value > 1) {
    page.value = 1;
  } else {
    handleClick();
  }
}, 500);

function toggleSearch() {
  showSearch.value = !showSearch.value;
}

const offset = computed(() => {
  return (page.value - 1) * 20;
});

const totalPage = computed(() => {
  return Math.ceil(totalPokemon.value / 20);
});

async function handleClick() {
  loaded.value = false;

  const params: Record<string, any> = {
    offset: String(offset.value),
  };

  if (pokemonName.value.length > 0) {
    params.name = pokemonName.value;
  }

  if (!isEmpty(selectedType.value)) {
    params.type = selectedType.value.join();
  }

  const value = (await getData(
    `/pokemon?` + new URLSearchParams(params)
  )) as IList<IPokemonShort>;
  totalPokemon.value = value.count;
  pokemons.value = value.results;
  loaded.value = true;
}

function selectType(type: string) {
  const hasType = selectedType.value.includes(type);

  if (hasType) {
    selectedType.value = selectedType.value.filter(
      (currentType) => currentType !== type
    );
  } else {
    selectedType.value = [...selectedType.value, type];
  }
  page.value = 1;
  handleClick();
}

function clearFilter() {
  selectedType.value = [];
  page.value = 1;
  handleClick();
}

watch(page, () => {
  handleClick();
});

onMounted(() => {
  handleClick();
});

function getImage(pokemon: IPokemonShort) {
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  return imageURL;
}
</script>

<style scoped>
.chip-selected {
  border: 2px solid black;
  font-weight: bold;
}

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

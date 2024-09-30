<template>
  <div>
    <v-container>
      <v-row> </v-row>
      <v-row>
        <v-col cols="11">
          <div class="text-center">
            <!-- Search Chips Section -->
            <v-row v-if="showSearch">
              <v-col cols="12">
                <div class="d-flex flex-wrap justify-center">
                  <v-chip
                    @click="clearFilter"
                    :class="{
                      'type-chip': isEmpty(selectedType),
                      'chip-all': true,
                    }"
                    color="black"
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
                    class="type-chip"
                  >
                    {{ type }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
            <v-pagination
              v-else-if="loaded && pokemons.length"
              v-model="page"
              :length="totalPage"
              :total-visible="7"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              :disabled="!loaded"
              class="pagination"
            ></v-pagination>
          </div>
        </v-col>
        <v-col cols="1">
          <v-btn
            variant="flat"
            @click="toggleSearch"
            :icon="showSearch ? 'mdi-close' : 'mdi-filter'"
            class="search-toggle-btn"
          ></v-btn>
        </v-col>
      </v-row>

      <!-- Pokemon Cards Section -->
      <v-row>
        <v-col v-if="loaded && !pokemons.length" cols="12" class="text-center">
          No pokemons found
        </v-col>
        <v-col cols="3" v-for="index in 12" :key="index" v-if="!loaded">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="pokemon in pokemons"
          :key="pokemon.name"
        >
          <NuxtLink :to="String(pokemon.id)" class="text-decoration-none">
            <v-card class="pokemon-card" outlined>
              <div class="position-absolute top-0 left-0" style="z-index:2">
                <FavoriteStar :pokemon="pokemon" />
              </div>
              <v-img
                :src="
                  pokemon.sprites.other['official-artwork']?.front_default ||
                  getImage(pokemon)
                "
                width="100%"
                class="pokemon-img"
              />
              <v-divider></v-divider>
              <div class="text-center pokemon-name">
                {{ capitalizeName(pokemon.name) }}
              </div>
              <div class="d-flex flex-wrap justify-center mt-2">
                <v-chip
                  v-for="type in pokemon.types"
                  :key="type"
                  :color="getTypeColor(type)"
                  class="type-chip"
                >
                  <i
                    v-if="type !== 'normal'"
                    :class="getTypeIcon(type)"
                    class="type-icon"
                  ></i>
                  <span class="type-text">{{ type }}</span>
                </v-chip>
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
import { ref, computed, onMounted, watch } from "vue";
import getData from "~/composables/getData";
import type { IList, IPokemonShort } from "~/types/pokemon";
import "@fortawesome/fontawesome-free/css/all.css";
import FavoriteStar from "~/components/buttons/FavoriteStar.vue";

const route = useRoute();

const loaded = ref(false);
const pokemons = ref<IPokemonShort[]>([]);
const page = ref(1);
const totalPokemon = ref(0);
const showSearch = ref(false);
const selectedType = ref<string[]>([]);
definePageMeta({
  middleware: "authenticated",
});

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

const offset = computed(() => (page.value - 1) * 20);
const totalPage = computed(() => Math.ceil(totalPokemon.value / 20));

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

function getImage(pokemon: IPokemonShort) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

function capitalizeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

async function handleClick() {
  loaded.value = false;
  const params: Record<string, any> = { offset: String(offset.value) };
  if (route.query.pokemon && route.query.pokemon?.length > 0)
    params.name = route.query.pokemon;
  if (!isEmpty(selectedType.value)) params.type = selectedType.value.join();

  const value = (await getData(
    `/pokemon?` + new URLSearchParams(params)
  )) as IList<IPokemonShort>;
  totalPokemon.value = value.count;
  pokemons.value = value.results;
  loaded.value = true;
}

function selectType(type: string) {
  selectedType.value = selectedType.value.includes(type)
    ? selectedType.value.filter((currentType) => currentType !== type)
    : [...selectedType.value, type];
  page.value = 1;
  handleClick();
}

function clearFilter() {
  selectedType.value = [];
  page.value = 1;
  handleClick();
}

function getTypeIcon(type: string): string {
  const typeIcons: Record<string, string> = {
    grass: "fas fa-leaf",
    fire: "fas fa-fire",
    water: "fas fa-tint",
    electric: "fas fa-bolt",
    ice: "fas fa-snowflake",
    fighting: "fas fa-fist-raised",
    poison: "fas fa-skull-crossbones",
    ground: "fas fa-earth",
    flying: "fas fa-paper-plane",
    psychic: "fas fa-brain",
    bug: "fas fa-bug",
    rock: "fas fa-mountain",
    ghost: "fas fa-ghost",
    dragon: "fas fa-dragon",
    dark: "fas fa-moon",
    steel: "fas fa-shield-alt",
    fairy: "fas fa-star",
  };
  return typeIcons[type] || "fas fa-question-circle";
}

function getTypeColor(type: string): string {
  switch (type) {
    case "grass":
      return "success";
    case "fire":
      return "error";
    case "water":
      return "primary";
    case "electric":
      return "yellow darken-2";
    case "ice":
      return "light-blue";
    case "fighting":
      return "deep-orange darken-2";
    case "poison":
      return "purple darken-2";
    case "ground":
      return "brown darken-2";
    case "flying":
      return "blue-grey darken-1";
    case "psychic":
      return "pink darken-2";
    case "bug":
      return "lime darken-3";
    case "rock":
      return "orange darken-3";
    case "ghost":
      return "indigo darken-4";
    case "dragon":
      return "deep-purple darken-4";
    case "dark":
      return "grey darken-3";
    case "steel":
      return "blue-grey darken-2";
    case "fairy":
      return "pink lighten-2";
    default:
      return "grey";
  }
}

watch(page, () => handleClick());
watch(
  () => route.query.pokemon,
  () => searchDebounced()
);

onMounted(() => handleClick());
</script>

<style scoped>
.logout-btn {
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
}

.logout-btn:hover {
  background-color: #1976d2;
  transform: scale(1.05);
}

.logout-btn v-icon {
  margin-right: 8px;
}

.search-field {
  max-width: 400px;
  margin: 20px auto;
}

.search-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0;
  margin-top: 23px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.type-chip {
  border-radius: 12px;
  margin: 4px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.type-icon {
  margin-right: 5px;
  font-size: 1.1em;
}

.chip-all {
  border-radius: 8px;
  margin: 4px;
  font-weight: bold;
}

.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-color: #e0f7fa;
}

.pokemon-img {
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 12px;
}

.pokemon-name {
  background-color: transparent;
  color: #333;
  font-size: 1.2em;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  margin-top: 12px;
}

@media (max-width: 600px) {
  .pokemon-card {
    margin-bottom: 20px;
  }
}
</style>

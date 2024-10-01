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
        <PokemonCard :pokemon="pokemon"></PokemonCard>
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

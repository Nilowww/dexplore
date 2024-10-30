<template>
  <div>
    <v-container fluid>
      <v-row class="mb-4">
        <v-col cols="10" sm="11">
          <div class="text-center">
            <!-- Search Chips Section -->
            <v-row v-if="showSearch">
              <v-col cols="12">
                <div class="d-flex flex-wrap justify-center">
                  <v-chip
                    @click="clearFilter"
                    :class="{
                      'type-chip': isEmpty(selectedType),
                    }"
                    color="black"
                    class="ma-1"
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
                    class="type-chip ma-1"
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
              :total-visible="$vuetify.display.smAndDown ? 3 : 7"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              :disabled="!loaded"
              class="pagination mt-4"
            ></v-pagination>
          </div>
        </v-col>
        <v-col cols="2" sm="1" class="d-flex justify-end align-center">
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
        <v-col cols="6" sm="4" md="3" v-for="index in 12" :key="index" v-if="!loaded">
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
          <PokemonCard :pokemon="pokemon" hide-favorites></PokemonCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import pkg from 'lodash';
import { ref, computed, onMounted, watch } from "vue";
import getData from "~/composables/getData";
import type { IList, IPokemonShort } from "~/types/pokemon";
import "@fortawesome/fontawesome-free/css/all.css";
import { types, getTypeColor } from "~/utils";

const route = useRoute();

const { isEmpty } = pkg;
const { debounce } = pkg;

const loaded = ref(false);
const pokemons = ref<IPokemonShort[]>([]);
const page = ref(1);
const totalPokemon = ref(0);
const showSearch = ref(false);
const selectedType = ref<string[]>([]);
definePageMeta({
  middleware: "authenticated",
});

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

watch(page, () => handleClick());
watch(
  () => route.query.pokemon,
  () => searchDebounced()
);

onMounted(() => handleClick());
</script>

<style scoped>
.type-chip {
  border-radius: 12px;
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
  font-weight: bold;
}

.search-field {
  max-width: 400px;
  margin: 20px auto;
}

.search-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: center;
}

@media (max-width: 600px) {
  .type-chip {
    font-size: 0.8rem;
    padding: 0 8px;
  }

  .search-toggle-btn {
    margin-top: 0;
  }
}
</style>
<template>
  <v-container v-if="pokemon">
    <v-row>
      <v-col cols="12">
        <v-btn @click="goBack" class="back-button"> Back </v-btn>
      </v-col>
    </v-row>

    <!-- Pokémon Details -->
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <PokemonCard :pokemon="pokemon" plain animated />
        <v-divider class="my-5" />
        <div class="type">
          <div class="details-sub">
            <h2 class="subtitle-1">ID:</h2>
            <p>{{ pokemon.id }}</p>
          </div>
          <v-divider class="my-5" />
          <div class="details-sub">
            <h2 class="subtitle-1">Base Experience:</h2>
            <p>{{ pokemon.base_experience }}</p>
          </div>
          <v-divider class="my-5" />
          <div class="details-sub">
            <h2 class="subtitle-1">Weight:</h2>
            <p>{{ pokemon.weight / 10 }} kg</p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="details">
          <div class="details-sub">
            <h2 class="subtitle-1">Abilities:</h2>
            <div class="contenedor">
              <v-chip
                class="mr-3 mb-3"
                color="primary"
                v-for="ability in pokemon.abilities"
                :key="ability.ability.name"
              >
                {{ ability.ability.name }}
              </v-chip>
            </div>
          </div>
          <v-divider class="my-5" />
          <h2 class="subtitle-1">Stats:</h2>
          <v-card class="pa-5 elevation-5" color="grey-lighten-4">
            <v-card-body>
              <v-row>
                <v-col class="pa-0" v-for="stat in pokemon.stats" cols="2">
                  <v-tooltip :text= "stat.base_stat" location="top center" origin="overlap">
                    <template v-slot:activator="{ props }">
                      <div class="stat-container" v-bind="props">
                        <li
                          v-for="index in 15"
                          :class="{
                            painted: index >= 16 - getLimit(stat.base_stat),
                          }"
                          :style="{
                            backgroundColor: getStatsColor(stat.stat.name),
                          }"
                        ></li>
                      </div>
                      <p class="text-center text-caption" style="text-transform: capitalize !important">
                        {{ stat.stat.name.replace("-", " ") }}
                      </p>
                    </template>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-body>
          </v-card>
          <v-divider class="my-5" />
          <div class="details-sub">
            <h2 class="subtitle-1">Moves:</h2>
            <div class="moves-container">
              <div class="contenedor">
                <v-chip
                  v-for="(move, index) in visibleMoves"
                  :key="move.move.name"
                  class="mr-3 mb-3"
                  color="secondary"
                >
                  {{ move.move.name }}
                </v-chip>
              </div>
              <v-btn
                v-if="!showAllMoves"
                @click="showAllMoves = true"
                class="show-more-button"
              >
                Show All Moves
              </v-btn>
            </div>
            <div v-if="showAllMoves" class="contenedor">
              <v-chip
                v-for="move in pokemon.moves"
                :key="move.move.name"
                class="mr-3 mb-3"
                color="secondary"
              >
                {{ move.move.name }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="4">
        <v-skeleton-loader
          type="ossein, chip, chip, divider, text, text, text"
          height="500"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="8">
        <v-skeleton-loader type="card, card"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import getData from "~/composables/getData";
import type { IPokemon } from "~/types/pokemon";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pokemon = ref<IPokemon | null>(null);
const showAllMoves = ref(false);

async function handleClick() {
  const value = (await getData(`pokemon/${route.params.id}`)) as IPokemon;
  pokemon.value = value;
}

function goBack() {
  router.push("/");
}

function getStatsColor(stat: string): string {
  switch (stat) {
    case "hp":
      return "green";
    case "attack":
      return "red";
    case "defense":
      return "blue";
    case "special-attack":
      return "#991119";
    case "special-defense":
      return "#09057f";
    case "speed":
      return "#0be0c0";
    default:
      return "grey";
  }
}

function getLimit(total: number) {
  total = (total * 15) / 255;
  return Math.ceil(total);
}

const visibleMoves = computed(() => {
  if (!pokemon.value) return [];
  return pokemon.value.moves.slice(0, 5);
});

onMounted(() => {
  handleClick();
});
</script>

<style scoped>
.pokemon-image {
  border: 2px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: scaleIn 0.5s ease-out;
}

.headline {
  font-size: 2.5em;
  margin-top: 10px;
}

.subtitle-1 {
  font-size: 1.2em;
  color: #555;
}

.type {
  margin-top: 10px 0;
}

.details {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

.details-sub {
  margin-bottom: 20px;
}

.contenedor {
  display: flex;
  flex-wrap: wrap;
}

.moves-container {
  margin-top: 10px;
}

.back-button {
  background-color: #20252b;
  color: white;
  border-radius: 8px;
  text-transform: uppercase;
}

.back-button:hover {
  background-color: #1565c0;
}

.show-more-button {
  background-color: #20252b;
  color: white;
  border-radius: 8px;
  text-transform: uppercase;
  margin-top: 10px;
}

.show-more-button:hover {
  background-color: #1565c0;
}

.stat-container {
  list-style: none;
  padding: 5px;

  li {
    height: 12px;
    margin-bottom: 5px;
    opacity: 1;
    &:not(.painted) {
      opacity: 0.1;
    }
  }
}

@media (max-width: 600px) {
  .details {
    padding: 10px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>

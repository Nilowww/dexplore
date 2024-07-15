<template>
  <v-container v-if="pokemon">
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <v-img
          width="100%"
          contain
          class="mb-3 pokemon-image"
          :src="
            pokemon?.sprites.other['official-artwork']?.front_default || getImage(pokemon)
          "
        />
        <h1 class="headline">{{ pokemon?.name }}</h1>
        <p class="subtitle-1">ID: {{ pokemon?.id }}</p>
        <div class="type">
          <v-chip
            v-for="type in pokemon?.types"
            :color="getTypeColor(type)"
            class="mr-2"
          >
            {{ type }}
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div class="details">
          <div class="details-sub">
            <h2 class="subtitle-1">Habilidades:</h2>
            <div class="contenedor">
              <v-chip
                class="mr-3 mb-3"
                color="primary"
                v-for="ability in pokemon?.abilities">
                {{ ability.ability.name }}
              </v-chip>
            </div>
          </div>
          <v-divider class="my-5" />
          <div class="details-sub">
            <h2 class="subtitle-1">Movimientos:</h2>
            <div class="contenedor">
              <v-chip
                class="mr-3 mb-3"
                color="primary"
                v-for="move in pokemon?.moves">
                {{ move.move.name }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import getData from "~/composables/getData";
import type { IPokemon } from "~/types/pokemon";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pokemon = ref<IPokemon | null>(null);

async function handleClick() {
  const value = (await getData(`pokemon/${route.params.id}`)) as IPokemon;
  pokemon.value = value;
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'grass':
      return 'success';
    case 'fire':
      return 'error';
    case 'water':
      return 'primary';
    case 'electric':
      return 'yellow darken-2';
    case 'ice':
      return 'light-blue';
    case 'fighting':
      return 'deep-orange darken-2';
    case 'poison':
      return 'purple darken-2';
    case 'ground':
      return 'brown darken-2';
    case 'flying':
      return 'blue-grey darken-1';
    case 'psychic':
      return 'pink darken-2';
    case 'bug':
      return 'lime darken-3';
    case 'rock':
      return 'orange darken-3';
    case 'ghost':
      return 'indigo darken-4';
    case 'dragon':
      return 'deep-purple darken-4';
    case 'dark':
      return 'grey darken-3';
    case 'steel':
      return 'blue-grey darken-2';
    case 'fairy':
      return 'pink lighten-2';
    default:
      return 'grey';
  }
}

onMounted(() => {
  handleClick();
});
</script>

<style scoped>
.pokemon-image {
  border: 2px solid #ccc;
  border-radius: 50%;
  animation: scaleIn 0.5s ease-out;
}

.type {
  margin-top: 10px;
}

.details {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

.details-sub {
  margin-bottom: 20px;
}

.contenedor {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .details {
    padding: 10px;
  }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  0% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
</style>
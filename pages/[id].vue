<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <v-img
          width="100%"
          contain
          class="mb-3"
          :src="
            pokemon?.sprites.other['official-artwork']?.front_default ||
            undefined
          "
        />
        <h1 class="headline">{{ pokemon?.name }}</h1>
        <p class="subtitle-1">ID: {{ pokemon?.id }}</p>
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

onMounted(() => {
  handleClick();
});
</script>

<style scoped>
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
</style>
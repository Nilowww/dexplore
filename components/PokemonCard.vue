<template>
  <NuxtLink :to="String(pokemon.id)" class="text-decoration-none">
    <v-card class="pokemon-card" outlined>
      <div class="position-absolute top-0 left-0" style="z-index: 2">
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
</template>

<script setup lang="ts">
import type { IPokemonShort } from "~/types/pokemon";
import FavoriteStar from "./buttons/FavoriteStar.vue";

const props = defineProps<{
  pokemon: IPokemonShort;
}>();

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

function getImage(pokemon: IPokemonShort) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

function capitalizeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
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

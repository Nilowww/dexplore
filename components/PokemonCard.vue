<template>
  <NuxtLink :to="String(pokemon.id)" class="text-decoration-none">
    <v-card
      class="pokemon-card pb-3"
      :class="{ plain: plain }"
      elevation="0"
      outlined
    >
      <div
        v-if="!hideFavorites"
        class="position-absolute top-0 left-0"
        style="z-index: 2"
      >
        <FavoriteStar :pokemon="pokemon" />
      </div>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-img
            v-bind="props"
            :src="getImage(isHovering)"
            :width="animated ? '50%' : '100%'"
            class="pokemon-img"
          />
        </template>
      </v-hover>
      <v-divider></v-divider>
      <div class="text-center pokemon-name" :class="{ titleSize: titleSize }">
        {{ capitalizeName(pokemon.name) }}
      </div>
      <div v-if="showId">
        <h2 class="subtitle-1">ID: {{ pokemon.id }}</h2>
      </div>
      <div v-if="!hideTypes" class="d-flex flex-wrap justify-center mt-2">
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
  hideFavorites?: boolean;
  plain?: boolean;
  hideTypes?: boolean;
  showId?: boolean;
  titleSize?: boolean;
  animated?: boolean;
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

function getImage(hovering?: boolean) {
  let sprite: Record<"front_default" | "back_default", string | null> =
    props.pokemon.sprites;

  if (props.animated) {
    sprite =
      props.pokemon.sprites.versions["generation-v"]["black-white"].animated;
  }

  return (hovering ? sprite.back_default : sprite.front_default) || props.pokemon.sprites.front_default;
}

function capitalizeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
</script>

<style scoped lang="scss">
.subtitle-1 {
  font-size: 0.8em;
  color: #555;
}

.type-chip {
  border-radius: 12px;
  margin: 4px;
  display: flex;
  align-items: center;
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
  border-radius: 12px;
  box-shadow: 0 !important;

  &:not(.plain) {
    .pokemon-img {
      background-color: #e0e0e0;
    }
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #f5f5f5;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      background-color: #e0f7fa;
    }
  }

  .pokemon-img {
    padding: 16px;
    border-radius: 12px;
  }
}

.pokemon-name {
  background-color: transparent;
  color: #333;
  font-size: small;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  margin-top: 12px;

  &:not(.titleSize) {
    font-size: 1.2em;
  }
}

@media (max-width: 600px) {
  .pokemon-card {
    margin-bottom: 20px;
  }
}
</style>

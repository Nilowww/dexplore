<template>
  <v-btn
    variant="flat"
    :icon="true"
    @click.prevent="handleClick()"
    color="transparent"
    :loading="loading"
  
  >
    <v-icon
      class="shadow-icon"
      :color="isChecked ? 'yellow-darken-1' : 'grey-darken-1'"
    >
      {{ isChecked ? "mdi-star" : "mdi-star-outline" }}
    </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "~/store/favorites";
import type { IPokemonShort } from "~/types/pokemon";


const props = defineProps<{
  pokemon: IPokemonShort;
}>();

const loading = ref(false);

const favoriteStore = useFavoritesStore();

const isChecked = computed(() => {
  return favoriteStore.pokemons.some((currentPokemon) => {
    return currentPokemon.id == props.pokemon.id;
  });
});

const handleClick = async () => {
  loading.value = true;
  await favoriteStore.addPokemons(props.pokemon)
  loading.value = false;
}

</script>

<style lang="scss" scoped>
.shadow-icon {
  filter: drop-shadow(0px 0px 0.5px rgb(0 0 0 / 1));
}
</style>

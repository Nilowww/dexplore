<template>
  <v-row>
    <v-col class="v-col d-flex flex-column justify-center items-center">
      <v-text-field
          v-if="showSearch"
          label="Search Pokemon"
          variant="outlined"
          :class="['search-field', $vuetify.display.smAndDown ? 'search-field-mobile' : '']"
          hide-details
          density="comfortable"
          v-model="pokemonName"
          @input="handleSearch"
          @click:clear="handleSearch"
          clearable
          persistent-clear
        >
        </v-text-field>
    </v-col>
    <v-col class="pl-0 v-col d-flex flex-column justify-center items-center">
      <v-btn
        @click="toggleSearch"
        :icon="showSearch ? 'mdi-close' : 'mdi-magnify'"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const showSearch = ref(false);
const route = useRoute();
const router = useRouter();
const pokemonName = ref(route.query?.pokemon as string | undefined);

function toggleSearch() {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    pokemonName.value = '';
    handleSearch();
  }
}

function handleSearch() {
  const query = pokemonName.value ? { pokemon: pokemonName.value } : {};
  router.replace({ query, path: "/" });
}

watch(() => route.query.pokemon, (newValue) => {
  pokemonName.value = newValue as string | undefined;
});
</script>

<style scoped>
.search-field {
  width: 400px;
  max-width: 100%;
  transition: all 0.3s ease;
}

.search-field-mobile {
  width: 220px;
}

@media (max-width: 600px) {
  .search-field {
    font-size: 14px;
  }
}
</style>
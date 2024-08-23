<template>
  <v-row>
    <v-col class="v-col d-flex flex-column justify-center items-center">
      <v-text-field
        v-if="showSearch"
        label="Search Pokemon"
        variant="outlined"
        style="width: 400px"
        hide-details
        density="compact"
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
const showSearch = ref(false);
const route = useRoute();
const router = useRouter();
const pokemonName = ref(route.query?.pokemon);

function toggleSearch() {
  showSearch.value = !showSearch.value;
}

function handleSearch() {
    const query = pokemonName.value ? { pokemon: pokemonName.value } : {}
    router.replace({ query, path: "/" });
}
</script>

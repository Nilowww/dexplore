<script setup lang="ts">
import Logout from "./buttons/Logout.vue";
import SearchPokemon from "./SearchPokemon.vue";
const user = useSupabaseUser();
const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

</script>

<template>
  <v-app-bar :elevation="0" rounded v-if="user">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
    <SearchPokemon></SearchPokemon>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawerOpen" class="navbar">
    <v-list>
      <v-list-item
        prepend-avatar="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
        :subtitle="user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list>
        <Logout></Logout>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.navbar {
  max-height: 100vh !important;
  position: fixed !important;
  margin-right: 505px;
  top: 0;
  left: 0;
}
</style>

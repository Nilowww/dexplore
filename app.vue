<template>
  <div>
    <v-layout>
      <v-layout>
        <Navbar v-if="user"></Navbar>
        <NuxtLayout>
          <v-app :class="[user && 'logged']">   
            <NuxtPage />
          </v-app>
        </NuxtLayout>
      </v-layout>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<style lang="scss" scoped>
  .logged {
    margin-top: 64px;
    height: calc(100vh - 64px);
    overflow-y: scroll;
    bottom: 0;
  }
</style>

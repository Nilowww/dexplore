<template>
  <v-list-item
    prepend-icon="mdi-logout"
    title="Logout"
    value="logout"
    class="text-error"
    @click="confirmLogout"
  ></v-list-item>
</template>

<script setup lang="ts">
const supaAuth = useSupabaseClient().auth;

const confirmLogout = async () => {
  const { error } = await supaAuth.signOut();
  if (error) {
    alert(error.message);
  } else {
    navigateTo("/login");
  }
};
</script>

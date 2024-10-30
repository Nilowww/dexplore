<template>
  <v-list-item
    prepend-icon="mdi-logout"
    title="Logout"
    value="logout"
    class="text-error logout-btn"
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

<style scoped>
.logout-btn {
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.3s;
}

.logout-btn:hover {
  background-color: black;
  transform: scale(1.05);
}

.logout-btn v-icon {
  margin-right: 8px;
}
</style>

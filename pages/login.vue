<template>
  <v-container fluid class="login-container pa-0">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card class="login-card mx-auto" elevation="16" max-width="100%">
          <v-card-title class="text-center pt-8">
            <v-img
              src="/assets/pokemon-icon.png"
              contain
              height="80"
              width="80"
              class="mx-auto"
            />
          </v-card-title>
          <v-card-text class="text-center pb-0">
            <h1 class="text-h4 font-weight-bold mb-2">Sign In</h1>
            <p class="text-subtitle-1">Enter your details to get started</p>
          </v-card-text>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="credentials.email"
                label="Email"
                type="email"
                required
                :rules="[(v: any) => !!v || 'Email is required']"
                class="login-text-field mb-4"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                density="comfortable"
              />
              <v-text-field
                v-model="credentials.password"
                :type="passwordType"
                label="Password"
                required
                :rules="[(v: any) => !!v || 'Password is required']"
                class="login-text-field mb-4"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                variant="outlined"
                density="comfortable"
              />
              <v-alert
                v-if="errorMessage"
                type="error"
                class="mb-4"
                variant="tonal"
                density="comfortable"
              >
                {{ errorMessage }}
              </v-alert>
              <v-checkbox
                v-model="rememberMe"
                label="Remember Me"
                class="mb-4"
                hide-details
              />
              <v-btn
                type="submit"
                :loading="loading"
                color="primary"
                block
                class="submit-btn mb-4"
                size="large"
              >
                Sign In
              </v-btn>
              <v-divider class="mb-4" />
              <p class="text-body-2 text-center">
                Don't have an account?
                <nuxt-link
                  to="/register"
                  class="font-weight-bold text-primary text-decoration-none"
                >
                  Sign Up
                </nuxt-link>
              </p>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { navigateTo } from "nuxt/app";

const supaAuth = useSupabaseClient().auth;

const credentials = reactive({
  email: "",
  password: "",
});

useHead({
  title: 'Dexplore | Login',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

const rememberMe = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);

const passwordType = computed(() => (showPassword.value ? "text" : "password"));

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const login = async () => {
  loading.value = true;
  const { error } = await supaAuth.signInWithPassword(credentials);
  loading.value = false;

  if (error) {
    errorMessage.value = error.message;
  } else {
    navigateTo("/");
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/assets/pokemon-background.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  animation: backgroundAnimation 30s infinite alternate;
}

@keyframes backgroundAnimation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.login-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-out;
}

.submit-btn {
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.1s ease, transform 0.1s ease;
}

.submit-btn:hover {
  background-color: #005bb5;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .login-card {
    padding: 16px;
    margin: 16px;
  }

  .v-card-title {
    padding-top: 16px !important;
  }

  .v-card-text {
    padding: 16px !important;
  }
}
</style>
<template>
  <v-container fluid class="signup-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="signup-card" elevation="16">
          <v-card-title class="text-center">
            <v-img
              src="/assets/pokemon-icon.png"
              contain
              height="80"
              class="mx-auto"
            />
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            <h1 class="headline mb-2">Sign Up</h1>
            <p class="subheading">Create your account to get started</p>
          </v-card-subtitle>
          <v-form @submit.prevent="signUp">
            <div class="text-field-wrapper">
              <v-text-field
                v-model="credentials.email"
                label="Email"
                type="email"
                required
                :rules="[(v: any) => !!v || 'Email is required']"
                class="signup-text-field"
                prepend-icon="mdi-email"
              />
              <v-text-field
                v-model="credentials.password"
                :type="passwordType"
                label="Password"
                required
                :rules="[(v: any) => !!v || 'Password is required']"
                class="signup-text-field"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
              />
              <v-text-field
                v-model="credentials.passwordConfirm"
                :type="passwordType"
                label="Confirm Password"
                required
                :rules="[(v: any) => !!v || 'Please confirm your password']"
                class="signup-text-field"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
              />
            </div>
            <v-alert
              v-if="errorMessage"
              type="error"
              class="mb-4"
              border="start"
              colored-border
            >
              {{ errorMessage }}
            </v-alert>
            <v-btn
              type="submit"
              :loading="loading"
              color="primary"
              block
              class="submit-btn"
            >
              Sign Up
            </v-btn>
            <v-divider class="my-4" />
            <v-row>
              <v-col class="text-center">
                <p class="text-body-2">
                  Already have an account?
                  <nuxt-link to="/login" class="font-weight-bold text-primary">
                    Sign In
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-form>
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
  passwordConfirm: "",
});

const loading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);

const passwordType = computed(() => (showPassword.value ? "text" : "password"));

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

const signUp = async () => {
  if (credentials.password !== credentials.passwordConfirm) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  const { error } = await supaAuth.signUp({
    email: credentials.email,
    password: credentials.password,
  });
  loading.value = false;

  if (error) {
    errorMessage.value = error.message;
  } else {
    navigateTo("/login");
  }
};
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/assets/pokemon-background.jpg") no-repeat center center;
  background-size: cover;
}

.signup-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-out;
}

.v-card-title .headline {
  font-weight: bold;
  color: #333;
}

.v-card-subtitle .subheading {
  color: #555;
}

.text-field-wrapper {
  display: flex;
  flex-direction: column;
}

.signup-text-field {
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  transition: box-shadow 0.3s ease;
}

.signup-text-field .v-input__control {
  border-radius: 8px;
}

.signup-text-field .v-input__control,
.signup-text-field input {
  height: 56px;
}

.signup-text-field:hover .v-input__control {
  box-shadow: 0 0 0 2px #0072ff;
}

.submit-btn {
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
  max-width: 200px;
  margin: 0 auto;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-btn:hover {
  background-color: #005bb5;
  transform: translateY(-2px);
}

.v-alert {
  border-radius: 8px;
}

.v-divider {
  margin: 1rem 0;
}

.font-weight-bold {
  font-weight: 600;
}

.text-primary {
  color: #0072ff;
}

.text-center {
  text-align: center;
}

.text-body-2 {
  font-size: 0.875rem;
  color: #555;
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
</style>

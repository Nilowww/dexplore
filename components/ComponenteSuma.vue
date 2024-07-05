<template>
  <input v-model="valor1" />
  <b> + </b>
  <input v-model="valor2" />
  <b> = {{ calcular(valor1, valor2, "add") }}</b>
</template>

<script setup lang="ts">
import { calcular } from "@/utils/index";

const valor1 = ref(Math.round(Math.random() * 100));
const valor2 = ref(Math.round(Math.random() * 100));
</script>

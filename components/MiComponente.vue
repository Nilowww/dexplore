<template>
  <p>{{ type }}</p>
  <v-text-field v-model="valor1" /> {{ valor1 }} <br />
  <v-text-field v-model="valor2" /> {{ valor2 }} <br />
  <p>{{ resultado }}</p>
  <hr />
</template>

<script setup lang="ts">
import { calcular } from "@/utils/index";

const props = withDefaults(
  defineProps<{
    max?: number;
    type: string;
  }>(),
  {
    max: 100,
    type: "add",
  }
);

const valor1 = ref(Math.round(Math.random() * 100));
const valor2 = ref(Math.round(Math.random() * 100));

const resultado = computed(() => {
  const result = calcular(valor1.value, valor2.value, props.type);
  if (result > props.max) {
    return "Error";
  }
  return result;
});
</script>

<template>
  <p>{{ type }}</p>
  <input v-model="valor1" /> {{ valor1 }} <br />
  <input v-model="valor2" /> {{ valor2 }} <br />
  <p>{{ resultado }}</p>
  <hr />
</template>

<script setup lang="ts">
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

function calcular(value1: number, value2: number, type: string) {
  let result = 0;
  switch (type) {
    case "add":
      result =
        parseInt(value1.toString()) + parseInt(value2.toString());
      break;
    case "multiply":
      result =
        parseInt(value1.toString()) * parseInt(value2.toString());
      break;
    case "substraction":
      result =
        parseInt(value1.toString()) - parseInt(value2.toString());
      break;
    case "division":
      result =
        parseInt(value1.toString()) / parseInt(value2.toString());
      break;
  }
  return result;
}

const resultado = computed(() => {
    const result = calcular(valor1.value, valor2.value, props.type)
  if (result > props.max) {
    return "Error";
  }
  return result;
});
</script>

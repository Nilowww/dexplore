<template>
  <div>
    <input placeholder="Nombre" v-model="nombre"/> <br />
    <input placeholder="Apellido" v-model="apellido"/> <br />
    <p id="hola">{{ nombreCompleto }}</p>
  </div>
</template>

<script setup lang="ts">

const nombre = ref('');
const apellido = ref('');

const nombreCompleto = computed(() => {
  return `${nombre.value} ${apellido.value}`;
})

</script>
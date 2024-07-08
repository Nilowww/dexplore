<script setup>
import getData from '~/composables/getData';

const { locale, setLocale } = useI18n()
const fetcher = useFetch();

async function handleClick() {
  const value = await getData('/pokemon');
  console.log(value)
}
</script>

<template>
  <div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('fr')">fr</button>
      <p>{{ $t('welcome') }}</p>
      <v-btn @click="handleClick">Hola</v-btn>
    </div>
  </div>
</template>
    
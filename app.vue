<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Inicio</NuxtLink></li>
          <li><NuxtLink to="/calculadora">Calculadora</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <NuxtLayout>
      <v-app>
        <NuxtPage />
      </v-app>
    </NuxtLayout>
  </div>
</template>

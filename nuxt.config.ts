// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["./assets/css/main.scss"],
  build: {
    transpile: ["vuetify", "lodash-es"],
  },
  modules: [
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./i18n.config.ts", // if you are using custom path, default
      },
    ],
    "@pinia/nuxt",
    "@ant-design-vue/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/supabase",
  ],  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "https://www.example.com/",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: ["/register"],
    },
  },
});

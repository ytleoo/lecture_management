// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  postcss: {
    plugins: { tailwindcss: {} },
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxt/devtools', '@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  imports: {
    dirs: ['composables', 'composables/*/index.{ts,js,mjs,mts}', 'composables/**'],
  },
});

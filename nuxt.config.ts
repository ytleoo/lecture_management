// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: { tailwindcss: {} }
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss']
})

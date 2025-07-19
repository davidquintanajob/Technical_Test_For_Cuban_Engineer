// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  plugins: [
    { src: '~/plugins/leaflet.js', ssr: false }, // Solo en el cliente
  ],
  runtimeConfig: {
    public: {
      backendHost: process.env.NUXT_PUBLIC_BACKEND_HOST
    }
  }
})
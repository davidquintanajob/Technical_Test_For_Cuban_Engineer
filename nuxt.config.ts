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
  },
  app: {
    head: {
      title: 'Task Manager App',
      meta: [
        { name: 'description', content: 'A modern task manager built with Nuxt 3.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Task Manager App' },
        { property: 'og:description', content: 'A modern task manager built with Nuxt 3.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss','@pinia/nuxt'
  ],
  runtimeConfig:{
    public:{
      apiBase: process.env.API_BASE
    }
  },
})

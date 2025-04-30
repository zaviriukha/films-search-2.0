// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'vuetify-nuxt-module',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
      },
      icons: {
        defaultSet: 'mdi'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiKey: "b7f7d13f7fb8d9fa2709ae92515f4247"
    }
  }
})
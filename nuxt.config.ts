import {defineNuxtConfig} from 'nuxt/config'
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  srcDir: 'client/',
  ssr: true,
  experimental: {
      renderJsonPayloads: false
  },

  axios: {
      credentials: true
  },

  devtools: {enabled: true},

  app: {
      head: {
          title: process.env.APP_NAME || '',
          meta: [
              {charset: 'utf-8'},
              {name: 'viewport', content: 'width=device-width, initial-scale=1'}
          ],
          link: [
              {rel: 'icon', type: 'image/ico', href: '/favicon.ico'},
              {rel: 'icon', type: 'image/ico', sizes: "256x256", href: '/favicon.ico'},
              {rel: 'apple-touch-icon', type: 'image/ico', href: '/favicon.ico'},
          ]
      }
  },

  buildModules: [
      '@nuxtjs/tailwindcss',
  ],

  modules: [
      [
          '@pinia/nuxt',
          {
              autoImports: [
                  // automatically imports `defineStore`
                  'defineStore', // import { defineStore } from 'pinia'
                  // automatically imports `defineStore` as `definePiniaStore`
                  ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
              ]
          }
      ],
      '@nuxt/ui'
  ],

  nitro: {
      devProxy: {
          '/api/v1': {
              target: process.env.NUXT_PUBLIC_API_URL?.trim('/') + '/api/v1',
              prependPath: true,
              changeOrigin: true
          },
          '/storage': {
              target: process.env.NUXT_PUBLIC_API_URL?.trim('/') + '/storage',
              prependPath: true,
              changeOrigin: true
          }
      },
  },

  routeRules: {
      '/api/v1/**': { proxy: process.env.NUXT_PUBLIC_API_URL?.trim('/') + '/api/v1' },
  },

  css: [
      '@/assets/css/app.scss',
  ],

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  /**
   * @see https://v3.nuxtjs.org/guide/features/runtime-config#exposing-runtime-config
   */
  runtimeConfig: {
      public: {
          webURL: process.env.NUXT_PUBLIC_WEB_URL || 'http://localhost:3000',
          apiURL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000',
          // wsKey: process.env.PUSHER_APP_KEY,
          // wsHost: process.env.PUSHER_HOST,
          // wsPort: process.env.PUSHER_PORT,
          // wsScheme: process.env.PUSHER_SCHEME,
          // wsAuthEndpoint: process.env.PUSHER_AUTH_ENDPOINT,
          // wsCluster: process.env.PUSHER_APP_CLUSTER,
      }
  },

  build: {
      transpile: ['@vuepic/vue-datepicker'],
  },

  compatibilityDate: '2024-09-09'
})

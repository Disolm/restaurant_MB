export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Megobari ресторан грузинской кухни',
    htmlAttrs: {
      class: ['size'],
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    bodyAttrs: {
      class: ['size'],
    },
  },
  // loading: '~/components/LoadingPage.vue',
  loading: {
    color: '#A67145',
    height: '2px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/scss/global-style.scss',
    '~assets/main.css'
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/style-resources'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}

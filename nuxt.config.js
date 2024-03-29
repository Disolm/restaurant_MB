export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sa\`MegoBro ресторан грузинской кухни',
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
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ],
    bodyAttrs: {
      class: ['size']
    },
    //Map 2GIS
    scrypt: [
      {
        charset: "utf-8",
        src: "https://widgets.2gis.com/js/DGWidgetLoader.js",
        async: true
      }
    ]
  },
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
    '~/plugins/directives.js'
  //   '~/plugins/axios',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    // Simple proxy
    '/json/': {
      target: 'https://samegobro.ru/',
      pathRewrite: { '^/json/': '' }
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    maxChunkSize: 300000,
    filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]',
    }
  },
  filenameHashing: true,
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  pwa: {
    meta: {
      name: 'Sa\'MegoBro',
      theme_color: '#A67145',
      lang: 'ru'
    },
    icon: {
      icons: [64, 120, 144, 152, 192, 384, 512],
      purpose: 'any'
    },
    manifest: {
      name: 'Sa\'MegoBro',
      short_name: 'MB',
      description: 'ресторан грузинской кухни',
      start_url: '/',
      display: 'standalone',
      background_color: '#A67145',
      theme_color: '#f4f4f4',
      lang: 'ru',
      useWebmanifestExtension: false
    }
  }
}

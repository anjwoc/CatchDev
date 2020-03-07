const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  head: {
    title: 'StudyPlatform',
    script: [
    ],
    
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-material-design-icons',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv'
    
  ],
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~plugins/vue-input-tag.js', ssr: false },
    
  ],
  vuetify: {
    treeshake: true,
  },
  moment: {
    locales: ['ko']
  },
  axios: {
    // browserBaseURL: 'https://api.delog.net',
    // baseURL: 'https://api.delog.net',
    browserBaseURL: process.env.NODE_ENV === 'production' ? 'https://api.delog.net' : 'http://localhost:4000',
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.delog.net' : 'http://localhost:4000',
    https: true,
  },
  server: {
    port: 80
  },
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
    vendor: [
      'vue-quill-editor',
    ]
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.delog.net' : 'http://localhost:4000',
    default_img: 'https://catchdev-bucket.s3.ap-northeast-2.amazonaws.com/default/default-profile-image.png',
  }
};
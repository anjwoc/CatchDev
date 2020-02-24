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
  },
  moment: {
    locales: ['ko']
  },
  axios: {
    browserBaseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000',
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000',
    https: false,
  },
  server: {
    port: 3000
  },
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  build: {
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
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://api.delog.net' : 'http://localhost:4000',
  }



};
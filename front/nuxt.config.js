const webpack = require('webpack');

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
    
  ],
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~plugins/vue-input-tag.js', ssr: false },
  ],
  vuetify: {
  },
  axios: {
    browserBaseURL: 'http://localhost:4000',
    baseURL: 'http://localhost:4000',
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



};
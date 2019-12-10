module.exports = {
  head: {
    title: 'title',
    script: [

    ],
    
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-material-design-icons',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    
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
    vendor: [
      'vue-quill-editor',
  ]
  }


};
module.exports = {
  head: {
    title: 'title'
  },
  modules: [
    '@nuxtjs/axios',
    'nuxt-material-design-icons',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    theme: {
      themes: {
          light: {
              'custom-color-one': '#b71c1c',
              'custom-color-two': '#3B8070',
          }
      }
  }
  },
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false,
  },
  server: {
    port: 3000
  }


};
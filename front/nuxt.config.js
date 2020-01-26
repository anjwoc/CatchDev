const webpack = require('webpack');

module.exports = {
  head: {
    title: 'StudyPlatform',
    meta: [{
      charset: 'utf-8',
    },{
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0,user-scalable=yes, viewport-fit=cover',
    },{
      'http-equiv': 'X-UA-Compatible', content:'IE-edge'
    },{
      hid: 'desc', name: 'description', content: '스터디 플랫폼 프로젝트'
    }, {
      hid: 'ogtitle',name: 'og:title', content: 'CatchDev StudyPlatform'
    },{
      hid: 'ogdesc', name: 'og:description', content: '스터디 플랫폼 프로젝트'
    }, {
      hid: 'ogtype',property: 'og:type', content: 'website',
    }, {
      hid: 'ogimage',property: 'og:image', content: ''
      // content에 이미지 주소를 넣으면 메인 커버이미지가 된다.
    },{
      hid: 'ogurl',property: 'og:url', content: 'https://delog.net'
    }],
    link: [{
      // 이 부분도 현재 이미지 없는데 나중에 수정하면된다.
      rel: 'shortcut icon', href: '/favicon-icon.png'
    }],    
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
    treeshake: true,
    theme: {
      themes: {
        light: {
          primary: '#3EA0E1', // a color that is not in the default material colors palette
          accent: '#82B1FF',
          secondary: '#E7E7DE',
          info: '#1976D2',
          error: "#FF5252",
          success: "#4CAF50",
          warning: "#FFC107",
        }
      }
    }
  },
  moment: {
    locales: ['ko']
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
  ],
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
      // console.log('webpack', config, isServer, isClient);
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
  },



};
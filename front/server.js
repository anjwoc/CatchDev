'use strict';
const { Nuxt, Builder } = require('nuxt');
const app = require('./app.js');
const isProd = (process.env.NODE_ENV === 'production');
const config = require('./nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

app.use(nuxt.render);

if (config.dev){
  new Builder(nuxt).build()
    .then(listen);
} else {
  listen();
}

function listen() {
  require('greenlock-express')
  .init({
      packageRoot: __dirname,

      // contact for security and critical bug notices
      maintainerEmail: "anjwoc@gmail.com",

      // where to look for configuration
      configDir: './greenlock.d',

      // whether or not to run at cloudscale
      cluster: false
  })
  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(app);
}



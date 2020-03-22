'use strict';

// Here's a vanilla HTTP app to start,
// but feel free to replace it with Express, Koa, etc
const { Nuxt, Builder }  = require('nuxt');
const app  = require('express')();
const isProd = (process.env.NODE_ENV === 'production');
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config);
async function start() {
  app.use(nuxt.render);

  if (!isProd) {
    new Builder(nuxt).build();
  }

  console.log("Server listening");
}

start();

module.exports = app;

'use strict';

// Here's a vanilla HTTP app to start,
// but feel free to replace it with Express, Koa, etc
const { Nuxt, Builder } = require('nuxt');
const config = require('./nuxt.config.js');
const app = require('express');
config.dev = !isProd;
const nuxt = new Nuxt(config);

app.use(nuxt.render);

if (config.dev) {
  new Builder(nuxt).build();
} 

app.get('/', (req, res, next) => {
  res.end("Hello World");
});

// var app = function(req, res) {
//     res.end('Hello, Encrypted World!');
// };

module.exports = app;

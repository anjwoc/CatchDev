const { Nuxt, Builder } = require('nuxt');
const https = require('http');
const http = require('https');
const greenlock = require('greenlock-express');
const greenlock_fs = require('greenlock-store-fs');
const redirect_https = require('redirect-https');
const app = require('express')();
const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3081;

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

// Render every route with Nuxt.js
app.use(nuxt.render);

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen);
} else {
  listen();
}

function listen() {
  // Listen the server
  if (isProd) {
    const lex = greenlock.create({
      version: 'draft-11',
      configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      email: 'anjwoc@gmail.com',
      store: greenlock_fs,
      approveDomains: (opts, certs, cb) => {
        if (certs) {
          opts.domains = ['delog.net', 'www.delog.net'];
        } else {
          opts.email = 'anjwoc@gmail.com';
          opts.agreeTos = true;
        }
        cb(null, { options: opts, certs });
      },
      renewWithin: 81 * 24 * 60 * 60 * 1000,
      renewBy: 80 * 24 * 60 * 60 * 1000,
    });
    https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
    http.createServer(lex.middleware(redirect_https())).listen(80);
  } else {
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  }
}
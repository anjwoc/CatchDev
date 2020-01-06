import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0d72785e = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _2c815255 = () => interopDefault(import('..\\pages\\new.vue' /* webpackChunkName: "pages_new" */))
const _c8232712 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _64028885 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _2592ff1a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _2e771d80 = () => interopDefault(import('..\\pages\\trending.vue' /* webpackChunkName: "pages_trending" */))
const _115a15fe = () => interopDefault(import('..\\pages\\category\\_name\\index.vue' /* webpackChunkName: "pages_category__name_index" */))
const _7cfb9bda = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _a1bde794 = () => interopDefault(import('..\\pages\\profile\\_id\\index.vue' /* webpackChunkName: "pages_profile__id_index" */))
const _43cad547 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _0d72785e,
    name: "login"
  }, {
    path: "/new",
    component: _2c815255,
    name: "new"
  }, {
    path: "/posting",
    component: _c8232712,
    name: "posting"
  }, {
    path: "/setting",
    component: _64028885,
    name: "setting"
  }, {
    path: "/signup",
    component: _2592ff1a,
    name: "signup"
  }, {
    path: "/trending",
    component: _2e771d80,
    name: "trending"
  }, {
    path: "/category/:name?",
    component: _115a15fe,
    name: "category-name"
  }, {
    path: "/post/:id?",
    component: _7cfb9bda,
    name: "post-id"
  }, {
    path: "/profile/:id?",
    component: _a1bde794,
    name: "profile-id"
  }, {
    path: "/",
    component: _43cad547,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

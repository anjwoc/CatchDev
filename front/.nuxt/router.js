import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9d5fd3c0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _4b4f7897 = () => interopDefault(import('..\\pages\\new.vue' /* webpackChunkName: "pages_new" */))
const _8248bc8e = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _f2208472 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _75e6ca1e = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _237de43e = () => interopDefault(import('..\\pages\\trending.vue' /* webpackChunkName: "pages_trending" */))
const _5750537f = () => interopDefault(import('..\\pages\\category\\_name\\index.vue' /* webpackChunkName: "pages_category__name_index" */))
const _6ee071de = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _74ae6e78 = () => interopDefault(import('..\\pages\\profile\\_id\\index.vue' /* webpackChunkName: "pages_profile__id_index" */))
const _30af19ee = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _9d5fd3c0,
    name: "login"
  }, {
    path: "/new",
    component: _4b4f7897,
    name: "new"
  }, {
    path: "/posting",
    component: _8248bc8e,
    name: "posting"
  }, {
    path: "/setting",
    component: _f2208472,
    name: "setting"
  }, {
    path: "/signup",
    component: _75e6ca1e,
    name: "signup"
  }, {
    path: "/trending",
    component: _237de43e,
    name: "trending"
  }, {
    path: "/category/:name?",
    component: _5750537f,
    name: "category-name"
  }, {
    path: "/post/:id?",
    component: _6ee071de,
    name: "post-id"
  }, {
    path: "/profile/:id?",
    component: _74ae6e78,
    name: "profile-id"
  }, {
    path: "/",
    component: _30af19ee,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1aaa9130 = () => interopDefault(import('..\\pages\\board.vue' /* webpackChunkName: "pages_board" */))
const _13ed9833 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _1fbe29e8 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _6bd5a41a = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _8f95f1cc = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _93c14984 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _4a45f51c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/board",
    component: _1aaa9130,
    name: "board"
  }, {
    path: "/login",
    component: _13ed9833,
    name: "login"
  }, {
    path: "/posting",
    component: _1fbe29e8,
    name: "posting"
  }, {
    path: "/profile",
    component: _6bd5a41a,
    name: "profile"
  }, {
    path: "/setting",
    component: _8f95f1cc,
    name: "setting"
  }, {
    path: "/signup",
    component: _93c14984,
    name: "signup"
  }, {
    path: "/",
    component: _4a45f51c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

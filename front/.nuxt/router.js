import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8fe5e1c6 = () => interopDefault(import('..\\pages\\board.vue' /* webpackChunkName: "pages_board" */))
const _9d5fd3c0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _0772ca8e = () => interopDefault(import('..\\pages\\post.vue' /* webpackChunkName: "pages_post" */))
const _8248bc8e = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _ce6036c0 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _f2208472 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _75e6ca1e = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _30af19ee = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/board",
    component: _8fe5e1c6,
    name: "board"
  }, {
    path: "/login",
    component: _9d5fd3c0,
    name: "login"
  }, {
    path: "/post",
    component: _0772ca8e,
    name: "post"
  }, {
    path: "/posting",
    component: _8248bc8e,
    name: "posting"
  }, {
    path: "/profile",
    component: _ce6036c0,
    name: "profile"
  }, {
    path: "/setting",
    component: _f2208472,
    name: "setting"
  }, {
    path: "/signup",
    component: _75e6ca1e,
    name: "signup"
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

import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9e4c9fbe = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _36113c98 = () => interopDefault(import('..\\pages\\post.vue' /* webpackChunkName: "pages_post" */))
const _92937de0 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _319be5ec = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _9e4c9fbe,
    name: "login"
  }, {
    path: "/post",
    component: _36113c98,
    name: "post"
  }, {
    path: "/signup",
    component: _92937de0,
    name: "signup"
  }, {
    path: "/",
    component: _319be5ec,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

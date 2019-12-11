import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13ed9833 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _07b70a46 = () => interopDefault(import('..\\pages\\post.vue' /* webpackChunkName: "pages_post" */))
const _6bd5a41a = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
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
    path: "/login",
    component: _13ed9833,
    name: "login"
  }, {
    path: "/post",
    component: _07b70a46,
    name: "post"
  }, {
    path: "/profile",
    component: _6bd5a41a,
    name: "profile"
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

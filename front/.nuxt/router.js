import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9d5fd3c0 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _0772ca8e = () => interopDefault(import('..\\pages\\post.vue' /* webpackChunkName: "pages_post" */))
const _6ee071de = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _8248bc8e = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _ce6036c0 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _f2208472 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _75e6ca1e = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _d5127516 = () => interopDefault(import('..\\pages\\board\\_id\\index.vue' /* webpackChunkName: "pages_board__id_index" */))
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
    path: "/post",
    component: _0772ca8e,
    name: "post",
    children: [{
      path: ":id",
      component: _6ee071de,
      name: "post-id"
    }]
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
    path: "/board/:id?",
    component: _d5127516,
    name: "board-id"
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

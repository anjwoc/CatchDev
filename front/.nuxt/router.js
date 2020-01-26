import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7a79e23e = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _c3cc9796 = () => interopDefault(import('..\\pages\\new.vue' /* webpackChunkName: "pages_new" */))
const _367a4352 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _a6520b36 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _211c5293 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _8b038940 = () => interopDefault(import('..\\pages\\trending.vue' /* webpackChunkName: "pages_trending" */))
const _2e908721 = () => interopDefault(import('..\\pages\\category\\_name\\index.vue' /* webpackChunkName: "pages_category__name_index" */))
const _525fdc33 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _3b0ca3d4 = () => interopDefault(import('..\\pages\\profile\\_id\\index.vue' /* webpackChunkName: "pages_profile__id_index" */))
const _9e5b81b2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _7a79e23e,
    name: "login"
  }, {
    path: "/new",
    component: _c3cc9796,
    name: "new"
  }, {
    path: "/posting",
    component: _367a4352,
    name: "posting"
  }, {
    path: "/setting",
    component: _a6520b36,
    name: "setting"
  }, {
    path: "/signup",
    component: _211c5293,
    name: "signup"
  }, {
    path: "/trending",
    component: _8b038940,
    name: "trending"
  }, {
    path: "/category/:name?",
    component: _2e908721,
    name: "category-name"
  }, {
    path: "/post/:id?",
    component: _525fdc33,
    name: "post-id"
  }, {
    path: "/profile/:id?",
    component: _3b0ca3d4,
    name: "profile-id"
  }, {
    path: "/",
    component: _9e5b81b2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

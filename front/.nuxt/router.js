import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13ed9833 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _1fbe29e8 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _8f95f1cc = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _93c14984 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _cb19e210 = () => interopDefault(import('..\\pages\\study\\trending.vue' /* webpackChunkName: "pages_study_trending" */))
const _59fc4b1e = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _d06d596a = () => interopDefault(import('..\\pages\\profile\\_id\\index.vue' /* webpackChunkName: "pages_profile__id_index" */))
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
    path: "/posting",
    component: _1fbe29e8,
    name: "posting"
  }, {
    path: "/setting",
    component: _8f95f1cc,
    name: "setting"
  }, {
    path: "/signup",
    component: _93c14984,
    name: "signup"
  }, {
    path: "/study/trending",
    component: _cb19e210,
    name: "study-trending"
  }, {
    path: "/post/:id?",
    component: _59fc4b1e,
    name: "post-id"
  }, {
    path: "/profile/:id?",
    component: _d06d596a,
    name: "profile-id"
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

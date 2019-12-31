import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13ed9833 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _f507392c = () => interopDefault(import('..\\pages\\new.vue' /* webpackChunkName: "pages_new" */))
const _1fbe29e8 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _8f95f1cc = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _93c14984 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _1ae1c54b = () => interopDefault(import('..\\pages\\trending.vue' /* webpackChunkName: "pages_trending" */))
const _37740e35 = () => interopDefault(import('..\\pages\\category\\all\\index.vue' /* webpackChunkName: "pages_category_all_index" */))
const _6216847f = () => interopDefault(import('..\\pages\\category\\certificate\\index.vue' /* webpackChunkName: "pages_category_certificate_index" */))
const _365fc190 = () => interopDefault(import('..\\pages\\category\\employ\\index.vue' /* webpackChunkName: "pages_category_employ_index" */))
const _2476cf3c = () => interopDefault(import('..\\pages\\category\\etc\\index.vue' /* webpackChunkName: "pages_category_etc_index" */))
const _6866275f = () => interopDefault(import('..\\pages\\category\\exam\\index.vue' /* webpackChunkName: "pages_category_exam_index" */))
const _08afb6f4 = () => interopDefault(import('..\\pages\\category\\language\\index.vue' /* webpackChunkName: "pages_category_language_index" */))
const _cffcb006 = () => interopDefault(import('..\\pages\\category\\programming\\index.vue' /* webpackChunkName: "pages_category_programming_index" */))
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
    path: "/new",
    component: _f507392c,
    name: "new"
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
    path: "/trending",
    component: _1ae1c54b,
    name: "trending"
  }, {
    path: "/category/all",
    component: _37740e35,
    name: "category-all"
  }, {
    path: "/category/certificate",
    component: _6216847f,
    name: "category-certificate"
  }, {
    path: "/category/employ",
    component: _365fc190,
    name: "category-employ"
  }, {
    path: "/category/etc",
    component: _2476cf3c,
    name: "category-etc"
  }, {
    path: "/category/exam",
    component: _6866275f,
    name: "category-exam"
  }, {
    path: "/category/language",
    component: _08afb6f4,
    name: "category-language"
  }, {
    path: "/category/programming",
    component: _cffcb006,
    name: "category-programming"
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

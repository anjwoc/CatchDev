import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2e0fc0ee = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _5c110236 = () => interopDefault(import('..\\pages\\new.vue' /* webpackChunkName: "pages_new" */))
const _0a5bd107 = () => interopDefault(import('..\\pages\\posting.vue' /* webpackChunkName: "pages_posting" */))
const _5b2025d6 = () => interopDefault(import('..\\pages\\setting.vue' /* webpackChunkName: "pages_setting" */))
const _3f7b6c3a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _48039eb0 = () => interopDefault(import('..\\pages\\trending.vue' /* webpackChunkName: "pages_trending" */))
const _356c0fcc = () => interopDefault(import('..\\pages\\category\\all\\index.vue' /* webpackChunkName: "pages_category_all_index" */))
const _552ab964 = () => interopDefault(import('..\\pages\\category\\certificate\\index.vue' /* webpackChunkName: "pages_category_certificate_index" */))
const _b2855cea = () => interopDefault(import('..\\pages\\category\\employ\\index.vue' /* webpackChunkName: "pages_category_employ_index" */))
const _c8cafb72 = () => interopDefault(import('..\\pages\\category\\etc\\index.vue' /* webpackChunkName: "pages_category_etc_index" */))
const _754d7a1a = () => interopDefault(import('..\\pages\\category\\exam\\index.vue' /* webpackChunkName: "pages_category_exam_index" */))
const _6a3cbc7e = () => interopDefault(import('..\\pages\\category\\language\\index.vue' /* webpackChunkName: "pages_category_language_index" */))
const _e9d4463c = () => interopDefault(import('..\\pages\\category\\programming\\index.vue' /* webpackChunkName: "pages_category_programming_index" */))
const _5734ef83 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _3a4c18c6 = () => interopDefault(import('..\\pages\\profile\\_id\\index.vue' /* webpackChunkName: "pages_profile__id_index" */))
const _64681dd7 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _2e0fc0ee,
    name: "login"
  }, {
    path: "/new",
    component: _5c110236,
    name: "new"
  }, {
    path: "/posting",
    component: _0a5bd107,
    name: "posting"
  }, {
    path: "/setting",
    component: _5b2025d6,
    name: "setting"
  }, {
    path: "/signup",
    component: _3f7b6c3a,
    name: "signup"
  }, {
    path: "/trending",
    component: _48039eb0,
    name: "trending"
  }, {
    path: "/category/all",
    component: _356c0fcc,
    name: "category-all"
  }, {
    path: "/category/certificate",
    component: _552ab964,
    name: "category-certificate"
  }, {
    path: "/category/employ",
    component: _b2855cea,
    name: "category-employ"
  }, {
    path: "/category/etc",
    component: _c8cafb72,
    name: "category-etc"
  }, {
    path: "/category/exam",
    component: _754d7a1a,
    name: "category-exam"
  }, {
    path: "/category/language",
    component: _6a3cbc7e,
    name: "category-language"
  }, {
    path: "/category/programming",
    component: _e9d4463c,
    name: "category-programming"
  }, {
    path: "/post/:id?",
    component: _5734ef83,
    name: "post-id"
  }, {
    path: "/profile/:id?",
    component: _3a4c18c6,
    name: "profile-id"
  }, {
    path: "/",
    component: _64681dd7,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

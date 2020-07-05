import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b1e331f2 = () => interopDefault(import('../pages/thesis-2019.vue' /* webpackChunkName: "pages/thesis-2019" */))
const _af7727c6 = () => interopDefault(import('../pages/thesis-2020.vue' /* webpackChunkName: "pages/thesis-2020" */))
const _65766ada = () => interopDefault(import('../pages/js/bootstrap.min.js' /* webpackChunkName: "pages/js/bootstrap.min" */))
const _474b23f8 = () => interopDefault(import('../pages/js/custom.js' /* webpackChunkName: "pages/js/custom" */))
const _12b86234 = () => interopDefault(import('../pages/js/jquery.easing.min.js' /* webpackChunkName: "pages/js/jquery.easing.min" */))
const _7d4555dc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/thesis-2019",
    component: _b1e331f2,
    name: "thesis-2019"
  }, {
    path: "/thesis-2020",
    component: _af7727c6,
    name: "thesis-2020"
  }, {
    path: "/js/bootstrap.min",
    component: _65766ada,
    name: "js-bootstrap.min"
  }, {
    path: "/js/custom",
    component: _474b23f8,
    name: "js-custom"
  }, {
    path: "/js/jquery.easing.min",
    component: _12b86234,
    name: "js-jquery.easing.min"
  }, {
    path: "/",
    component: _7d4555dc,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

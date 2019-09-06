import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login'
import Home from './views/home'

import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Main
    }, {
      path: '/home/comment',
      component: () => import('./views/comment')
    }, {
      path: '/home/material',
      component: () => import('./views/material')
    }, {
      path: '/home/article',
      component: () => import('./views/article')
    }, {
      path: 'publish',
      component: () => import('./views/publish')
    }]
  }]
})

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
// }

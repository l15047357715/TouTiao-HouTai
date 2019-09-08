import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login'
import Home from './views/home'

import Main from './views/home/main'
import NotFound from './views/404'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*', // 匹配所有找不到家的孩子
    component: NotFound
  }, {
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
    }, {
      path: 'publish/:id',
      component: () => import('./views/publish')
    }, {
      path: 'account',
      component: () => import('./views/account')
    }]
  }]
})

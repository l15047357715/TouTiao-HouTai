import Vue from 'vue'
import App from './App.vue'
import router from './routerGuard'
import component from './components'

import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

import axios from './utils/axios.interceptor'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

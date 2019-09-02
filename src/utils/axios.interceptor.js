import axios from 'axios'
import router from '../routerGuard'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  config.headers['Authorization'] = `Bearer ${token}`
  console.log(config)
  return config
}, function () { })

axios.interceptors.response.use(function (response) {
  console.log(response)
  return response.data ? response.data : {}
}, function (err) {
  // debugger
  let status = err.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器或数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      localStorage.clear()
      router.push('/login')
      break
    default:
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  return new Promise(() => { })
})

export default axios

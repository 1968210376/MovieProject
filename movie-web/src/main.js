// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 需要的 element-ui 组件
import './plugins/element.js'
import './assets/css/global.css'

// 引用axios和qs插件
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.use(VueAxios, axios)
Vue.use(qs)

// 设置基础URL为后端服务api地址，注：这里冒号里的，是后台服务器启动的端口地址
axios.defaults.baseURL = 'http://1.94.6.174:3999/'
// axios.defaults.baseURL = 'http://127.0.0.1:3999/'

// 设置请求头，每次ajax请求携带token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 将API方法绑定到全局
Vue.prototype.$axios = axios

/* 解决 axios options请求后台无法接收参数的问题 */
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

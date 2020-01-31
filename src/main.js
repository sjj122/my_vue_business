// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'     // 引入Vue根组件
import router from './router'

// 引入我们项目需要的（按需导入）Element-UI组件
import './plugin/element.js'
// 导入全局样式表
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 配置请求拦截器，支持token验证(不知道token是个啥，当前先放着)
axios.interceptors.request.use(config => {
  //console.log(config)
  //config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定写法，在最后必须包含 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

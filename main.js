import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import './http-interceptor'

Vue.prototype.$http = axios

// 配置环境
/*第一层if判断生产环境和开发环境*/
console.log(process.env)
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_TITLE判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_TITLE === 'production') {
      //production 生产环境
      axios.defaults.baseURL = 'http://baidu.com';

  } else {
      //test 测试环境
      axios.defaults.baseURL = 'http://192.168.1.102:8080';
  }
} else {
  //dev 开发环境
  axios.defaults.baseURL = 'http://192.168.1.102:8080';
}

Vue.config.productionTip = false
fastclick.attach(document.body);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

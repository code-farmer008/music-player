import axios from 'axios'
import store from './store'
import router from './router'

//request拦截器
axios.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  }
);

//respone拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
        clearToken();
      }
    }
    return Promise.reject(error.response);
  }
);

function clearToken(){
  store.commit('removeToken'); //可能是token过期,清除它
  router.push({ //跳转到登录页面
    path: '/login',
    query: { redirect: router.currentRoute.path } // 将跳转的路由path作为参数，登录成功后跳转到该路由
  });
}
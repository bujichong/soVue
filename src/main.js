// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'babel-polyfill';

Vue.use(iView);
Vue.prototype.$http = axios;

Vue.config.productionTip = false


// 引入mockjs
if (process.env.NODE_ENV !== 'production') require('./mock/index.js')

//使用钩子函数对路由进行权限跳转
//router.beforeEach((to, from, next) => {
//  next();
//});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

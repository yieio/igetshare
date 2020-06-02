import Vue from 'vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue';
import App from './App.vue'

import router from './router.js'

import axios from 'axios'
import conf from './config/api.config.js'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.prototype.$conf = conf

Vue.use(VueRouter);
Vue.use(Antd);

new Vue({
  router :router,
  render: h => h(App)  
}).$mount('#app')

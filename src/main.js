import Vue from 'vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue';
import App from './App.vue'

import router from './router.js'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Antd);

new Vue({
  router :router,
  render: h => h(App)  
}).$mount('#app')

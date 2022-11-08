import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/pages/Home/TypeNav';
import store from '@/store'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav);
import { reqCategory } from '@/api';
reqCategory();
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

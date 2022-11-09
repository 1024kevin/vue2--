import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav';
import store from '@/store'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

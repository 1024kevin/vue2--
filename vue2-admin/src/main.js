import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import store from '@/store';
//引入mockServe模拟mock数据
import '@/mock/mockServe';
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

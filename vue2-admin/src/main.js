import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/pagination';
import HintButton from '@/components/hintButton'
import store from '@/store';
//引入mockServe模拟mock数据
import '@/mock/mockServe';
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination)
Vue.component(Carousel.name, Carousel);
Vue.component(HintButton.name,HintButton);
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')

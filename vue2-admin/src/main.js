import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { Button, Row, DatePicker } from 'element-ui';
Vue.component('el-button', Button);
Vue.component('el-row', Row);
Vue.component('el-date-picker', DatePicker);

new Vue({
  
  render: h => h(App),
}).$mount('#app')

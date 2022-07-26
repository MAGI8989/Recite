import Vue from 'vue'
import App from './App.vue'
import './utils/axios'
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import Back from '@/utils/back.js'
import Vant from "vant";
import router from './router'
import store from './store'

import 'swiper/css/swiper.css'

import "vant/lib/index.css";
require('./assets/css/reset.css')

Vue.use(Vant, VueAwesomeSwiper);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Back,
  render: h => h(App)
}).$mount('#app')
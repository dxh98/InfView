import Vue from 'vue'
import App from './App.vue'
import Vant from "vant";
import router from './router'
import store from './store'

import "vant/lib/index.css";
require('./assets/css/reset.css')

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
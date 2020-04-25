// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import { Lazyload, Field } from 'vant'
Vue.prototype.bus = new Vue()
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.use(Field)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

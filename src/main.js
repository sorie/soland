import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from 'es6-promise'
import swiper from 'swiper'

ES6Promise.polyfill()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  swiper,
  render: h => h(App)
}).$mount('#app')

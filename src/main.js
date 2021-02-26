import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from 'es6-promise'
import srEngine from '@/module/srEngine'

ES6Promise.polyfill()
Vue.config.productionTip = false
Vue.use(srEngine);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from 'es6-promise'
import srEngine from '@/module/srEngine'
import { config } from './config';

ES6Promise.polyfill()
Vue.config.productionTip = false
Vue.use(srEngine);
Vue.prototype.appConfig = config
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

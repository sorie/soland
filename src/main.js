import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from 'es6-promise'
// import srEngine from '@/module/srEngine'
import { config } from './config';

const Vue = createApp(App);

ES6Promise.polyfill()
// Vue.prototype.appConfig = config
app.config = config

Vue.use(router);
Vue.use(store).mount('#app');

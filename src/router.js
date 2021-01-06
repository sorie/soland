import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/List.vue'
import Example from '@/views/Example.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/List'
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/about',
      name: 'about',
      component: Example
    }
  ]
})

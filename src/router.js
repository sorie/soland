import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/List.vue'
import Example from '@/views/Example.vue'
 
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

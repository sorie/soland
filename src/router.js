import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/index.vue'
import About from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Main'
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

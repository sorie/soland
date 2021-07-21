import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/List.vue'
import Example from '@/views/Example.vue'
import VideoChat from '@/views/VideoChat.vue'
import Canvas from '@/views/Canvas.vue'
 
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
      path: '/Components',
      name: 'Components',
      component: Example
    },
    {
      path: '/VideoChat',
      name: 'VideoChat',
      component: VideoChat
    },
    {
      path: '/Canvas',
      name: 'Canvas',
      component: Canvas
    }
  ]
})

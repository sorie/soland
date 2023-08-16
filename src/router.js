import { createRouter, createWebHashHistory } from 'vue-router'
import page_list from '@/views/page_list.vue'
import page_example from '@/views/page_example.vue'
import videoChat from '@/views/videoChat.vue'
import page_canvas from '@/views/page_canvas.vue'
 
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/soland',
      redirect: '/page_list'
    },
    {
      path: '/',
      redirect: '/page_list'
    },
    {
      path: '/page_list',
      name: 'page_list',
      component: page_list
    },
    {
      path: '/components',
      name: 'components',
      component: page_example
    },
    {
      path: '/videoChat',
      name: 'videoChat',
      component: videoChat
    }
  ]
})

export default router;

import { createRouter, createWebHashHistory } from 'vue-router'
import cont_list from '@/views/cont_list.vue'
import cont_examples from '@/views/cont_examples.vue'
import cont_videoChat from '@/views/cont_videoChat.vue'
import cont_canvas from '@/views/cont_canvas.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/soland',
      redirect: '/cont_list'
    },
    {
      path: '/',
      redirect: '/cont_list'
    },
    {
      path: '/cont_list',
      name: 'cont_list',
      component: cont_list
    },
    {
      path: '/cont_examples',
      name: 'cont_examples',
      component: cont_examples
    },
    {
      path: '/cont_videoChat',
      name: 'cont_videoChat',
      component: cont_videoChat
    }
  ]
})

export default router;

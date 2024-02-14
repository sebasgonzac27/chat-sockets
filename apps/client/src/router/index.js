import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/create-chat'
    },
    {
      path: '/create-chat',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      props: true,
      component: () => import('@/views/ChatView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router

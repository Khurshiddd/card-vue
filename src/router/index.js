import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/desks',
      name: 'desks',
      component: () => import('@/components/desks/Index.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/desks/:deskId',
      name: 'show',
      component: () => import('@/components/desks/Show.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth/Login.vue')
    }
  ]
})

export default router

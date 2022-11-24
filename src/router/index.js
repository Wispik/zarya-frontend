import { createRouter, createWebHistory } from "vue-router";
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/purchase/:name',
      name: 'purchase',
      component: () => import('../views/PurchaseView.vue')
    }
  ]
})

export default router
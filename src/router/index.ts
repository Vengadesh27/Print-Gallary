import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Templates from '../views/Templates.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates,
    }
  ],
})

export default router

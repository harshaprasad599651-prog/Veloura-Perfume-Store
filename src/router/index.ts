import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import LoginPage from '../pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ],
})

export default router
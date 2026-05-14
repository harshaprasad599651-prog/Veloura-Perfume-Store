import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import LoginPage from '../pages/LoginPage.vue'
import CartPage from '../pages/CartPage.vue'
import ProductDetailPage from '../pages/ProductDetailPage.vue'
import WomensPage from '../pages/WomensPage.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/cart',
      component: CartPage,
    },
    {
      path: '/product/:id',
      component: ProductDetailPage,
    },
    {
      path: '/women',
      component: WomensPage,
    },
  ],
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CustomerMenuView from '@/views/CustomerMenuView.vue'
import ProductOrderView from '@/views/ProductOrderView.vue'
import CartPickUpInformationView from '@/views/CartPickUpInformationView.vue'
import CartPayInformationView from '@/views/CartPayInformationView.vue'
import CartConfirmInformationView from '@/views/CartConfirmInformationView.vue'
import OrderProcessHistoryView from '@/views/OrderProcessHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu',
      name: 'menu',
      component: CustomerMenuView
    },
    {
      path: '/productOrder',
      name: 'productOrder',
      component: ProductOrderView
    },
    {
      path: '/cartPickUpInformation',
      name: 'cartPickUpInformation',
      component: CartPickUpInformationView
    },
    {
      path: '/cartPayInformation',
      name: 'cartPayInformation',
      component: CartPayInformationView
    },
    {
      path: '/cartConfirmInformation',
      name: 'cartConfirmInformation',
      component: CartConfirmInformationView
    },
    {
      path: '/cartConfirmInformation',
      name: 'cartConfirmInformation',
      component: CartConfirmInformationView
    },
    {
      path: '/orderProcessHistory',
      name: 'orderProcessHistory',
      component: OrderProcessHistoryView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

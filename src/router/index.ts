import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/views/HomeView.vue'
import CustomerMenuView from '@/components/views/CustomerMenuView.vue'
import ProductOrderView from '@/components/views/ProductOrderView.vue'
import CartPickUpInformationView from '@/components/views/CartPickUpInformationView.vue'
import CartPayInformationView from '@/components/views/CartPayInformationView.vue'
import CartConfirmInformationView from '@/components/views/CartConfirmInformationView.vue'
import OrderProcessHistoryView from '@/components/views/OrderProcessHistoryView.vue'
import OrderHistoryView from '@/components/views/OrderHistoryView.vue'
import employeeLoginView from '@/components/views/employee/loginView.vue'
import employeeFohOrderView from '@/components/views/employee/foh/orderView.vue'

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
      path: '/productOrder/:id',
      name: 'productOrder',
      component: ProductOrderView,
      props: (route) => ({ id: Number(route.params.id) })
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
    },
    {
      path: '/orderHistory',
      name: 'orderHistory',
      component: OrderHistoryView
    },
    {
      path: '/employeeLogin',
      name: 'employeeLogin',
      component: employeeLoginView
    },
    {
      path: '/employeeFohOrderView',
      name: 'employeeFohOrderView',
      component: employeeFohOrderView
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

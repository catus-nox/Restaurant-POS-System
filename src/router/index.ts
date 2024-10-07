import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/views/customer/HomeView.vue'
import CustomerMenuView from '@/components/views/customer/CustomerMenuView.vue'
import ProductOrderView from '@/components/views/customer/ProductOrderView.vue'
import CartPickUpInformationView from '@/components/views/customer/CartPickUpInformationView.vue'
import CartPayInformationView from '@/components/views/customer/CartPayInformationView.vue'
import CartConfirmInformationView from '@/components/views/customer/CartConfirmInformationView.vue'
import OrderProcessHistoryView from '@/components/views/customer/OrderProcessHistoryView.vue'
import OrderHistoryView from '@/components/views/customer/OrderHistoryView.vue'
import employeeLoginView from '@/components/views/employee/loginView.vue'
import employeeFohOrder from '@/components/views/employee/foh/orderView.vue'
import employeeFohCheckout from '@/components/views/employee/foh/checkoutView.vue'
import employeeBohOrderView from '@/components/views/employee/boh/orderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:table?',
      name: 'home',
      component: HomeView,
      props: (route) => ({ table: route.params.table ? Number(route.params.table) : null })
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/home/:table?',
      name: 'homeWithHomePath',
      component: HomeView,
      props: (route) => ({ table: route.params.table ? Number(route.params.table) : null })
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
      path: '/cartConfirmInformation/:guid',
      name: 'cartConfirmInformation',
      component: CartConfirmInformationView,
      props: (route) => ({ guid: String(route.params.guid) })
    },
    {
      path: '/orderProcessHistory',
      name: 'orderProcessHistory',
      component: OrderProcessHistoryView
    },
    {
      path: '/orderHistory/t=:table?:and?p=:phone?',
      name: 'orderHistory',
      component: OrderHistoryView,
      props: (route) => ({
        phone: route.params.phone ? String(route.params.phone) : null,
        table: route.params.table ? Number(route.params.table) : null,
        and: route.params.and ? '&' : null
      })
    },
    {
      path: '/employeeLogin',
      name: 'employeeLogin',
      component: employeeLoginView
    },
    {
      path: '/employeeFohOrder',
      name: 'employeeFohOrder',
      component: employeeFohOrder
    },
    {
      path: '/employeeFohCheckout/:id',
      name: 'employeeFohCheckout',
      component: employeeFohCheckout,
      props: (route) => ({ id: Number(route.params.id) })
    },
    {
      path: '/employeeBohOrder',
      name: 'employeeBohOrder',
      component: employeeBohOrderView
    }
  ]
})

export default router

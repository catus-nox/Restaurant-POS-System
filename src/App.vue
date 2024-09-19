<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useCustomerStore } from '@/stores/productsStore'
import { Drawer } from 'flowbite'
import { RouterView, useRoute } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
import UiMenuNavbar from '@/components/ui/UiMenuNavbar.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
import EmployeeUiNavbar from '@/components/ui/employee/UiNavbar.vue'
import EmployeeUiOrderDetailsNavbar from '@/components/ui/employee/UiOrderDetailsNavbar.vue'

const route = useRoute()
const menuNavbar = ref<HTMLElement | null>(null)
const drawer = ref<any>(null)
//api
const customerStore = useCustomerStore()
//查看路由狀態
watch(
  () => route.path,
  () => {
    // (newPath, oldPath) => {
    // console.log(`路由從 ${oldPath} 變化到 ${newPath}`)

    // 確保選單關閉
    if (menuNavbar.value) {
      drawer.value.hide()
    }
  }
)
//選單樣式設定
const options = {
  placement: 'left',
  backdrop: true,
  bodyScrolling: false,
  edge: false,
  edgeOffset: '',
  backdropClasses: 'absolute inset-0 z-30 w-full top-14',
  onHide: () => {
    // console.log('drawer is hidden')
  },
  onShow: () => {
    // console.log('drawer is shown')
  },
  onToggle: () => {
    // console.log('drawer has been toggled')
  }
}
//-----
//選單開關
function toggleMenu() {
  drawer.value.toggle()
}
//-----
//選單顯示判斷
function menuState(): boolean {
  return ['menu', 'productOrder', 'orderProcessHistory'].includes(route.name as string)
}
//顯示判斷判斷anchor訂定pt高度
function anchorMainPaddingTopChange() {
  if (menuState()) {
    return 'pt-14'
  }
  return
}
//選單箭頭顯示判斷
function menuArrowState(): boolean {
  return ['productOrder'].includes(route.name as string)
}
//-----
//判斷目前頁面是否為員工
function pageCustomerOrEmployeeState(): boolean {
  return ['employeeLogin', 'employeeFohOrderView', 'employeeFohCheckoutView'].includes(
    route.name as string
  )
}
//-----
//員工-選單顯示判斷
function employeeMenuState(): boolean {
  return ['employeeLogin'].includes(route.name as string)
}

//-----
onMounted(async () => {
  //判斷是否為員工頁面
  if (!pageCustomerOrEmployeeState()) return
  if (localStorage.customer_guid && localStorage.customer_orderId) {
    // 取得購物車商品數量
    await customerStore.fetchCustomerGetOrderInfo(
      localStorage.customer_orderId,
      localStorage.customer_guid
    )
  }
})
// 選單
onMounted(() => {
  watch(
    [menuState, menuArrowState],
    async (newState) => {
      if (newState) {
        await nextTick()
        if (menuNavbar.value) {
          drawer.value = new Drawer(menuNavbar.value, options)
          drawer.value.hide()
        }
      }
    },
    { immediate: true }
  )
})
</script>

<template>
  <template v-if="!pageCustomerOrEmployeeState()">
    <div
      class="top relative m-auto min-h-screen w-full max-w-screen-sm overflow-hidden bg-primary-50"
    >
      <UiMenubar
        v-if="menuState()"
        :menu-state="menuState()"
        :menu-arrow-state="menuArrowState()"
        @toggle-menu="toggleMenu()"
      />
      <div
        v-if="menuState()"
        ref="menuNavbar"
        class="fixed left-auto top-14 z-50 h-[calc(100vh-3.5rem)] w-full max-w-[305px] bg-white opacity-100 transition-all"
        aria-hidden="false"
      >
        <UiMenuNavbar />
      </div>

      <main class="min-h-[calc(100vh-15.75rem)]" :class="anchorMainPaddingTopChange()">
        <RouterView />
      </main>

      <UiFooter />
    </div>
  </template>
  <template v-else>
    <div class="m-auto flex min-h-screen items-center justify-center overflow-hidden">
      <div
        class="h-screen max-h-[834px] w-full max-w-screen-xl bg-secondary-50"
        :class="{ ['flex']: !employeeMenuState() }"
      >
        <EmployeeUiNavbar v-if="!employeeMenuState()"></EmployeeUiNavbar>
        <main class="flex h-full w-full flex-row">
          <RouterView />
          <EmployeeUiOrderDetailsNavbar v-if="!employeeMenuState()" />
        </main>
      </div>
    </div>
  </template>
</template>

<style scoped>
[aria-hidden='true'] {
  left: calc((100% - 640px - 305px) / 2);
  @apply -translate-x-1/2 opacity-0 transition-all;
}
</style>

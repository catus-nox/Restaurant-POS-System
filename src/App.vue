<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useCustomerStore } from '@/stores/productsStore'
import { Drawer } from 'flowbite'
import { RouterView, useRoute } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
import UiMenuNavbar from '@/components/ui/UiMenuNavbar.vue'
import UiFooter from '@/components/ui/UiFooter.vue'

const route = useRoute()
const menuNavbar = ref<HTMLElement | null>(null)
const drawer = ref<any>(null)

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
//選單開關
function toggleMenu() {
  drawer.value.toggle()
}
//選單顯示判斷
function menuState(): boolean {
  return ['menu', 'productOrder', 'orderProcessHistory'].includes(route.name as string)
}
//顯示判斷判斷anchor訂定pt高度
function mainPadding() {
  if (menuState()) {
    return 'pt-14'
  }
  return
}
//選單箭頭顯示判斷
function menuArrowState(): boolean {
  return ['productOrder'].includes(route.name as string)
}
//api
const customerStore = useCustomerStore()
//-----
onMounted(async () => {
  if (localStorage.guid || localStorage.orderId) {
    await customerStore.fetchCustomerGetOrderInfo(localStorage.orderId, localStorage.guid)
  }
  computed(() => customerStore.getOrderInfoData)
})
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
  <UiMenubar
    v-if="menuState()"
    :menu-state="menuState()"
    :menu-arrow-state="menuArrowState()"
    @toggle-menu="toggleMenu()"
  />
  <div
    ref="menuNavbar"
    class="fixed left-auto top-14 z-50 h-[calc(100vh-3.5rem)] w-full max-w-[305px] bg-netural-0 opacity-100 transition-all"
    aria-hidden="false"
  >
    <UiMenuNavbar v-if="menuState()" />
  </div>

  <main class="min-h-[calc(100vh-2.5rem-16.75rem)]" :class="mainPadding()">
    <RouterView />
  </main>

  <UiFooter />
</template>

<style scoped>
[aria-hidden='true'] {
  left: calc((100% - 414px - 305px) / 2);
  @apply -translate-x-1/2 opacity-0 transition-all;
}
</style>

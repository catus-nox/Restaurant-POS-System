<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { Drawer } from 'flowbite'
import { RouterView, useRoute } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
import UiMenuNavbar from '@/components/ui/UiMenuNavbar.vue'
import UiFooter from '@/components/ui/UiFooter.vue'

//---------------------------------------------------------
//判斷進入頁面是否顯示menu
const route = useRoute()
const menuNavbar = ref<HTMLElement | null>(null)
const drawer = ref<any>(null)
watch(
  () => route.path,
  (newPath, oldPath) => {
    // console.log(`路由從 ${oldPath} 變化到 ${newPath}`)
    // 確保選單關閉
    if (menuNavbar.value) {
      drawer.value.hide()
    }
  }
)
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
function menuState(): boolean {
  return ['menu', 'productOrder', 'orderProcessHistory'].includes(route.name as string)
}
function mainPadding() {
  if (menuState()) {
    return 'pt-14'
  }
  return
}
function menuArrowState(): boolean {
  return ['productOrder'].includes(route.name as string)
}

// 在页面挂载时初始化 Drawer
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

//選單開關
function toggleMenu() {
  drawer.value.toggle()
}
//---------------------------------------------------------
</script>

<template>
  <UiMenubar
    :menu-arrow-state="menuArrowState()"
    :menu-state="menuState()"
    @toggle-menu="toggleMenu()"
  />
  <div
    ref="menuNavbar"
    class="fixed left-auto top-14 z-50 h-[calc(100vh-3.5rem)] w-full max-w-[305px] bg-netural-0 opacity-100 transition-all"
    aria-hidden="false"
  >
    <UiMenuNavbar />
  </div>
  <main class="min-h-[calc(100vh-2.5rem-16.75rem)]" :class="mainPadding()">
    <RouterView />
  </main>
  <UiFooter />
</template>
<!-- pinia function -->

<style scoped>
[aria-hidden='true'] {
  left: calc((100% - 414px - 305px) / 2);
  @apply -translate-x-1/2 opacity-0 transition-all;
}
</style>

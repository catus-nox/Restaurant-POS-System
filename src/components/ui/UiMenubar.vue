<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, nextTick } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMenuNavbar from './UiMenuNavbar.vue'
import { Drawer } from 'flowbite'

//判斷進入頁面是否顯示menu
const route = useRoute()
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log(`路由從 ${oldPath} 變化到 ${newPath}`)
    // 確保選單關閉
    // menuClick.value = false
  }
)

const menuNavbar = ref(null)
const drawer: any = ref(null)
const options = {
  placement: 'left',
  backdrop: true,
  bodyScrolling: false,
  edge: false,
  edgeOffset: '',
  backdropClasses: 'fixed inset-0 z-30',
  onHide: () => {
    console.log('drawer is hidden')
  },
  onShow: () => {
    console.log('drawer is shown')
  },
  onToggle: () => {
    console.log('drawer has been toggled')
  }
}
onMounted(async () => {
  await nextTick()
  if (menuNavbar.value) {
    drawer.value = new Drawer(menuNavbar.value, options)
    drawer.value.hide()
  } else {
    console.error('menuNavbar is null')
  }
})
function toggleMenu() {
  drawer.value = new Drawer(menuNavbar.value, options)
  drawer.value.toggle()
}
</script>

<template>
  <template
    v-if="
      ['menu', 'productOrder', 'orderProcessHistory', 'orderHistory'].includes(route.name as string)
    "
  >
    <div class="relative flex h-fit w-full justify-between bg-primary-700 p-3">
      <template
        v-if="['menu', 'orderProcessHistory', 'orderHistory'].includes(route.name as string)"
      >
        <div @click="toggleMenu">
          <UiButton
            :btn-style="'style4'"
            :btn-width="'w-8 h-8'"
            :btn-padding="'p-2'"
            :icon-size="'w-full h-full'"
            :is-only-icon="true"
          >
            <template #only-icon>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </template>
          </UiButton>
        </div>

        <div
          ref="menuNavbar"
          class="fixed left-auto top-14 z-40 -ml-3 h-full w-full max-w-[305px] bg-netural-0"
        >
          <UiMenuNavbar />
        </div>
      </template>

      <template v-else-if="route.name === 'productOrder'">
        <div>
          <UiButton
            :btn-style="'style4'"
            :btn-width="'w-8 h-8'"
            :btn-padding="'p-2'"
            :icon-size="'w-full h-full'"
            :is-only-icon="true"
            :router-name="'menu'"
          >
            <template #only-icon>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </template>
          </UiButton>
        </div>
      </template>

      <div class="inline-flex gap-4">
        <UiButton
          :btn-style="'style4'"
          :btn-width="'w-8 h-8'"
          :btn-padding="'p-2'"
          :icon-size="'w-full h-full'"
          :is-only-icon="true"
          :router-name="'home'"
        >
          <template #only-icon>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </template>
        </UiButton>
        <UiButton
          :btn-style="'style4'"
          :btn-width="'w-8 h-8'"
          :btn-padding="'p-2'"
          :icon-size="'w-full h-full'"
          :is-only-icon="true"
          :router-name="'cartPickUpInformation'"
        >
          <template #only-icon>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </template>
        </UiButton>
      </div>
    </div>
  </template>
</template>

<style scoped></style>

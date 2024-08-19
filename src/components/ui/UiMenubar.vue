<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMenuNavbar from './UiMenuNavbar.vue'
import IconList from '@/components/icons/IconList.vue'
import IconShoppingCartSimple from '@/components/icons/IconShoppingCartSimple.vue'
import IconCaretLeft from '@/components/icons/IconCaretLeft.vue'

//判斷進入頁面是否顯示menu
const route = useRoute()
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log(`路由從 ${oldPath} 變化到 ${newPath}`)
    //確保選單關閉
    menuClick.value = false
  }
)
//控制選單
const menuClick = ref(false)
const menuClickComputed = computed({
  get: () => menuClick.value,
  set: () => {
    menuClick.value = !menuClick.value
  }
})
function toggleMenu() {
  menuClickComputed.value = !menuClickComputed.value
}
</script>

<template>
  <template v-if="['menu', 'productOrder'].includes(route.name as string)">
    <div class="bg-tickets-primary-700 flex h-fit w-full justify-between p-3">
      <template v-if="route.name === 'menu'">
        <div @click="toggleMenu">
          <UiButton
            :btn-style="'style4'"
            :left-icon="IconList"
            :btn-width="'w-9 h-9'"
            :icon-size="'w-4 h-4'"
            :is-only-icon="true"
          />
        </div>
      </template>
      <template v-else-if="route.name === 'productOrder'">
        <div>
          <RouterLink to="/menu">
            <UiButton
              :btn-style="'style4'"
              :left-icon="IconCaretLeft"
              :btn-width="'w-9 h-9'"
              :icon-size="'w-4 h-4'"
              :is-only-icon="true"
            />
          </RouterLink>
        </div>
      </template>

      <UiButton
        :btn-style="'style4'"
        :left-icon="IconShoppingCartSimple"
        :btn-width="'w-9 h-9'"
        :icon-size="'w-4 h-4'"
        :icon-style="'fill-tickets-netural-950 stroke-tickets-netural-950 stroke-2  '"
        :is-only-icon="true"
      />
    </div>
    <template v-if="route.name === 'menu'">
      <UiMenuNavbar v-show="menuClickComputed" />
    </template>
  </template>
</template>

<style scoped></style>

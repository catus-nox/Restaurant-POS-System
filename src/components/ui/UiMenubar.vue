<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiMenuNavbar from './UiMenuNavbar.vue'
import IconList from '@/components/icons/IconList.vue'
import IconShoppingCartSimple from '@/components/icons/IconShoppingCartSimple.vue'

//判斷進入頁面是否顯示menu
const route = useRoute()
watch(
  () => route.path,
  (newPath, oldPath) => {
    // console.log(`路由從 ${oldPath} 變化到 ${newPath}`)
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
  <template v-if="route.name === 'menu'">
    <div class="bg-tickets-primary-700 flex h-fit w-full justify-between p-3">
      <div @click="toggleMenu">
        <UiButton
          :btn-style="'style4'"
          :left-icon="IconList"
          :btn-width="'w-9 h-9'"
          :icon-size="'w-4 h-4'"
          :is-only-icon="true"
        />
      </div>

      <UiButton
        :btn-style="'style4'"
        :left-icon="IconShoppingCartSimple"
        :btn-width="'w-9 h-9'"
        :icon-size="'w-4 h-4'"
        :is-only-icon="true"
      />
    </div>
    <UiMenuNavbar v-show="menuClickComputed" />
  </template>
</template>

<style scoped></style>

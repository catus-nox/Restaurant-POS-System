<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

//判斷進入頁面是否顯示menu
const route = useRoute()
watch(
  () => route.path,
  (newPath, oldPath) => {
    // console.log(`路由從 ${oldPath} 變化到 ${newPath} `)
  }
)
</script>

<template>
  <template v-if="!['home'].includes(route.name as string)">
    <footer class="flex flex-col gap-4 bg-neutral-700 px-4 py-8">
      <div>
        <RouterLink to="/menu">
          <img src="../../assets/img/logo/character-white.png" alt="" srcset="" class="h-16" />
        </RouterLink>
      </div>
      <span class="text-xs text-neutral-300">© 2024 SmartSync. All rights reserved.</span>
      <div class="flex gap-4 text-xs font-normal text-white">
        <span>隱私權保護</span>
        <span>服務條款</span>
        <span>Cookies Settings</span>
      </div>
      <span class="text-xs text-neutral-300"
        >If you are using a screen reader and are having problems using this website, please call
        (+123) 456-7890 for assistance.</span
      >
    </footer>
  </template>
</template>

<style scoped></style>

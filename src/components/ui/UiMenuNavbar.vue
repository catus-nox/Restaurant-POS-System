<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const pages = [
  { text: '會員中心(x)', pathName: '/' },
  { text: '點數兌換商城(x)', pathName: '/' },
  { text: '進度查詢', pathName: '/orderProcessHistory' },
  { text: '店家公告(x)', pathName: '/' },
  { text: '店家地址(x)', pathName: '/' }
]
</script>

<template>
  <div class="top-18 fixed left-auto z-50 h-full w-[305px] bg-white">
    <ul>
      <template v-for="(page, index) in pages" :key="index">
        <li class="border-b border-tickets-netural-300 text-xl">
          <RouterLink :to="page.pathName" class="block p-5">{{ page.text }}</RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped></style>

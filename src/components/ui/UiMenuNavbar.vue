<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const pages = [
  { text: '會員中心', pathName: '/' },
  { text: '點數兌換商城', pathName: '/' },
  { text: '歷史訂單', pathName: '/' },
  { text: '店家公告', pathName: '/' },
  { text: '店家地址', pathName: '/' }
]
</script>

<template>
  <div class="top-18 fixed left-auto z-50 h-full w-[305px] bg-white">
    <ul>
      <template v-for="(page, index) in pages" :key="index">
        <li class="border-tickets-netural-300 border-b text-xl">
          <RouterLink :to="page.pathName" class="block p-5">{{ page.text }}</RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped></style>

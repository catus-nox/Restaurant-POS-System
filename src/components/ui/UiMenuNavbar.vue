<script setup lang="ts">
import 'flowbite'
const pages = [
  { text: '會員中心(x)', pathName: '/' },
  { text: '點數兌換商城(x)', pathName: '/' },
  { text: '進度查詢', pathName: '/orderProcessHistory' },
  { text: '店家公告(x)', pathName: '/' },
  { text: '店家地址(x)', pathName: '/' }
]
</script>

<template>
  <ul>
    <template v-for="(page, index) in pages" :key="index">
      <li class="border-b border-netural-300 text-h5">
        <RouterLink :to="page.pathName" class="block p-5">{{ page.text }}</RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped></style>

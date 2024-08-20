<script setup lang="ts">
const pages = [
  { text: '義式咖啡', press: 'press-menu-navbar-btn' },
  { text: '茶飲', press: '' },
  { text: '冰沙系列', press: '' },
  { text: '蛋糕', press: '' },
  { text: '其他點心', press: '' },
  { text: 'test test', press: '' },
  { text: 'test test', press: '' }
]
</script>

<template>
  <div class="">
    <ul class="scrollbar flex gap-4 overflow-x-auto">
      <template v-for="(page, index) in pages" :key="index">
        <li
          class="text-tickets-netural-600 hover:border-tickets-primary-700 hover:text-tickets-primary-700 block min-w-16 cursor-pointer pb-2 text-center text-base hover:border-b"
          :class="page.press"
        >
          {{ page.text }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.press-menu-navbar-btn {
  @apply border-tickets-primary-700 text-tickets-primary-700 border-b;
}
.scrollbar::-webkit-scrollbar {
  @apply hidden;
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface MenuCategoryItem {
  categoryId?: any // Id
  category: string // 分類名稱 (咖啡、茶飲、蛋糕...)
}
const props = defineProps<{
  menuCategory?: MenuCategoryItem[]
  showId?: any
}>()

// const pages = [
//   { text: '義式咖啡', press: 'press-menu-navbar-btn' },
//   { text: '茶飲', press: '' },
//   { text: '冰沙系列', press: '' },
//   { text: '蛋糕', press: '' },
//   { text: '其他點心', press: '' },
//   { text: 'test test', press: '' },
//   { text: 'test test', press: '' }
// ]
defineEmits(['changeCategoryId'])
</script>

<template>
  <div class="">
    <ul class="scrollbar flex gap-4 overflow-x-auto">
      <template v-for="(category, index) in props.menuCategory" :key="category.categoryId">
        <template v-if="category.categoryId == props.showId">
          <li :id="category.categoryId" class="menu-navbar-btn press-menu-navbar-btn">
            {{ category.category }}
          </li>
        </template>
        <template v-else>
          <li
            :id="category.categoryId"
            @click="$emit('changeCategoryId', category.categoryId, index)"
            class="menu-navbar-btn"
          >
            {{ category.category }}
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.menu-navbar-btn {
  @apply block min-w-16 cursor-pointer pb-2 text-center text-base text-netural-600 hover:border-b-0 hover:border-primary-700 hover:text-primary-700;
}
.press-menu-navbar-btn {
  @apply border-b border-primary-700 text-primary-700;
}
.scrollbar::-webkit-scrollbar {
  @apply hidden;
}
</style>

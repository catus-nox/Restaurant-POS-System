<script setup lang="ts">
import IconMoney from '@/components/icons/IconMoney.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconTicket from '@/components/icons/IconTicket.vue'

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
  <div
    class="border-tickets-netural-900 flex flex-row items-center gap-4 rounded-xl border bg-white p-4 py-3"
  >
    <div class="b flex w-2/4 flex-col gap-3">
      <h3 class="text-h6 font-bold text-black">經典美式咖啡</h3>
      <div
        class="bg-tickets-primary-200 flex w-fit items-center justify-center gap-1 rounded-full px-2.5 py-0.5"
      >
        <IconTicket class="h-3 w-3 stroke-[#314225]" />
        <span class="text-xs text-[#314225]">特價商品不集點</span>
      </div>
      <div class="text-xs text-[#767676]">
        無糖 | 嚴選義式配方豆，使用中烘焙的咖啡豆，口感溫潤豐厚。
      </div>
      <div class="flex"><IconMoney class="h-6 w-6" /> <span class="text font-bold"> 120</span></div>
    </div>
    <div class="w-2/4">
      <div class="relative h-32 overflow-hidden rounded-xl">
        <img src="../../assets/img/1002930.jpg" alt="" class="h-full w-full object-cover" />
        <span
          class="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-lg bg-black"
        >
          <IconPlus class="h-3 w-3 fill-white" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

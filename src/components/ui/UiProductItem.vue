<script setup lang="ts">
import UiBadge from '@/components/ui/UiBadge.vue'
</script>

<template>
  <div
    class="flex flex-row items-center gap-4 rounded-xl border border-netural-900 bg-netural-0 p-4 py-3"
  >
    <div class="b flex w-2/4 flex-col gap-3">
      <h3 class="text-h6 font-bold text-black">經典美式咖啡</h3>
      <UiBadge :style="'textBadge'" :is-icon="true">特價商品不集點</UiBadge>
      <div class="text-xs text-neutral-500">
        無糖 | 嚴選義式配方豆，使用中烘焙的咖啡豆，口感溫潤豐厚。
      </div>
      <div class="flex">
        <svg
          class="h-6 w-6 text-neutral-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
          />
        </svg>
        <span class="text font-bold"> 120</span>
      </div>
    </div>
    <div class="w-2/4">
      <div class="relative h-32 overflow-hidden rounded-xl">
        <img src="../../assets/img/1002930.jpg" alt="" class="h-full w-full object-cover" />
        <span
          class="absolute bottom-2 right-2 flex items-center justify-center rounded-lg bg-black p-1"
        >
          <svg
            class="h-4 w-4 text-netural-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

import UiBadge from '@/components/ui/UiBadge.vue'

interface CategoryItem {
  productId: number
  name: string
  imagePath: string
  isPoint: boolean
  description: string
  price: number
}
const props = defineProps<{
  categoryItem: CategoryItem
}>()

const router: any = useRouter()
function toRouterName(id: any) {
  // console.log(router)
  // console.log(id)

  router.push({ name: 'productOrder', params: { id } })
}
</script>

<template>
  <div
    @click="toRouterName(props.categoryItem.productId)"
    :id="String(props.categoryItem.productId)"
    class="flex cursor-pointer flex-row items-center gap-4 rounded-xl bg-white p-4 py-3 shadow-[inset_0_0_0_1px] shadow-neutral-900 hover:scale-[0.98]"
  >
    <div class="flex w-full flex-col gap-3">
      <h3 class="text-h6 font-bold text-black">{{ props.categoryItem.name }}</h3>
      <UiBadge v-if="props.categoryItem.isPoint" :style="'textBadge'" :is-icon="true"
        >特價商品不集點</UiBadge
      >
      <div class="text-xs text-neutral-500">
        {{ props.categoryItem.description }}
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
        <span class="text font-bold"> {{ props.categoryItem.price }}</span>
      </div>
    </div>
    <div class="relative w-[50%] min-w-[170px] max-w-[300px] overflow-hidden rounded-xl">
      <div class="w-full pt-[calc(100%*1770/2127)]">
        <img
          :src="props.categoryItem.imagePath"
          :alt="props.categoryItem.name"
          class="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>
      <span
        class="absolute bottom-2 right-2 flex items-center justify-center rounded-lg bg-black p-1"
      >
        <svg
          class="h-4 w-4 text-white"
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
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/productsStore'
import UiButton from '@/components/ui/UiButton.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'
import UiBadge from '@/components/ui/UiBadge.vue'

interface CategoryProduct {
  name: string
  productImagePath: string
  isPoint: boolean
  description: string
  price: number
  customization: number[] // An array of numbers
}
const route = useRoute()
const productId: number = Number(route.params.id)

const customerStore = useCustomerStore()
const product = computed<CategoryProduct>(() => customerStore.GetProductData)

onMounted(async () => {
  await customerStore.fetchCustomerGetProduct(productId)
  console.log(product.value)
})

const picked = ref('')
const pickedData = {
  name: '冰塊',
  options: ['少冰', '微冰', '去冰', '熱飲']
}
const checked = ref([])
const checkedData = {
  name: '加購甜點',
  options: [
    {
      item: '奶油烤吐司',
      price: '$100'
    },
    { item: '焦糖胡桃海鹽軟餅乾', price: '$100' },
    { item: '巧克力棉花糖軟餅乾', price: '$100' },
    { item: '肉桂捲捲', price: '$100' },
    { item: '經典奶油可頌', price: '$100' }
  ]
}
const textareaText = ref('')
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <div class="relative h-[200px] overflow-hidden">
        <img src="../../assets/img/1002930.jpg" alt="" class="h-full w-full object-cover" />
        <!-- <img :src="product.productImagePath" alt="" class="h-full w-full object-cover" /> -->
      </div>
    </div>
    <div class="mx-3 flex flex-col gap-2">
      <h3 class="text-h6 font-bold text-black">{{ product.name }}</h3>
      <span class="text font-bold"> ${{ product.price }}</span>
      <UiBadge v-if="product.isPoint" :style="'textBadge'" :is-icon="true">特價商品不集點</UiBadge>
      <div class="text-xs text-neutral-500">
        {{ product.description }}
      </div>
    </div>

    <div class="mx-3 flex flex-col gap-3">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">{{ pickedData.name }}</div>
          <UiBadge :style="'radioBadge'" />
        </div>

        <div class="flex flex-col gap-2">
          <UiInputOption
            v-for="(option, index) in pickedData.options"
            :key="index"
            :id="option"
            :value="option"
            :type="'radio'"
            v-model="picked"
          >
            {{ option }}
          </UiInputOption>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">{{ checkedData.name }}</div>
          <UiBadge :style="'checkboxBadge'" />
        </div>

        <div class="flex flex-col gap-2">
          <UiInputOption
            v-for="(option, index) in checkedData.options"
            :key="index"
            :id="option.item"
            :value="option.item"
            :border-radius="'rounded'"
            v-model="checked"
          >
            {{ option.item }}

            <template #noteIcon>
              <svg
                class="h-2 w-2 text-neutral-600"
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
            </template>
            <template #note> {{ option.price }}</template>
          </UiInputOption>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">餐點備註</div>
          <UiBadge :style="'checkboxBadge'" />
        </div>

        <div class="flex flex-col gap-2">
          <textarea
            class="rounded-lg border border-black px-2 py-1"
            v-model="textareaText"
            rows="3"
            placeholder="新增備註"
          ></textarea>
          <span class="self-end text-netural-600">0/100</span>
        </div>
      </div>

      <div class="flex justify-center">
        <UiCounter :class="['gap-8']">1</UiCounter>
      </div>
      <div class="flex justify-center">
        <UiButton
          :btn-style="'style1'"
          :btn-width="'w-full '"
          :is-only-icon="false"
          :font-size="'text justify-between flex w-full items-center'"
          :font-padding="'px-0'"
          :router-name="'menu'"
          :icon-size="'w-auto'"
        >
          <template #left-icon>
            <span
              class="bet inline-flex h-4 w-4 flex-col items-center justify-center rounded border border-white text-sm"
              ><span class="pb-0.5">1</span></span
            >
          </template>

          <span>加入購物車</span>

          <template #right-icon>
            <span>${{ product.price }}</span>
          </template>
        </UiButton>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped></style>

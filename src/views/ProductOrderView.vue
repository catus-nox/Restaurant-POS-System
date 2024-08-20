<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import IconMoney from '@/components/icons/IconMoney.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconTicket from '@/components/icons/IconTicket.vue'
import IconShoppingCartSimple from '@/components/icons/IconShoppingCartSimple.vue'

const picked = ref('One')
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
        <img src="../../src/assets/img/1002930.jpg" alt="" class="h-full w-full object-cover" />
      </div>
    </div>
    <div class="mx-3 flex flex-col gap-3">
      <div class="flex justify-between">
        <h3 class="text-h6 font-bold text-black">經典美式咖啡</h3>
        <div class="flex">
          <IconMoney class="h-6 w-6" /> <span class="text font-bold"> 120</span>
        </div>
      </div>
      <div
        class="flex w-fit items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
      >
        <IconTicket class="h-3 w-3 stroke-[#314225]" />
        <span class="text-xs text-[#314225]">特價商品不集點</span>
      </div>
      <div class="text-xs text-[#767676]">
        無糖 | 嚴選義式配方豆，使用中烘焙的咖啡豆，口感溫潤豐厚。
      </div>
    </div>
    <!-- ---- -->
    <div class="mx-3 flex flex-col gap-3">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">{{ pickedData.name }}</div>
          <span class="rounded bg-tickets-primary-200 p-1 text-xs">必填</span>
        </div>

        <div class="flex flex-col gap-2">
          <div
            class="flex items-center gap-2"
            v-for="(option, index) in pickedData.options"
            :key="index"
          >
            <input
              class="h-4 w-4 border-[10px] border-black bg-white accent-black"
              type="radio"
              :id="option"
              :value="option"
              v-model="picked"
            />
            <label class="cursor-pointer" :for="option">{{ option }}</label>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">{{ checkedData.name }}</div>
          <span class="rounded bg-tickets-primary-200 p-1 text-xs">選填</span>
        </div>

        <div class="flex flex-col gap-2">
          <div
            class="flex items-center gap-2"
            v-for="(option, index) in checkedData.options"
            :key="index"
          >
            <input
              class="h-4 w-4 border-[10px] border-black bg-white accent-black"
              type="checkbox"
              :id="option.item"
              :value="option.item"
              v-model="checked"
            />
            <label
              class="flex w-full cursor-pointer items-center justify-between"
              :for="option.item"
            >
              <span>{{ option.item }}</span>
              <span class="flex items-center gap-1">
                <IconPlus class="tickets-netural-600 h-3 w-3" />
                <span class="text-xs text-tickets-netural-600"> {{ option.price }}</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">餐點備註</div>
          <span class="rounded bg-tickets-primary-200 p-1 text-xs">選填</span>
        </div>

        <div class="flex flex-col gap-2">
          <textarea
            class="rounded-lg border border-black px-2 py-1"
            v-model="textareaText"
            placeholder="新增備註"
          ></textarea>
          <span class="self-end text-tickets-netural-600">0/100</span>
        </div>
      </div>

      <div class="flex justify-center">
        <UiCounter :font-size="'text-lg'" :btn-size="'w-7 h-7'" :icon-size="'w-3 h-3'" />
      </div>
      <div class="flex justify-center">
        <RouterLink to="/menu" class="w-full">
          <UiButton
            :btn-style="'style1'"
            :btn-width="'w-full '"
            :btn-padding="'px-6 py-2'"
            :icon-size="''"
            :icon-style="''"
            :is-only-icon="false"
            :font-size="'text justify-between flex w-full items-center'"
            :font-padding="'px-0'"
          >
            <span
              class="bet inline-flex h-4 w-4 flex-col items-center justify-center rounded border border-white text-sm"
              ><span>1</span></span
            >
            <span>加入購物車</span> <span>$100</span>
          </UiButton>
        </RouterLink>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer/productsStore'
import { defineProps, defineEmits, computed, onMounted, ref } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
const props = defineProps<{
  menuState?: boolean
  menuArrowState?: boolean
}>()
defineEmits(['toggleMenu'])

//api
const customerStore = useCustomerStore()
// 取得購物車商品數量
const orderInfo: any = computed(() => customerStore.getOrderInfoData)
//計算顯示的數量，若超過 99，顯示 "99+"
const displayOrderQuantity = computed(() => {
  return orderInfo.value.count >= 99 ? '99+' : orderInfo.value.count
})

onMounted(async () => {
  //取得現在購物車的商品筆數跟總價
  await customerStore.fetchCustomerGetOrderInfo()
})
</script>

<template>
  <div
    v-if="props.menuState"
    class="fixed left-auto z-50 flex h-fit w-full max-w-screen-sm justify-between bg-primary-700 p-3"
  >
    <template v-if="!props.menuArrowState">
      <div @click="$emit('toggleMenu')">
        <UiButton
          :btn-style="'style4'"
          :btn-width="'w-8 h-8'"
          :btn-padding="'p-2'"
          :icon-size="'w-full h-full'"
          :is-only-icon="true"
        >
          <template #only-icon>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </template>
        </UiButton>
      </div>
    </template>

    <template v-if="props.menuArrowState">
      <div>
        <UiButton
          :btn-style="'style4'"
          :btn-width="'w-8 h-8'"
          :btn-padding="'p-2'"
          :icon-size="'w-full h-full'"
          :is-only-icon="true"
          :router-name="'menu'"
        >
          <template #only-icon>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </template>
        </UiButton>
      </div>
    </template>

    <div class="inline-flex gap-4">
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-8 h-8'"
        :btn-padding="'p-2'"
        :icon-size="'w-full h-full'"
        :is-only-icon="true"
        :router-name="'home'"
      >
        <template #only-icon>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-width="2"
              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </template>
      </UiButton>
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-8 h-8'"
        :btn-padding="'p-2'"
        :icon-size="'w-full h-full'"
        :is-only-icon="true"
        :router-name="'cartPickUpInformation'"
      >
        <template #only-icon>
          <span
            v-if="orderInfo != undefined && displayOrderQuantity > 0"
            class="absolute right-1 top-1 h-fit min-h-5 w-fit min-w-5 rounded-full border border-secondary-50 bg-error-500 px-0.5 text-xs text-white"
            >{{ displayOrderQuantity }}</span
          >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
        </template>
      </UiButton>
    </div>
  </div>
</template>

<style scoped></style>

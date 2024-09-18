<script setup lang="ts">
import { defineProps, defineModel, type PropType } from 'vue'
const props = defineProps({
  orderData: {
    type: Object as PropType<any>,
    default: () => ({
      orderId: 88,
      orderStatus: '待結帳',
      phone: null,
      time: '00:29點餐',
      totalAmount: 200,
      typeAndNumber: '外帶002'
    })
  }
})
</script>

<template>
  <div
    class="inline-flex overflow-hidden rounded-xl bg-white shadow-[0_0_0_2px] shadow-neutral-900"
  >
    <div class="inline-flex grow flex-col">
      <div class="inline-flex flex-wrap items-center justify-between bg-primary-300 p-4">
        <div class="text-h4 font-bold text-neutral-950">{{ props.orderData.typeAndNumber }}</div>
        <div class="text-base font-normal text-neutral-950">{{ props.orderData.orderStatus }}</div>
      </div>

      <div class="flex grow flex-col gap-2 p-4 text-h5 font-normal text-neutral-950">
        <div class="inline-flex flex-wrap items-center gap-2">
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
            />
          </svg>

          <div v-text="props.orderData.phone ? props.orderData.phone : '-'"></div>
        </div>
        <div class="inline-flex flex-wrap items-center gap-2">
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clip-rule="evenodd"
            />
          </svg>

          <div>{{ props.orderData.time }}</div>
        </div>
        <div class="inline-flex flex-wrap items-center gap-2">
          <svg
            class="h-6 w-6"
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

          <div>{{ props.orderData.totalAmount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

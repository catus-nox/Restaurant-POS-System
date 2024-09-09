<script setup lang="ts">
import UiInput from '@/components/ui/UiInput.vue'
</script>

<template>
  <div class="flex gap-4 p-4">
    <UiInput
      :class="'w-full max-w-[413px] !flex-row items-center gap-2 text-xl'"
      :is-label="true"
      :label="'排序依據'"
      :placeholder="'時間越早優先'"
      :is-important="false"
      :type="'text'"
      :is-icon="true"
    >
      <template #suffix>
        <svg
          class="h-6 w-6 text-neutral-950"
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
            d="m19 9-7 7-7-7"
          />
        </svg>
      </template>
      <template #helper></template>
      <template #validationMessage></template>
    </UiInput>
    <UiInput
      :class="'w-full max-w-[413px] !flex-row items-center gap-2 text-xl'"
      :is-label="true"
      :label="'搜尋訂單'"
      :placeholder="'輸入桌號、編號或手機號碼'"
      :is-important="false"
      :type="'text'"
      :is-icon="true"
    >
      <template #prefix>
        <svg
          class="h-6 w-6 text-neutral-950"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </template>
      <template #helper></template>
      <template #validationMessage></template>
    </UiInput>
  </div>
</template>

<style scoped></style>

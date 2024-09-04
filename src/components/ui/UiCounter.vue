<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

const counterProps = defineProps({
  btnSize: {
    type: String,
    default: 'w-7 h-7'
  },
  iconSize: {
    type: String,
    default: 'w-3 h-3'
  },
  fontSize: {
    type: String,
    default: 'text-lg'
  }
})
</script>

<template>
  <div class="flex gap-4">
    <UiButton :btn-style="'style4'" :is-only-icon="true" :btn-padding="'p-2'">
      <template #only-icon>
        <svg
          class="h-3 w-3 text-neutral-950"
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
            d="M5 12h14"
          />
        </svg> </template
    ></UiButton>
    <span class="text-tickets-netural-950 text"><slot></slot></span>
    <UiButton :btn-style="'style4'" :is-only-icon="true" :btn-padding="'p-2'">
      <template #only-icon>
        <svg
          class="h-3 w-3 text-neutral-950"
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
        </svg> </template
    ></UiButton>
  </div>
</template>

<style scoped></style>

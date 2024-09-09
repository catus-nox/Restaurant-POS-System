<script setup lang="ts">
import { defineEmits, defineModel, computed } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'

defineEmits(['counterPlus', 'counterMinus'])
const model = defineModel()
const increment = () => {
  quantity.value++
}
const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
const quantity: any = computed({
  get: () => model.value,
  set: (value: any) => {
    const parsedValue = parseInt(value, 10)
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      model.value = parsedValue
    } else {
      model.value = 1
    }
  }
})
const updateQuantity = (target: HTMLInputElement) => {
  model.value = target.value
}
</script>

<template>
  <div class="flex w-fit items-center gap-4">
    <UiButton
      @define-function="decrement"
      :btn-style="'style4'"
      :is-only-icon="true"
      :btn-padding="'p-2'"
    >
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
        </svg>
      </template>
    </UiButton>
    <input
      class="text-tickets-neutral-950 block h-4 w-12 min-w-8 border-none bg-opacity-0 text-center text shadow-none outline-none checked:bg-black focus:ring-0 focus-visible:ring-0"
      :value="quantity"
      @input="updateQuantity($event.target as HTMLInputElement)"
    />
    <UiButton
      @define-function="increment"
      :btn-style="'style4'"
      :is-only-icon="true"
      :btn-padding="'p-2'"
    >
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
        </svg>
      </template>
    </UiButton>
  </div>
</template>

<style scoped></style>

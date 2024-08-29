<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'checkbox',
    validator: (value: any): boolean => {
      return ['radio', 'checkbox'].includes(value)
    }
  },
  borderRadius: {
    type: String,
    default: '',
    validator: (value: any): boolean => {
      return ['', 'rounded', 'rounded-full'].includes(value)
    }
  },
  id: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      class="rou h-4 w-4 border-2 border-black bg-white checked:bg-black focus:ring-0"
      :type="props.type"
      :id="props.id"
      :class="[props.borderRadius]"
    />
    <label class="flex w-full cursor-pointer items-center justify-between" :for="props.id">
      <span>
        <slot name="default"></slot>
      </span>
      <span class="flex items-center gap-1">
        <slot name="noteIcon"></slot>
        <span class="text-xs text-netural-600">
          <slot name="note"> </slot>
        </span>
      </span>
    </label>
  </div>
</template>

<style scoped>
.error {
  @apply text-neutral-950 shadow-[0_0_0_2px] shadow-error-700 placeholder:text-neutral-950;
}
</style>

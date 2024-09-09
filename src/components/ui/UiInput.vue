<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  isLabel: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  isHelper: {
    type: Boolean,
    default: false
  },
  isValidationMessage: {
    type: Boolean,
    default: false
  },
  isIcon: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: '',
    validator: (value: string): boolean => {
      return ['error', ''].includes(value)
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-if="isLabel" class="mb-2 flex gap-1 text font-medium">
      <label for="">{{ props.label }}</label>
      <span v-if="isImportant" class="text-error-700">*</span>
    </div>
    <div class="relative flex min-h-10 items-center gap-2 pl-4 pr-3">
      <template v-if="props.isIcon == true">
        <span class="relative z-10">
          <slot name="prefix"></slot>
        </span>
        <input
          :type="props.type"
          :placeholder="props.placeholder"
          class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] bg-neutral-0 absolute left-0 top-0 z-0 h-full w-full rounded-full border-none p-0 py-2 pl-12 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-500 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 hover:placeholder:text-neutral-500 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
          :class="[props.error]"
        />
        <span class="relative z-10">
          <slot name="suffix"></slot>
        </span>
      </template>

      <input
        v-if="props.isIcon == false"
        :type="props.type"
        :placeholder="props.placeholder"
        class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] hover:3 bg-neutral-0 absolute left-0 top-0 z-0 h-full w-full rounded-full border-none p-0 py-2 pl-4 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-300 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
        :class="[props.error]"
      />
    </div>
    <span v-if="props.isHelper" class="text-sm text-neutral-400">
      <slot name="helper"></slot>
    </span>
    <span v-if="props.isValidationMessage" class="self-end text-sm text-error-700">
      <slot name="validationMessage"></slot>
    </span>
  </div>
</template>

<style scoped>
.error {
  @apply text-neutral-950 shadow-[0_0_0_2px] shadow-error-700 placeholder:text-neutral-950;
}
</style>

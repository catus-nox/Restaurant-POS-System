<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  isLabel: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: 'default'
  },
  defaultOption: {
    type: String,
    default: '--請選擇--'
  },
  value: {
    type: String,
    default: '????-??-??'
  },
  forArray: {
    type: Array,
    default: () => []
  },

  isImportant: {
    type: Boolean,
    default: false
  },
  isDefaultDisabled: {
    type: Boolean,
    default: true
  },
  isIcon: {
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
  error: {
    type: String,
    default: '',
    validator: (value: string): boolean => {
      return ['error', ''].includes(value)
    }
  }
})
const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1 text">
    <div v-if="isLabel" class="font w-fix mb-2 flex flex-row gap-1 font-medium">
      <label class="text-nowrap" :for="props.id">{{ props.label }}</label>
      <span v-if="isImportant" class="text-error-700">*</span>
    </div>

    <select
      class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] h-full w-full rounded-full border-none bg-white py-2 pl-4 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-500 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 hover:placeholder:text-neutral-500 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
      v-model="model"
      :id="props.id"
    >
      <option v-if="isDefaultDisabled" value="" disabled>{{ props.defaultOption }}</option>
      <slot name="option" :value="props.value"></slot>
    </select>

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

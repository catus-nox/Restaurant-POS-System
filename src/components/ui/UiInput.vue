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
  id: {
    type: String,
    default: 'default'
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: undefined
  },
  max: {
    type: String,
    default: '????-??-??'
  },
  min: {
    type: String,
    default: '????-??-??'
  },
  step: {
    type: Number,
    default: 1
  },
  value: {
    type: String,
    default: '????-??-??'
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
  titleClass: {
    type: String
  },
  error: {
    type: String,
    default: '',
    validator: (value: string): boolean => {
      return ['error', ''].includes(value)
    }
  }
})
defineEmits(['defineInputFunction', 'defineFocusFunction'])
const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1 text">
    <div
      v-if="isLabel"
      class="font w-fix mb-2 flex flex-row gap-1 font-medium"
      :class="[titleClass]"
    >
      <label class="text-nowrap" :for="props.id">{{ props.label }}</label>
      <span v-if="isImportant" class="text-error-700">*</span>
    </div>
    <div class="relative flex min-h-10 grow items-center gap-2 pl-4 pr-3">
      <template v-if="props.isIcon == true">
        <span class="relative z-10">
          <slot name="prefix"></slot>
        </span>
        <template v-if="['date', 'time', 'datetime-local'].includes(props.type)">
          <input
            :id="props.id"
            :type="props.type"
            :value="props.value"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :placeholder="props.placeholder"
            class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] absolute left-0 top-0 z-0 h-full w-full rounded-full border-none bg-white p-0 py-2 pl-12 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-500 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 hover:placeholder:text-neutral-500 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
            :class="[props.error]"
            v-model="model"
            @focus="$emit('defineFocusFunction')"
            @input="$emit('defineInputFunction')"
          />
        </template>
        <template v-else>
          <input
            :id="props.id"
            :type="props.type"
            :placeholder="props.placeholder"
            class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] absolute left-0 top-0 z-0 h-full w-full rounded-full border-none bg-white p-0 py-2 pl-12 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-500 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 hover:placeholder:text-neutral-500 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
            :class="[props.error]"
            v-model="model"
            @focus="$emit('defineFocusFunction')"
            @input="$emit('defineInputFunction')"
          />
        </template>
        <span class="relative z-10">
          <slot name="suffix"></slot>
        </span>
      </template>
      <template v-if="props.isIcon == false">
        <template v-if="['date', 'time', 'datetime-local'].includes(props.type)">
          <input
            :id="props.id"
            :type="props.type"
            :value="props.value"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :placeholder="props.placeholder"
            class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] hover:3 absolute left-0 top-0 z-0 h-full w-full rounded-full border-none bg-white p-0 py-2 pl-4 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-300 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
            :class="[props.error]"
            v-model="model"
            @focus="$emit('defineFocusFunction')"
            @input="$emit('defineInputFunction')"
          />
        </template>
        <template v-else>
          <input
            :id="props.id"
            :type="props.type"
            :placeholder="props.placeholder"
            class="focus:placeholder:text-neutral-950focus:shadow-[0_0_0_2px] hover:3 absolute left-0 top-0 z-0 h-full w-full rounded-full border-none bg-white p-0 py-2 pl-4 pr-3 font-medium text-neutral-500 shadow-[0_0_0_1px] shadow-neutral-950 placeholder:text-neutral-300 hover:text-neutral-500 hover:shadow-[0_0_0_2px] hover:shadow-primary-600 focus:text-neutral-950 focus:shadow-neutral-950 focus:ring-0 disabled:text-neutral-950 disabled:shadow-[0_0_0_1px] disabled:shadow-neutral-400 disabled:placeholder:text-neutral-950"
            :class="[props.error]"
            v-model="model"
            @focus="$emit('defineFocusFunction')"
            @input="$emit('defineInputFunction')"
          />
        </template>
      </template>
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
input[type='date']::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 1rem;
  width: 100%;
  background-position: right;
}
</style>

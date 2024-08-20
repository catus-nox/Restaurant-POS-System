<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  btnStyle: {
    type: String,
    default: 'style1',
    validator: (value: string) => ['style1', 'style2', 'style3', 'style4'].includes(value)
  },
  isOnlyIcon: Boolean,
  leftIcon: Object,
  rightIcon: Object,
  fontSize: String,
  fontPadding: String,
  iconSize: String,
  iconStyle: String,
  btnWidth: String,
  btnPadding: String,
  btnPress: {
    type: String,
    default: '',
    validator: (value: string) => ['press2', 'press4'].includes(value)
  }
})
</script>

<template>
  <template v-if="props.btnStyle === 'style1'">
    <button
      class="flex items-center justify-center rounded-full bg-tickets-primary-700 font-Noto-Sans-TC hover:bg-tickets-primary-600 hover:shadow-inner-custom1 focus:bg-tickets-primary-500 focus:shadow-inner-custom2 disabled:bg-color-neutral-300 disabled:hover:shadow-none"
      :class="[props.btnWidth, props.btnPadding]"
    >
      <component
        class="stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="px-5 font-normal text-white"
        :class="[props.fontSize, props.fontPadding]"
        v-if="!props.isOnlyIcon"
      >
        <slot></slot>
      </span>
      <component
        class="stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.rightIcon"
      />
    </button>
  </template>

  <template v-if="props.btnStyle === 'style2'">
    <!-- press2 -->
    <button
      class="group flex items-center justify-center rounded-full bg-tickets-primary-50 font-Noto-Sans-TC shadow-inner-custom3 hover:bg-tickets-primary-100 hover:shadow-inner-custom3 focus:bg-tickets-primary-100 focus:shadow-inner-custom4 disabled:bg-color-neutral-300 disabled:shadow-none disabled:hover:shadow-none disabled:focus:shadow-none"
      :class="[props.btnWidth, props.btnPadding, props.btnPress]"
    >
      <component
        class="stroke-tickets-primary-700 group-focus:stroke-tickets-primary-900 group-disabled:stroke-white group-[.press2]:stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="px-5 font-normal text-tickets-primary-700 group-focus:text-tickets-primary-900 group-disabled:text-white group-[.press2]:text-white"
        :class="[props.fontSize, props.fontPadding]"
        v-if="!props.isOnlyIcon"
      >
        <slot></slot>
      </span>
      <component
        class="stroke-tickets-primary-700 group-focus:stroke-tickets-primary-900 group-disabled:stroke-white group-[.press2]:stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.rightIcon"
      />
    </button>
  </template>

  <template v-if="props.btnStyle === 'style3'">
    <button
      class="flex items-center justify-center rounded-full bg-tickets-netural-950 font-Noto-Sans-TC hover:bg-tickets-primary-700 hover:shadow-inner-custom6 focus:bg-tickets-primary-600 focus:shadow-inner-custom2"
      :class="[props.btnWidth, props.btnPadding]"
    >
      <component
        class="stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="px-5 font-normal text-white"
        :class="[props.fontSize, props.fontPadding]"
        v-if="!props.isOnlyIcon"
      >
        <slot></slot>
      </span>
      <component
        class="stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.rightIcon"
      />
    </button>
  </template>

  <template v-if="props.btnStyle === 'style4'">
    <!-- press4 -->
    <button
      class="group flex items-center justify-center rounded-full bg-white font-Noto-Sans-TC shadow-inner-custom7 hover:bg-tickets-primary-100 hover:shadow-inner-custom7 focus:bg-tickets-primary-100 focus:shadow-inner-custom8 disabled:bg-color-neutral-100 disabled:shadow-inner-custom10"
      :class="[props.btnWidth, props.btnPadding, props.btnPress]"
    >
      <component
        class="stroke-tickets-netural-950 group-hover:stroke-tickets-primary-700 group-focus:stroke-tickets-primary-800 group-disabled:stroke-tickets-netural-400 group-[.press4]:stroke-tickets-primary-700"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="px-5 font-normal text-tickets-netural-950 group-hover:text-tickets-primary-700 group-focus:text-tickets-primary-800 group-disabled:text-tickets-netural-400 group-[.press4]:text-tickets-primary-700"
        :class="[props.fontSize, props.fontPadding]"
        v-if="!props.isOnlyIcon"
      >
        <slot></slot>
      </span>
      <component
        class="stroke-tickets-netural-950 group-hover:stroke-tickets-primary-700 group-focus:stroke-tickets-primary-800 group-disabled:stroke-tickets-netural-400 group-[.press4]:stroke-tickets-primary-700"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.rightIcon"
      />
    </button>
  </template>
</template>

<style scoped>
.press2 {
  @apply bg-tickets-primary-800 shadow-none;
}
.press4 {
  @apply bg-white shadow-inner-custom9;
}
</style>

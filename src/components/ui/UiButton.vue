<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  btnStyle: String || 'style1' || 'style2' || 'style3' || 'style4',
  isOnlyIcon: Boolean,
  leftIcon: Object,
  rightIcon: Object,
  fontSize: String,
  fontPadding: String,
  iconSize: String,
  iconStyle: String,
  btnWidth: String,
  btnPadding: String
})
</script>

<template>
  <template v-if="props.btnStyle === 'style1'">
    <button
      class="bg-tickets-primary-700 font-Noto-Sans-TC hover:bg-tickets-primary-600 focus:bg-tickets-primary-500 disabled:bg-color-neutral-300 hover:shadow-inner-custom1 focus:shadow-inner-custom2 flex items-center justify-center rounded-full disabled:hover:shadow-none"
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
      class="bg-tickets-primary-50 font-Noto-Sans-TC hover:bg-tickets-primary-100 focus:bg-tickets-primary-100 disabled:bg-color-neutral-300 hover:shadow-inner-custom3 focus:shadow-inner-custom4 shadow-inner-custom3 group flex items-center justify-center rounded-full disabled:shadow-none disabled:hover:shadow-none disabled:focus:shadow-none"
      :class="[props.btnWidth, props.btnPadding]"
    >
      <component
        class="stroke-tickets-primary-700 group-focus:stroke-tickets-primary-900 group-disabled:stroke-white group-[.press2]:stroke-white"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="text-tickets-primary-700 group-focus:text-tickets-primary-900 px-5 font-normal group-disabled:text-white group-[.press2]:text-white"
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
      class="bg-tickets-netural-950 shadow-inner-custom5 font-Noto-Sans-TC hover:bg-tickets-primary-700 focus:bg-tickets-primary-600 hover:shadow-inner-custom6 focus:shadow-inner-custom2 flex items-center justify-center rounded-full"
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
      class="font-Noto-Sans-TC hover:bg-tickets-primary-100 focus:bg-tickets-primary-100 disabled:bg-color-neutral-100 hover:shadow-inner-custom7 focus:shadow-inner-custom8 shadow-inner-custom7 disabled:shadow-inner-custom10 group flex items-center justify-center rounded-full bg-white"
      :class="[props.btnWidth, props.btnPadding]"
    >
      <component
        class="stroke-tickets-netural-950 group-hover:stroke-tickets-primary-700 group-focus:stroke-tickets-primary-800 group-[.press4]:stroke-tickets-primary-700 group-disabled:stroke-tickets-netural-400"
        :class="[props.iconSize, props.iconStyle]"
        :is="props.leftIcon"
      />
      <span
        class="text-tickets-netural-950 group-hover:text-tickets-primary-700 group-focus:text-tickets-primary-800 group-[.press4]:text-tickets-primary-700 group-disabled:text-tickets-netural-400 px-5 font-normal"
        :class="[props.fontSize, props.fontPadding]"
        v-if="!props.isOnlyIcon"
      >
        <slot></slot>
      </span>
      <component
        class="stroke-tickets-netural-950 group-hover:stroke-tickets-primary-700 group-focus:stroke-tickets-primary-800 group-[.press4]:stroke-tickets-primary-700 group-disabled:stroke-tickets-netural-400"
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
  @apply shadow-inner-custom9 bg-white;
}
</style>

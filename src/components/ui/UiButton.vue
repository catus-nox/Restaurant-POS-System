<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'
import 'flowbite'

interface ButtonStyle {
  style: string
  class: string
}
const btnStyleG: ButtonStyle[] = [
  {
    style: 'style1',
    class: `
    bg-primary-700 text-white 
    hover:bg-primary-600 hover:shadow-[0_0_0_1px] hover:shadow-secondary-200 
    focus:bg-primary-500 focus:shadow-[0_0_0_3px] focus:shadow-secondary-300 
    disabled:bg-neutral-300`
  },
  {
    style: 'style2',
    class: `
    bg-primary-50 text-primary-700 shadow-[0_0_0_1px] shadow-primary-200 
    hover:bg-primary-100  
    focus:text-primary-900 focus:shadow-[0_0_0_3px] focus:shadow-primary-900 
    disabled:bg-neutral-300 disabled:text-white  disabled:shadow-none`
  },
  {
    style: 'style3',
    class: `
    bg-neutral-950 text-white 
    hover:bg-primary-700 hover:shadow-[0_0_0_1px] hover:shadow-secondary-200 
    focus:bg-primary-600 focus:shadow-[0_0_0_3px] focus:shadow-secondary-300
    disabled:bg-neutral-300 disabled:text-white  disabled:shadow-[0_0_0_0px]  disabled:shadow-none
    `
  },
  {
    style: 'style4',
    class: `
    bg-white text-neutral-950 shadow-[0_0_0_1px] shadow-neutral-200 hover:shadow-neutral-200 
    hover:bg-primary-100 hover:text-primary-700 
    focus:bg-primary-100 focus:text-primary-800 focus:shadow-[0_0_0_3px] focus:shadow-primary-800
    disabled:bg-neutral-100 disabled:text-neutral-300  disabled:shadow-[0_0_0_1px]  disabled:shadow-neutral-300 `
  }
]

const props = defineProps({
  btnStyle: {
    type: String,
    default: 'style1',
    validator: (value: string): boolean => {
      return ['style1', 'style2', 'style3', 'style4'].includes(value)
    }
  },
  isOnlyIcon: {
    type: Boolean,
    default: false
  },
  isLeftIcon: {
    type: Boolean,
    default: true
  },
  isRightIcon: {
    type: Boolean,
    default: true
  },
  fontSize: {
    type: String,
    default: 'text'
  },
  iconSize: {
    type: String,
    default: 'w-6 h-6'
  },
  btnWidth: {
    type: String,
    default: 'w-fit'
  },
  btnGap: {
    type: String,
    default: 'gap-1'
  },
  btnPadding: {
    type: String,
    default: 'px-5 py-2.5'
  },
  btnJustify: {
    type: String,
    default: 'justify-center'
  },
  btnPress: {
    type: String,
    default: ''
    // validator: (value: string) => ['press2', 'press4'].includes(value)
  },
  routerName: {
    type: String,
    default: null
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
function toRouterName(routeName: string) {
  if (routeName) {
    router.push({ name: routeName })
  }
}
defineEmits(['defineFunction'])
</script>

<template>
  <template v-for="(btnStyle, index) in btnStyleG" :key="index">
    <template v-if="props.btnStyle === btnStyle.style">
      <button
        @click="$emit('defineFunction'), toRouterName(props.routerName)"
        type="button"
        class="flex items-center rounded-full"
        :class="[
          btnStyle.class,
          props.fontSize,
          props.btnWidth,
          props.btnPadding,
          props.btnGap,
          props.btnJustify,
          props.btnPress
        ]"
        :disabled="props.isDisabled"
      >
        <template v-if="!props.isOnlyIcon">
          <span :class="[props.iconSize]" v-if="props.isLeftIcon">
            <slot name="left-icon"></slot>
          </span>
          <slot name="default"></slot>
          <span :class="[props.iconSize]" v-if="props.isRightIcon">
            <slot name="right-icon"></slot>
          </span>
        </template>
        <template v-else>
          <slot name="only-icon"></slot>
        </template>
      </button>
    </template>
  </template>
</template>

<style scoped>
.press2 {
  @apply bg-primary-800 text-white shadow-none;
}
.press4 {
  @apply bg-white text-primary-700 shadow-[0_0_0_2px] shadow-primary-700;
}
</style>

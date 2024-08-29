<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import 'flowbite'

interface ButtonStyle {
  option: string
  text: string
}
const badgeStyleOption: ButtonStyle[] = [
  {
    option: 'radioBadge',
    text: '必填'
  },
  {
    option: 'checkboxBadge',
    text: '選填'
  },
  {
    option: 'textBadge',
    text: ''
  }
]

const props = defineProps({
  style: {
    type: String,
    default: 'textBadge',
    validator: (value: any) => ['radioBadge', 'checkboxBadge', 'textBadge'].includes(value)
  },
  isIcon: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <template v-for="(badgeStyle, index) in badgeStyleOption" :key="index">
    <template v-if="props.style === badgeStyle.option">
      <span
        class="flex w-fit items-center gap-1 rounded-full bg-primary-200 px-2.5 py-0.5 text-xs font-medium text-neutral-950"
      >
        <template v-if="props.isIcon === true">
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
              stroke-width="2"
              d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
            />
          </svg>
        </template>

        <slot> {{ badgeStyle.text }}</slot>
      </span>
    </template>
  </template>
</template>

<style scoped></style>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'

const counterProps = defineProps({
  btnGroupP: {
    type: String,
    default: 'gap-8'
  },
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
  <div class="flex w-fit" :class="[counterProps.btnGroupP]">
    <UiButton
      :btn-style="'style4'"
      :btn-width="counterProps.btnSize"
      :btn-padding="'p-2'"
      :left-icon="IconMinus"
      :icon-size="counterProps.iconSize"
      :icon-style="'fill-tickets-netural-950 '"
      :is-only-icon="true"
      :font-size="''"
      :font-padding="''"
    />
    <span class="text-tickets-netural-950" :class="[counterProps.fontSize]"> 1 </span>
    <UiButton
      :btn-style="'style4'"
      :btn-width="counterProps.btnSize"
      :btn-padding="'p-2'"
      :left-icon="IconPlus"
      :icon-size="counterProps.iconSize"
      :icon-style="'fill-tickets-netural-950 '"
      :is-only-icon="true"
      :font-size="''"
      :font-padding="''"
    />
  </div>
</template>

<style scoped></style>

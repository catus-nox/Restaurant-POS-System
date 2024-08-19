<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'

const counterProps = defineProps({
  btnSize: String || 'w-7 h-7',
  iconSize: String || 'w-3 h-3',
  fontSize: String || 'text-lg'
})
</script>

<template>
  <div class="flex w-fit gap-8">
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

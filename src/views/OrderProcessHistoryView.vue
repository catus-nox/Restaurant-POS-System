<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
</script>

<template>
  <div class="flex min-h-[60vh] flex-col gap-6 px-3 py-6">
    <div class="flex flex-col justify-end gap-3">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">進度查詢</div>
      </div>
      <UiInput
        :is-label="true"
        :label="'內用桌號'"
        :placeholder="'請填寫桌號'"
        :is-important="false"
        :type="'text'"
      >
        <template #helper></template>
        <template #validationMessage></template>
      </UiInput>
      <UiInput
        :is-label="true"
        :label="'外帶手機號碼'"
        :placeholder="'請填寫手機'"
        :is-important="false"
        :type="'text'"
      >
        <template #helper></template>
        <template #validationMessage></template>
      </UiInput>
    </div>

    <div class="flex items-center justify-center gap-3">
      <UiButton
        :btn-style="'style1'"
        :btn-width="'w-full '"
        :btn-padding="'px-6 py-2'"
        :icon-size="''"
        :icon-style="''"
        :is-only-icon="false"
        :font-size="'text'"
        :font-padding="'px-0'"
        :router-name="'orderHistory'"
      >
        開始查詢
      </UiButton>
    </div>
  </div>
</template>
<style scoped></style>

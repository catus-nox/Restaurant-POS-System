<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
</script>

<template>
  <div class="bg-ad1 flex min-h-screen w-full items-end justify-center bg-cover bg-center px-3">
    <div class="mb-[12vh]">
      <RouterLink to="/menu">
        <UiButton
          :btn-style="'style1'"
          :btn-width="'min-w-60'"
          :btn-padding="'px-5 py-2'"
          :is-only-icon="false"
          :font-size="'text'"
          :font-padding="'px-2.5'"
        >
          查看菜單
        </UiButton>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped></style>

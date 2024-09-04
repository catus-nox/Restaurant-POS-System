<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
</script>

<template>
  <div class="flex min-h-screen w-full items-end justify-center bg-ad1 bg-cover bg-center px-3">
    <div class="mb-[12vh]">
      <UiButton :btn-style="'style1'" :btn-width="'min-w-60'" :router-name="'menu'">
        查看菜單
      </UiButton>
    </div>
  </div>
</template>
<style scoped></style>

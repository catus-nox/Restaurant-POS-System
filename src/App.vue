<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
</script>

<template>
  <UiMenubar />
  <main class="min-h-[calc(100vh-2.5rem-16.75rem)]">
    <RouterView />
  </main>
  <UiFooter />
</template>

<style scoped></style>

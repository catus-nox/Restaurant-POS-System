<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
</script>

<template>
  <body
    class="bg-tickets-primary-50 font-Noto-Sans-TC m-auto min-h-screen w-full max-w-screen-tablet"
  >
    <UiMenubar />
    <main>
      <RouterView />
    </main>
  </body>
</template>

<style scoped></style>

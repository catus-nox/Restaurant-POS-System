<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UiMenubar from '@/components/ui/UiMenubar.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
</script>

<template>
  <body class="m-auto min-h-screen w-full max-w-[414px] bg-tickets-primary-50 font-Noto-Sans-TC">
    <UiMenubar />
    <main>
      <RouterView />
    </main>
    <UiFooter />
  </body>
</template>

<style scoped></style>

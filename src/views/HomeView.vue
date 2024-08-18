<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import testbtn from '@/components/ui/UiButton.vue'
import testIcon from '@/components/icons/IconCaretLeft.vue'
</script>

<template>
  <main>
    <testbtn
      :btn-style="'style1'"
      :left-icon="testIcon"
      :btn-width="'w-fit'"
      :btn-padding="'px-5 py-2'"
      :icon-size="'w-6 h-6'"
      :is-only-icon="false"
      :font-size="'text'"
      :font-padding="'px-2.5'"
    >
      555
    </testbtn>
    <testbtn
      :btn-style="'style2'"
      :left-icon="testIcon"
      :btn-width="'w-fit'"
      :btn-padding="'px-5 py-2'"
      :icon-size="'w-6 h-6'"
      :is-only-icon="false"
      :font-size="'text'"
      :font-padding="'px-2.5'"
    >
      555
    </testbtn>
    <testbtn
      :btn-style="'style3'"
      :left-icon="testIcon"
      :btn-width="'w-fit'"
      :btn-padding="'px-5 py-2'"
      :icon-size="'w-6 h-6'"
      :is-only-icon="false"
      :font-size="'text'"
      :font-padding="'px-2.5'"
    >
      555
    </testbtn>

    <testbtn
      :btn-style="'style4'"
      :left-icon="testIcon"
      :btn-width="'w-fit'"
      :btn-padding="'px-5 py-2'"
      :icon-size="'w-6 h-6'"
      :is-only-icon="false"
      :font-size="'text'"
      :font-padding="'px-2.5'"
    >
      555
    </testbtn>
  </main>
</template>

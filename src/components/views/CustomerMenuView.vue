<script setup lang="ts">
import UiInput from '@/components/ui/UiInput.vue'
import UiShopInformation from '@/components/ui/UiShopInformation.vue'
import UiCustomerMenuNavbar from '@/components/ui/UiCustomerMenuNavbar.vue'
import UiProductItem from '@/components/ui/UiProductItem.vue'

import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <div class="m-3 flex flex-col gap-3">
    <UiShopInformation />

    <UiInput v-model="name" :placeholder="'Search'" :is-icon="true">
      <template #prefix>
        <svg
          class="h-6 w-6 text-neutral-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </template>
    </UiInput>

    <UiCustomerMenuNavbar />

    <h2 class="text-h5 font-bold text-black">義式咖啡</h2>

    <div v-for="index in 10" :key="index">
      <RouterLink to="/productOrder">
        <UiProductItem />
      </RouterLink>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import UiShopInformation from '@/components/ui/UiShopInformation.vue'
import UiCustomerMenuNavbar from '@/components/ui/UiCustomerMenuNavbar.vue'
import UiProductItem from '@/components/ui/UiProductItem.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
</script>

<template>
  <div class="m-3 flex flex-col gap-3">
    <UiShopInformation />

    <!-- input -->
    <div class="border-tickets-netural-900 w-full rounded-full border bg-white px-3 py-2 pl-4">
      <!-- <label for="Search">Name</label> -->
      <div class="flex flex-row gap-2">
        <IconSearch class="fill-tickets-netural-900 h-6 w-6" />
        <input
          type="text"
          id="Search"
          placeholder="Search"
          class="text-gray-500 placeholder:text-gray-500 focus-visible:outline-none"
        />
      </div>
    </div>

    <UiCustomerMenuNavbar />

    <h2 class="text-h5 font-bold text-black">義式咖啡</h2>

    <div v-for="index in 10" :key="index">
      <UiProductItem />
    </div>
  </div>
</template>
<style scoped></style>

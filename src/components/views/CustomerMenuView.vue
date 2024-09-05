<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useCustomerStore } from '@/stores/productsStore'
import UiInput from '@/components/ui/UiInput.vue'
import UiShopInformation from '@/components/ui/UiShopInformation.vue'
import UiCustomerMenuNavbar from '@/components/ui/UiCustomerMenuNavbar.vue'
import UiProductItem from '@/components/ui/UiProductItem.vue'
const customerStore = useCustomerStore()
const menuCategory: any = computed(() => customerStore.GetMenuCategoryData)
const menuItemData: any = computed(() => customerStore.GetMenuItemData)

const chooseCategoryId = ref(menuCategory.value.length > 0 ? menuCategory.value[0].categoryId : '2')
const chooseCategoryIdComputed = computed(() => chooseCategoryId.value)

const searchInput = ref('')

onMounted(async () => {
  await customerStore.fetchCustomerGetMenuCategory()
  await customerStore.fetchCustomerGetMenuItem()
})

const scrollElement = ref<any>(null)
function changeCategoryId(id: any, index: any) {
  chooseCategoryId.value = id
  scrollElement.value[index].scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="m-3 flex flex-col gap-3">
    <UiShopInformation />

    <UiInput v-model="searchInput" :placeholder="'Search'" :is-icon="true">
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

    <UiCustomerMenuNavbar
      :menu-category="menuCategory"
      :show-id="chooseCategoryIdComputed"
      @change-category-id="changeCategoryId"
    />

    <template v-for="(menuItem, index) in menuItemData" :key="index">
      <h2 ref="scrollElement" class="pt-2 text-h5 font-bold text-black">
        {{ menuItem.categoryName }}
      </h2>

      <div v-for="(item, index) in menuItem.categoryItem" :key="index">
        <UiProductItem :category-item="item" />
      </div>
    </template>
  </div>
</template>
<style scoped></style>

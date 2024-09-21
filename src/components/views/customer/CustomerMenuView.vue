<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCustomerStore } from '@/stores/productsStore'
import UiInput from '@/components/ui/UiInput.vue'
import UiShopInformation from '@/components/ui/UiShopInformation.vue'
import UiCustomerMenuNavbar from '@/components/ui/UiCustomerMenuNavbar.vue'
import UiProductItem from '@/components/ui/UiProductItem.vue'
const customerStore = useCustomerStore()
const menuCategory: any = computed(() => customerStore.getMenuCategoryData)
const menuItemData: any = computed(() => customerStore.getMenuItemData)

const searchInput = ref('')
//-----選單滑動+至頂滑動
const chooseCategoryId = ref(menuCategory.value.length > 0 ? menuCategory.value[0].categoryId : '2')
const chooseCategoryIdComputed = computed(() => chooseCategoryId.value)

const topElement = ref<any>('')
const scrollElement = ref<any>(null)
const top: any = ref(window.scrollY)
const fixElement = ref<any>('')
const isFixed = ref(false)

function changeCategoryId(id: any, index: any) {
  chooseCategoryId.value = id
  function getHeader() {
    if (top.value > (fixElement.value.offsetTop || 0)) {
      return (scrollElement.value[index].offsetTop || 0) - (14 + 14) * 4
    } else {
      return (
        (scrollElement.value[index].offsetTop || 0) - (fixElement.value.offsetTop || 0) + 14 * 4
      )
    }
  }
  window.scrollTo({
    top: getHeader(),
    behavior: 'smooth'
  })
}

function fixCustomerMenuNavbar() {
  top.value = window.scrollY
  if (!fixElement.value) return
  if (top.value > fixElement.value.offsetTop) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}
//-----

onMounted(async () => {
  //菜單類別
  await customerStore.fetchCustomerGetMenuCategory()
  //菜單品項
  await customerStore.fetchCustomerGetMenuItem()
  //-----
  fixCustomerMenuNavbar()
  document.addEventListener('scroll', fixCustomerMenuNavbar)
})
</script>

<template>
  <div ref="topElement" class="m-3 mb-0 flex flex-col gap-3 pb-3">
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
  </div>
  <div
    ref="fixElement"
    :class="{ fixed: isFixed }"
    class="top-14 z-20 w-full max-w-screen-sm overflow-x-auto bg-primary-50 p-3"
  >
    <UiCustomerMenuNavbar
      :menu-category="menuCategory"
      :show-id="chooseCategoryIdComputed"
      @change-category-id="changeCategoryId"
    />
  </div>
  <div class="m-3 mt-0 flex flex-col gap-3">
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

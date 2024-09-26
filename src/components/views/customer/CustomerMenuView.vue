<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCustomerStore } from '@/stores/customer/productsStore'
import { useCustomerFunctionDataStore } from '@/stores/customer/functionDataStore'
import UiInput from '@/components/ui/UiInput.vue'
import UiShopInformation from '@/components/ui/customer/UiShopInformation.vue'
import UiCustomerMenuNavbar from '@/components/ui/customer/UiCustomerMenuNavbar.vue'
import UiProductItem from '@/components/ui/customer/UiProductItem.vue'
//-----
const customerStore = useCustomerStore()
const customerFunctionDataStore = useCustomerFunctionDataStore()
const menuCategory: any = computed(() => customerStore.getMenuCategoryData)
const menuItemData: any = computed(() => customerStore.getMenuItemData)
import { useRoute } from 'vue-router'

//
//-----
const route = useRoute()
//-----
//搜尋
const searchInput = ref('')
//-----選單滑動+至頂滑動
const chooseCategoryId = ref(menuCategory.value.length > 0 ? menuCategory.value[0].categoryId : '2')
const chooseCategoryIdComputed = computed(() => chooseCategoryId.value)
//-----
const headerHeight = 14 * 4
const fixSubHeaderHeight = ref<any>(null)
const scrollElement = ref<any>(null)
const isFixed = ref(false)

function changeCategoryId(id: any, index: any) {
  // 獲取當前的滾動位置
  chooseCategoryId.value = id
  function getHeader() {
    if (isFixed.value) {
      return (
        (scrollElement.value[index].offsetTop || 0) -
        (headerHeight + fixSubHeaderHeight.value.offsetHeight)
      )
    } else {
      if (index === 0) {
        return fixSubHeaderHeight.value.offsetHeight + headerHeight
      }
      return (
        (scrollElement.value[index].offsetTop || 0) -
        (headerHeight + fixSubHeaderHeight.value.offsetHeight * 2)
      )
    }
  }
  window.scrollTo({
    top: getHeader(),
    behavior: 'smooth'
  })
}

// 儲存上一次的滾動位置
let lastScrollTop = 0
function fixCustomerMenuNavbar() {
  if (!fixSubHeaderHeight.value) return

  // 獲取當前的滾動位置
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  // 判斷滾動方向
  if (scrollTop > lastScrollTop) {
    // 向下滾動
    if (
      lastScrollTop >
      scrollElement.value[0].offsetTop - fixSubHeaderHeight.value.offsetHeight * 2 - headerHeight
    ) {
      isFixed.value = true
    }
  } else {
    // 向上滾動
    if (lastScrollTop < fixSubHeaderHeight.value.offsetHeight * 2 + headerHeight) {
      isFixed.value = false
    }
  }

  // 更新上一次滾動位置
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // 避免負值
}
//-----

onMounted(async () => {
  //菜單類別
  await customerStore.fetchCustomerGetMenuCategory()
  //菜單品項
  await customerStore.fetchCustomerGetMenuItem()
  //-----
  // 在組件掛載後，訪問 DOM 元素並獲取高度
  fixCustomerMenuNavbar()
  document.addEventListener('scroll', fixCustomerMenuNavbar)
})
</script>

<template>
  <div class="m-3 mb-0 mt-0 flex flex-col gap-3 pb-3 pt-3">
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
    ref="fixSubHeaderHeight"
    :class="{ fixed: isFixed }"
    class="top-14 z-20 w-full max-w-screen-sm overflow-x-auto bg-primary-50 p-3 transition-all"
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

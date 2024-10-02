<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useCustomerStore } from '@/stores/customer/productsStore'
import UiButton from '@/components/ui/UiButton.vue'

//-----
//api
const customerStore = useCustomerStore()
//取得現在購物車的商品筆數跟總價
const orderInfo: any = computed(() => customerStore.getOrderInfoData)
//-----

const props = defineProps({
  fixCartButtonBarWatch: {
    type: Element, // 假設 fixCartButtonBarWatch 可以是數組或對象
    default: () => [] // 如果不提供默認值，設置為空數組
  },
  isContinue: {
    type: Boolean,
    default: false
  },
  isConfirm: {
    type: Boolean,
    default: false
  }
})
// const props = defineProps(['fixCartButtonBarWatch'])
defineEmits(['defineFunction'])
//-----
// 元件是否至頂
const isFixed = ref(false)
// 滾動監聽
function fixCustomerMenuNavbar() {
  // 獲取當前的滾動位置
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  if (scrollTop > elementHeight.value - window.innerHeight) {
    isFixed.value = false
  } else {
    isFixed.value = true
  }
}
//-----
//監聽選單以上元素高度
const elementHeight = ref(0) // 用來儲存元素的高度
function fixCartButtonBar_watchHeight() {
  let resizeObserver: ResizeObserver | null = null
  if (!props.fixCartButtonBarWatch) return
  //監聽高度
  if (props.fixCartButtonBarWatch) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        elementHeight.value = entry.borderBoxSize[0].blockSize // 更新高度
      }
      if (window.innerHeight < elementHeight.value) {
        isFixed.value = true

        document.addEventListener('scroll', fixCustomerMenuNavbar)
      } else {
        isFixed.value = false
        document.removeEventListener('scroll', fixCustomerMenuNavbar)
      }
    })
    resizeObserver.observe(props.fixCartButtonBarWatch) // 開始監聽元素
  }
}

//-----
onMounted(async () => {
  await customerStore.fetchCustomerGetOrderInfo()

  fixCartButtonBar_watchHeight()
  //-----
  // 在組件掛載後，訪問 DOM 元素並獲取高度
  fixCustomerMenuNavbar()
})
// 組件卸載清除監聽
onUnmounted(() => {})
</script>

<template>
  <div
    class="flex items-center justify-center gap-3 border-t border-neutral-500 bg-primary-50 p-3"
    :class="[isFixed ? 'fixed bottom-0 left-1/2 z-30 w-full max-w-screen-sm -translate-x-1/2' : '']"
  >
    <UiButton
      v-if="props.isContinue"
      :btn-style="'style4'"
      :btn-width="'w-fit'"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :is-only-icon="false"
      :font-size="'text whitespace-nowrap !text-black font-medium  '"
      :btn-press="'press4'"
      :router-name="'menu'"
    >
      繼續點餐
    </UiButton>

    <UiButton
      v-if="!props.isConfirm"
      :btn-style="'style1'"
      :btn-width="'w-full '"
      :is-only-icon="false"
      :font-size="'text justify-between flex w-full items-center'"
      :icon-size="'w-auto'"
      @define-function="$emit('defineFunction')"
    >
      <template #left-icon v-if="orderInfo">
        <span
          class="inline-flex h-4 min-w-4 flex-col items-center justify-center rounded border border-white text-sm"
          ><span class="p-0.5">{{ orderInfo.count }}</span></span
        >
      </template>

      <span><slot name="cartText"></slot></span>

      <template #right-icon v-if="orderInfo">
        <span>${{ orderInfo.totalAmount }}</span>
      </template>
    </UiButton>

    <UiButton
      v-if="props.isConfirm"
      :btn-style="'style4'"
      :btn-width="'w-full'"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :is-only-icon="false"
      :font-size="'text '"
      :router-name="'menu'"
    >
      回到首頁
    </UiButton>
  </div>
</template>

<style scoped></style>

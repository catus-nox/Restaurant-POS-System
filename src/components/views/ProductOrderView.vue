<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/productsStore'
import UiButton from '@/components/ui/UiButton.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
//-----
interface CategoryProduct {
  name: string
  productImagePath: string
  isPoint: boolean
  description: string
  price: number
  customization: number[]
}
interface CategoryItem {
  category: number
  categoryName: string
  categoryItem: Product[]
}
interface Product {
  productId: number
  name: string
  imagePath: string
  isPoint: boolean
  description: string
  price: number
}
interface PickedOption {
  id: number
  name: string
  selected: any
  options: string[]
}
//-----api
const route = useRoute()
const productId: number = Number(route.params.id)
const customerStore = useCustomerStore()
const menuItemData: any = computed(() => customerStore.getMenuItemData)
const orderIdData: any = computed(() => customerStore.getOrderIdData)
//抓取產品資料
const product = computed<CategoryProduct>(() => customerStore.getProductData)
//-----抓取加購項目
//加購複選儲存
const productAddOnListSelected = ref<number[]>([])
//加購項目從商品篩出 category = 6
const productAddOnListData = ref<CategoryItem[]>([])
const productAddOnListDataComputed = computed(() => productAddOnListData.value)
function productPickedOptionsAdd6() {
  productAddOnListData.value = menuItemData.value.filter(
    (item: { category: number }) => item.category === 6
  )
}
//-----
//(前端)定義必選項目
const pickedOptions: PickedOption[] = [
  {
    id: 1,
    name: '冰度',
    selected: '少冰',
    options: ['少冰', '微冰', '去冰', '熱飲']
  },
  {
    id: 2,
    name: '冰度(限冷飲)',
    selected: '少冰',
    options: ['少冰', '微冰', '去冰']
  },
  {
    id: 3,
    name: '甜度',
    selected: '無糖',
    options: ['無糖', '微糖', '少糖', '半糖', '全糖']
  },
  {
    id: 4,
    name: '更換燕麥奶',
    selected: '否',
    options: ['否', '是']
  },
  {
    id: 5,
    name: '要不要鮮奶油',
    selected: '否',
    options: ['否', '是']
  }
]
//抓取包含的自訂義項目
const productPickedOptions = ref()
function productPickedOptionFunction() {
  productPickedOptions.value = pickedOptions.filter((option) =>
    product.value.customization.includes(option.id)
  )
}
//整理要給api的客製化項目
function customizationApiData() {
  let optionArray = productPickedOptions.value.map((option: any) => ({
    options: option.selected
  }))
  let addArray = productAddOnListData.value[0].categoryItem
    .filter((product) => productAddOnListSelected.value.includes(product.productId))
    .map((product) => ({
      options: product.name,
      extraPrice: product.price
    }))

  let textareaArray = [
    {
      options: textareaText.value
    }
  ]
  let allData = optionArray.concat(addArray).concat(textareaArray)

  return allData
}
//-----
// 計算選中的總價格
const totalPrice = computed(() => {
  return productAddOnListDataComputed.value[0]?.categoryItem
    .filter((option) => productAddOnListSelected.value.includes(option.productId))
    .reduce((sum, option) => sum + option.price, product.value.price)
})
//-----
//備註文字
const textareaText = ref('')
//判斷最高字數，最高數入數量
watch(textareaText, (newValue) => {
  if (newValue.length > 100) {
    textareaText.value = newValue.slice(0, 100) // 截斷文字
  }
})
//-----
//商品初始數量
const count = ref(1)
//-----
//加入購物車按鈕
async function getOrderId() {
  //驗證碼判斷新增
  if (
    localStorage.customer_guid == 'undefined' ||
    localStorage.customer_guid == 'null' ||
    !localStorage.customer_guid
  ) {
    await customerStore.fetchCustomerGetOrderId()
    localStorage.customer_guid = orderIdData.value.guid
  }
  if (
    localStorage.customer_orderId == 'undefined' ||
    localStorage.customer_orderId == 'null' ||
    !localStorage.customer_orderId
  ) {
    localStorage.customer_orderId = orderIdData.value.orderId
  }
  //購物車訂單送出
  console.log(customizationApiData())

  const data = {
    guid: localStorage.customer_guid, //識別碼guid(抓cookie)
    orderId: Number(localStorage.customer_orderId), //訂單編號(抓cookie)
    productId: Number(productId), //商品編號
    //客製化選項
    customization: customizationApiData(),
    serving: Number(count.value) //份數(int)
  }
  await customerStore.fetchCustomerAddItem(data)
  //購物車數量變更
  await customerStore.fetchCustomerGetOrderInfo(
    localStorage.customer_orderId,
    localStorage.customer_guid
  )
  computed(() => customerStore.getOrderInfoData)
  alert('加入購物車成功')
}
//-----
onMounted(async () => {
  await customerStore.fetchCustomerGetMenuItem()
  await customerStore.fetchCustomerGetProduct(productId)
  productPickedOptionsAdd6()
  productPickedOptionFunction()
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <div class="relative h-[200px] overflow-hidden">
        <img
          :src="product.productImagePath"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
    <div class="mx-3 flex flex-col gap-2">
      <h3 class="text-h6 font-bold text-black">{{ product.name }}</h3>
      <span class="text font-bold"> ${{ product.price }}</span>
      <UiBadge v-if="product.isPoint" :style="'textBadge'" :is-icon="true">特價商品不集點</UiBadge>
      <div class="text-xs text-neutral-500">
        {{ product.description }}
      </div>
    </div>

    <div class="mx-3 flex flex-col gap-3">
      <div class="flex flex-col gap-3">
        <template v-for="(productPickedOption, index) in productPickedOptions" :key="index">
          <div class="flex items-center justify-between">
            <div class="text-h6 text-black">{{ productPickedOption.name }}</div>
            <UiBadge :style="'radioBadge'" />
          </div>
          <div class="flex flex-col gap-2">
            <UiInputOption
              v-for="PickedOption in productPickedOption.options"
              :key="PickedOption"
              :id="PickedOption"
              :value="PickedOption"
              :type="'radio'"
              v-model="productPickedOption.selected"
            >
              {{ PickedOption }}
            </UiInputOption>
          </div>
        </template>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">加購項目</div>
          <UiBadge :style="'checkboxBadge'" />
        </div>
        <div class="flex flex-col gap-2">
          <template v-if="productAddOnListData.length > 0 && productAddOnListData[0].categoryItem">
            <UiInputOption
              v-for="productAddOn in productAddOnListData[0].categoryItem"
              :key="String(productAddOn.productId)"
              :id="String(productAddOn.productId)"
              :value="productAddOn.productId"
              :type="'checkbox'"
              :border-radius="'rounded'"
              v-model="productAddOnListSelected"
            >
              {{ productAddOn.name }}
              <template #noteIcon>
                <svg
                  class="h-2 w-2 text-primary-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </template>
              <template #note> $ {{ productAddOn.price }}</template>
            </UiInputOption>
          </template>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">餐點備註</div>
          <UiBadge :style="'checkboxBadge'" />
        </div>
        <div class="flex flex-col gap-2">
          <textarea
            class="rounded-lg border border-black px-2 py-1 !outline-none focus:border-black focus:ring-0"
            v-model="textareaText"
            rows="3"
            placeholder="新增備註"
          ></textarea>
          <span class="self-end text-neutral-600">{{ textareaText.length }}/100</span>
        </div>
      </div>

      <div class="flex justify-center">
        <UiCounter :class="['gap-8']" v-model="count">1</UiCounter>
      </div>

      <div class="flex justify-center">
        <UiButton
          :btn-style="'style1'"
          :btn-width="'w-full '"
          :is-only-icon="false"
          :font-size="'text justify-between flex w-full items-center'"
          :font-padding="'px-0'"
          :router-name="'menu'"
          :icon-size="'w-auto'"
          @define-function="getOrderId"
        >
          <template #left-icon>
            <span
              class="inline-flex h-4 min-w-4 flex-col items-center justify-center rounded border border-white text-sm"
              ><span class="p-0.5">{{ count }}</span></span
            >
          </template>

          <span>加入購物車</span>

          <template #right-icon>
            <span>${{ totalPrice * count }}</span>
          </template>
        </UiButton>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped></style>

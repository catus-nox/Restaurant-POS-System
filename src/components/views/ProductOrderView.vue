<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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
  customization: number[] // An array of numbers
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
  name: string
  selected: any
  options: string[]
}
//------
const route = useRoute()
const productId: number = Number(route.params.id)
//-----api
const customerStore = useCustomerStore()
const menuItemData: any = computed(() => customerStore.getMenuItemData)
const orderIdData: any = computed(() => customerStore.getOrderIdData)
//抓取加購項目
const productAddOnListData = ref<CategoryItem[]>([])
const productAddOnList = computed(() => productAddOnListData.value)
//抓取產品資料
const product = computed<CategoryProduct>(() => customerStore.getProductData)
//定義加購項目
const pickedOptions = ref<{ [key: number]: PickedOption }>({
  1: {
    name: '冰度',
    selected: '少冰',
    options: ['少冰', '微冰', '去冰', '熱飲']
  },
  2: {
    name: '冰度(限冷飲)',
    selected: '少冰',
    options: ['少冰', '微冰', '去冰']
  },
  3: {
    name: '甜度',
    selected: '無糖',
    options: ['無糖', '微糖', '少糖', '半糖', '全糖']
  },
  4: {
    name: '更換燕麥奶',
    selected: '否',
    options: ['否', '是']
  },
  5: {
    name: '要不要鮮奶油',
    selected: '否',
    options: ['否', '是']
  }
})
const checked = ref<number[]>([])
computed
//篩選加購項目
const productAddOnNumber = ref<any[]>([])
// 計算選中的總價格

const totalPrice = computed(() => {
  return productAddOnList.value[0]?.categoryItem
    .filter((option) => checked.value.includes(option.productId))
    .reduce((sum, option) => sum + option.price, product.value.price)
})

//-----

const textareaText = ref('')
const count = ref(1)
//-----

async function getOrderId() {
  //驗證碼判斷新增
  if (localStorage.guid == 'undefined' || !localStorage.guid) {
    await customerStore.fetchCustomerGetOrderId()
    localStorage.guid = orderIdData.value.guid
  }
  if (localStorage.orderId == 'undefined' || !localStorage.orderId) {
    localStorage.orderId = orderIdData.value.orderId
  }
  //購物車訂單送出
  const data = {
    guid: localStorage.guid, //識別碼guid(抓cookie)
    orderId: Number(localStorage.orderId), //訂單編號(抓cookie)
    productId: Number(productId), //商品編號
    //客製化選項
    customization: [],
    serving: Number(count.value) //份數(int)
  }
  await customerStore.fetchCustomerAddItem(data)
  //購物車數量變更
  await customerStore.fetchCustomerGetOrderInfo(localStorage.orderId, localStorage.guid)
  computed(() => customerStore.getOrderInfoData)
}
//-----
onMounted(async () => {
  await customerStore.fetchCustomerGetMenuItem()
  await customerStore.fetchCustomerGetProduct(productId)

  productAddOnListData.value = menuItemData.value.filter(
    (item: { category: number }) => item.category === 6
  )
  productAddOnNumber.value = product.value.customization
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <div class="relative h-[200px] overflow-hidden">
        <img src="../../assets/img/1002930.jpg" alt="" class="h-full w-full object-cover" />
        <!-- <img :src="product.productImagePath" alt="" class="h-full w-full object-cover" /> -->
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
      <template v-for="(customizationItem, index) in product.customization" :key="index">
        <div class="flex flex-col gap-3">
          <template v-if="customizationItem == 6">
            <div class="flex items-center justify-between">
              <div class="text-h6 text-black">加購項目</div>
              <UiBadge :style="'checkboxBadge'" />
            </div>
            <div class="flex flex-col gap-2">
              <template
                v-if="productAddOnListData.length > 0 && productAddOnListData[0].categoryItem"
              >
                <UiInputOption
                  v-for="option in productAddOnListData[0].categoryItem"
                  :key="String(option.productId)"
                  :id="String(option.productId)"
                  :value="option.productId"
                  :type="'checkbox'"
                  :border-radius="'rounded'"
                  v-model="checked"
                >
                  {{ option.name }}
                  <template #noteIcon>
                    <svg
                      class="h-2 w-2 text-neutral-600"
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
                  <template #note> {{ option.price }}</template>
                </UiInputOption>
              </template>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center justify-between">
              <div class="text-h6 text-black">{{ pickedOptions[customizationItem]?.name }}</div>
              <UiBadge :style="'radioBadge'" />
            </div>
            <div class="flex flex-col gap-2">
              <UiInputOption
                v-for="option in pickedOptions[customizationItem]?.options"
                :key="option"
                :id="option"
                :value="option"
                :type="'radio'"
                v-model="pickedOptions[customizationItem].selected"
              >
                {{ option }}
              </UiInputOption>
            </div>
          </template>
        </div>
      </template>

      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="text-h6 text-black">餐點備註</div>
          <UiBadge :style="'checkboxBadge'" />
        </div>

        <div class="flex flex-col gap-2">
          <textarea
            class="rounded-lg border border-black px-2 py-1"
            v-model="textareaText"
            rows="3"
            placeholder="新增備註"
          ></textarea>
          <span class="self-end text-netural-600">0/100</span>
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

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  validateReceipt,
  receiptValidateData,
  validateTaxId,
  taxIdValidateData
} from '@/models/validate'
import router from '@/router'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'
import { useCustomerStore } from '@/stores/productsStore'

//-----
//選單控制
const nowClick = ref<number>(0)
function toggleMenu(index: number) {
  nowClick.value = index
}

//-----
//api
const customerStore = useCustomerStore()
//取得購物車現有訂單
const cartData: any = computed(() => customerStore.getCartData)
//取得現在購物車的商品筆數跟總價
const orderInfoData: any = computed(() => customerStore.getOrderInfoData)

//-----
//發票資訊
const customerStatus = [
  { name: '現金付款', id: '現金付款' },
  { name: 'Line Pay', id: 'linePay' }
]
const payData: {
  name: string
  options: {
    name: string
    id: '載具' | '統編' | '捐贈發票' | '紙本'
  }[]
} = {
  name: '發票資訊',
  options: [
    { name: '手機載具', id: '載具' },
    { name: '公司統一編號', id: '統編' },
    { name: '捐贈發票', id: '捐贈發票' },
    { name: '發票紙本證明聯', id: '紙本' }
  ]
}
//預設紙本
const pay = ref(payData.options[3].id)

//-----
//載具
const receipt = ref<any>(undefined)
//載具驗證結果
const isValidReceipt = ref<boolean>(false)

//-----
//統編
const taxId = ref<any>(undefined)
//統編驗證結果
const isValidTaxId = ref<boolean>(false)

//-----
//前往結帳
async function confirmOrder() {
  function goCheckoutValidate(): boolean {
    //載具判斷
    if (
      pay.value == payData.options[0].id &&
      !validateReceipt(isValidReceipt.value, receipt.value)
    ) {
      alert(receiptValidateData.validationMessage)
      return false
    }
    //統編判斷
    if (pay.value == payData.options[1].id && !validateTaxId(isValidTaxId.value, taxId.value)) {
      alert(taxIdValidateData.validationMessage)
      return false
    }
    return true
  }

  if (!goCheckoutValidate()) return

  //-----
  // 給api的data資訊
  let invoiceCarrierDate: any = null
  if (pay.value === payData.options[0].id) {
    invoiceCarrierDate = receipt.value
  } else if (pay.value === payData.options[1].id) {
    invoiceCarrierDate = taxId.value
  }

  let data: {
    orderId: Number
    guid: String
    invoice: '載具' | '統編' | '捐贈發票' | '紙本' //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
    invoiceCarrier?: String | null //發票載具號碼or統編
    confirmUrl?: String | null //line pay
    cancelUrl?: String | null //line pay
  } = {
    orderId: Number(localStorage.orderId),
    guid: String(localStorage.guid),
    invoice: pay.value,
    invoiceCarrier: invoiceCarrierDate
  }

  //-----
  // 判斷付款資訊打api
  if (nowClick.value == 0) {
    await customerStore.fetchCustomerPostConfirmOrderCash(data)
    toRouterName('cartConfirmInformation')
  } else if (nowClick.value == 1) {
    data.confirmUrl = 'http://localhost:5173/cartPayInformation'
    data.cancelUrl = 'http://localhost:5173/menu'
    await customerStore.fetchCustomerPostConfirmOrderLinePay(data)
  }
}

//-----
//換頁
function toRouterName(name: string) {
  router.push({ name, params: { guid: localStorage.guid } })

  localStorageClear()
}

//-----
//清除 localStorage
function localStorageClear() {
  localStorage.clear()
}

//-----
onMounted(async () => {
  //取得購物車現有訂單
  await customerStore.fetchCustomerGetCart(localStorage.orderId, localStorage.guid)
  //取得現在購物車的商品筆數跟總價
  await customerStore.fetchCustomerGetOrderInfo(localStorage.orderId, localStorage.guid)
})
</script>

<template>
  <div>
    <UiCartProcess :status="'-translate-x-[10%]'" :done="1" />
  </div>
  <div class="flex flex-col gap-6 px-3 py-6">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="text-xl font-semibold text-black">付款資訊</div>
      </div>
      <div class="flex gap-3">
        <template v-for="(sta, index) in customerStatus" :key="index">
          <template v-if="index === nowClick">
            <div @click="toggleMenu(index)">
              <UiButton
                :btn-style="'style4'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs font-medium'"
                :btn-press="'press4'"
              >
                {{ sta.name }}
              </UiButton>
            </div>
          </template>
          <template v-else>
            <div @click="toggleMenu(index)">
              <UiButton
                :btn-style="'style4'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs font-medium'"
              >
                {{ sta.name }}
              </UiButton>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex flex-col gap-2" v-for="(option, index) in payData.options" :key="index">
        <div class="flex items-center justify-between" v-if="index === 0">
          <div class="text text-black">發票資訊</div>
          <UiBadge :style="'radioBadge'" />
        </div>

        <UiInputOption
          :key="index"
          :id="option.name"
          :value="option.id"
          :type="'radio'"
          v-model="pay"
        >
          {{ option.name }}
        </UiInputOption>

        <div class="flex flex-col gap-2" v-if="index === 0 && pay === payData.options[0].id">
          <UiInput
            :id="'receipt'"
            :is-label="false"
            :label="'請輸入載具'"
            :placeholder="receiptValidateData.placeholder"
            :is-important="false"
            :type="'text'"
            v-model="receipt"
            :is-validation-message="!validateReceipt(isValidReceipt, receipt)"
          >
            <template #helper></template>
            <template #validationMessage>{{ receiptValidateData.validationMessage }} </template>
          </UiInput>
        </div>
        <div class="flex flex-col gap-2" v-if="index === 1 && pay === payData.options[1].id">
          <UiInput
            :id="'taxId'"
            :is-label="false"
            :label="'請輸入統編'"
            :placeholder="taxIdValidateData.placeholder"
            :is-important="false"
            :type="'text'"
            v-model="taxId"
            :is-validation-message="!validateTaxId(isValidTaxId, taxId)"
          >
            <template #helper></template>
            <template #validationMessage>{{ taxIdValidateData.validationMessage }} </template>
          </UiInput>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">訂單內容</div>
      </div>
      <template v-if="orderInfoData">
        <template v-for="(cart, index) in cartData" :key="index">
          <div
            class="flex items-center justify-between rounded-lg border border-neutral-950 bg-white p-3"
          >
            <div class="flex grow items-center gap-4">
              <div
                class="inline-flex h-9 min-w-9 flex-col items-center justify-center rounded bg-primary-100 px-1 py-2 font-bold text-black"
              >
                {{ cart.serving }}
              </div>
              <div class="flex grow flex-row items-center gap-3">
                <div class="text-base font-bold text-black">{{ cart.name }}</div>
                <div class="text-xs font-medium text-neutral-300">
                  {{ cart.customization.join(' |') }}
                </div>
                <div class="self-end text-base font-bold text-black">$ {{ cart.price }}</div>
              </div>
            </div>
          </div>
        </template>
      </template>

      <div class="inline-flex items-center justify-between p-3 text-base font-bold text-black">
        <div>應付金額</div>
        <div v-if="orderInfoData">$ {{ orderInfoData.totalAmount }}</div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center gap-3 border-t border-neutral-500 p-3">
    <UiButton
      :btn-style="'style4'"
      :btn-width="'w-fit'"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :icon-style="''"
      :is-only-icon="false"
      :font-size="'text whitespace-nowrap !text-black font-medium  '"
      :font-padding="'px-0'"
      :btn-press="'press4'"
      :router-name="'menu'"
    >
      繼續點餐
    </UiButton>

    <UiButton
      :btn-style="'style1'"
      :btn-width="'w-full '"
      :is-only-icon="false"
      :font-size="'text justify-between flex w-full items-center'"
      :font-padding="'px-0'"
      :icon-size="'w-auto'"
      @define-function="confirmOrder"
    >
      <template #left-icon v-if="orderInfoData">
        <span
          class="inline-flex h-4 min-w-4 flex-col items-center justify-center rounded border border-white text-sm"
          ><span class="p-0.5">{{ orderInfoData.count }}</span></span
        >
      </template>

      <span>前往結帳</span>

      <template #right-icon v-if="orderInfoData">
        <span>${{ orderInfoData.totalAmount }}</span>
      </template>
    </UiButton>
  </div>
</template>
<style scoped></style>

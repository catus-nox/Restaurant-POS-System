<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useEmployeeFunctionDataStore } from '@/stores/employee/functionDataStore'
import UiButton from '@/components/ui/UiButton.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import {
  validateReceipt,
  receiptValidateData,
  validateTaxId,
  taxIdValidateData,
  phoneValidateData,
  validatePhoneNumber
} from '@/models/validate'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'

//-----
const route = useRoute()
//-----
//api
const employeeStore = useEmployeeStore()
const employeeFunctionDataStore = useEmployeeFunctionDataStore()
const customerFunction = useAllFunctionDataStore()
//-----
const productId: number = Number(route.params.id)
//取得單一訂單資訊
const orderDetailData = computed(() => employeeStore.getFohFetOrderDetailData)

function pay() {
  router.push({
    name: 'employeeFohCheckout',
    params: { id: employeeFunctionDataStore.getNowOrderDetailId }
  })
}
async function finish() {
  function goCheckoutValidate(): boolean {
    if (!employeeFunctionDataStore.getNowCustomerCash) {
      customerFunction.getAlertStatusFunction(true, '請輸入現金', 2)
      return false
    }
    if (orderDetailData.value.totalAmount > employeeFunctionDataStore.getNowCustomerCash) {
      customerFunction.getAlertStatusFunction(true, '金額不足', 2)
      return false
    }

    //載具判斷
    if (
      employeeFunctionDataStore.getNowCustomerPay == '載具' &&
      !validateReceipt(
        employeeFunctionDataStore.getNowCustomerIsValidReceipt,
        employeeFunctionDataStore.getNowCustomerReceipt
      )
    ) {
      customerFunction.getAlertStatusFunction(true, receiptValidateData.validationMessage, 2)
      return false
    }
    //統編判斷
    if (
      employeeFunctionDataStore.getNowCustomerPay == '統編' &&
      !validateTaxId(
        employeeFunctionDataStore.getNowCustomerIsValidTaxId,
        employeeFunctionDataStore.getNowCustomerTaxId
      )
    ) {
      customerFunction.getAlertStatusFunction(true, taxIdValidateData.validationMessage, 2)
      return false
    }
    //電話判斷
    if (
      employeeFunctionDataStore.getNowCustomerPhoneNumber &&
      !validatePhoneNumber(
        employeeFunctionDataStore.getNowCustomerIsValidPhoneNumber,
        employeeFunctionDataStore.getNowCustomerPhoneNumber
      )
    ) {
      customerFunction.getAlertStatusFunction(true, phoneValidateData.validationMessage, 2)
      return false
    }
    return true
  }

  if (!goCheckoutValidate()) return
  let data: any = {
    orderId: Number(employeeFunctionDataStore.getNowOrderDetailId),
    cash: Number(employeeFunctionDataStore.getNowCustomerCash),
    invoice: employeeFunctionDataStore.getNowCustomerPay
  }
  if (employeeFunctionDataStore.getNowCustomerPay == '載具') {
    data.invoiceCarrier = employeeFunctionDataStore.getNowCustomerReceipt
  }
  if (employeeFunctionDataStore.getNowCustomerPay == '統編') {
    data.invoiceCarrier = employeeFunctionDataStore.getNowCustomerTaxId
  }
  if (employeeFunctionDataStore.getNowCustomerPhoneNumber) {
    data.phone = employeeFunctionDataStore.getNowCustomerPhoneNumber
  }
  if (employeeFunctionDataStore.getNowCustomerNote) {
    data.note = employeeFunctionDataStore.getNowCustomerNote
  }
  await employeeStore.fetchEmployeeFohCheckout(data)
}
function geMeal(orderId: number) {
  employeeStore.fetchEmployeeFohOrderCompleted(orderId)
}
function statusBtnFunction(status: string, orderId: number) {
  let routeStatus = ['employeeFohCheckout'].includes(route.name as string)
  if (routeStatus) {
    finish()
    return
  }
  if (status == '待結帳') {
    pay()
  }
  if (status == '待取餐') {
    geMeal(orderId)
  }
}

function employeeFohGetOrderDetailPosition(): boolean {
  return ['employeeFohCheckout'].includes(route.name as string)
}
onMounted(async () => {
  //判斷是否有訂單資訊
  if (!orderDetailData.value) return
  //取得單一訂單資訊
  await employeeStore.fetchEmployeeFohGetOrderDetail(productId)
})
</script>

<template>
  <div
    v-if="orderDetailData"
    class="inline-flex w-full max-w-[362px] grow flex-col bg-white shadow-[inset_0_0_0_1px] shadow-neutral-300 transition-all"
    :class="!employeeFunctionDataStore.getOrderDetailsNavBarIsShow ? '!w-0 overflow-hidden' : ''"
  >
    <div
      v-show="employeeFunctionDataStore.getOrderDetailsNavBarIsShow"
      class="relative inline-flex items-center justify-center bg-primary-700 px-2.5 py-3 text-white"
    >
      <span
        v-if="!employeeFohGetOrderDetailPosition()"
        class="absolute right-2.5 top-3 cursor-pointer"
        @click="employeeFunctionDataStore.getOrderDetailsNavBarIsShowFunction(false)"
      >
        <svg
          class="h-6 w-6"
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </span>
      <div class="text-2xl font-bold">訂單詳細資訊</div>
    </div>

    <div
      class="flex flex-col gap-3 border-b px-6 py-4 text-neutral-950 shadow-[inset_0_-2px_0_-1px] shadow-neutral-300"
    >
      <div class="inline-flex items-center justify-between">
        <div class="text-[24px] font-bold">{{ orderDetailData.typeAndNumber }}</div>
        <div class="text-xl font-normal">{{ orderDetailData.orderStatus }}</div>
      </div>
      <!-- <UiButton
        :btn-style="'style3'"
        :btn-padding="'px-4 py-2'"
        :icon-size="''"
        :is-only-icon="false"
        :font-size="'text-xs font-medium'"
        :is-left-icon="true"
      >
        <template #left-icon>
          <svg
            class="h-4 w-4"
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
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </template>
        編輯訂單
      </UiButton> -->
      <div class="flex flex-col justify-center text-xl font-normal">
        <div class="inline-flex items-center gap-2">
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
            />
          </svg>

          <div v-text="orderDetailData.phone ? orderDetailData.phone : '-'"></div>
        </div>
        <div class="inline-flex items-center gap-2">
          <svg
            class="h-6 w-6"
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
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div>{{ orderDetailData.time }}</div>
        </div>
        <div class="inline-flex items-center gap-2">
          <svg
            class="h-6 w-6"
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
              d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
            />
          </svg>
          <div>訂單編號 {{ orderDetailData.orderNumber }}</div>
        </div>
      </div>
    </div>

    <div
      class="flex grow basis-0 flex-col gap-2 overflow-y-auto px-6 py-4 text-base font-normal text-neutral-950"
    >
      <template v-for="(item, index) in orderDetailData.items" :key="index">
        <div class="inline-flex items-center justify-between">
          <div class="inline-flex grow flex-col">
            <div>{{ item.name }}</div>
            <div class="text-sm text-neutral-500">{{ item.customization }}</div>
          </div>
          <div class="flex min-w-28 items-center justify-between gap-3">
            <div class="text-xl">{{ item.serving }}</div>
            <div>$ {{ item.price }}</div>
          </div>
        </div>
      </template>
    </div>

    <div
      class="flex flex-col items-center gap-3 px-6 py-4 shadow-[inset_0_2px_0_-1px] shadow-neutral-300"
    >
      <div class="flex w-full grow flex-col gap-1 text-xl font-normal text-neutral-950">
        <div class="inline-flex grow items-center justify-between">
          <div>數量</div>
          <div>{{ orderDetailData.count }}</div>
        </div>
        <div class="inline-flex grow items-center justify-between">
          <div>總計</div>
          <div>$ {{ orderDetailData.totalAmount }}</div>
        </div>
      </div>

      <div class="inline-flex w-full items-center gap-4">
        <!-- <UiButton
          :btn-style="'style4'"
          :btn-padding="'px-4 py-2'"
          :icon-size="''"
          :is-only-icon="false"
          :font-size="'text font-medium text-nowrap'"
        >
          取消訂單
        </UiButton> -->

        <UiButton
          v-if="orderDetailData.orderStatus !== '已完成'"
          :btn-style="'style3'"
          :btn-padding="'px-4 py-2'"
          :icon-size="''"
          :is-only-icon="false"
          :font-size="'text font-medium'"
          :btn-width="'w-full'"
          :is-disabled="orderDetailData.orderStatus == '準備中'"
          @define-function="statusBtnFunction(orderDetailData.orderStatus, orderDetailData.orderId)"
        >
          <span v-text="orderDetailData.orderStatus == '待結帳' ? '前往結帳' : '完成訂單'"> </span>
        </UiButton>
      </div>
    </div>
    <div class="absolute left-[330px] top-[8px] h-6 w-6"></div>
  </div>
</template>

<style scoped></style>

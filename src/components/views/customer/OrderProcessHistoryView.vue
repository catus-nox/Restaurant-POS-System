<script setup lang="ts">
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
import { useCustomerStore } from '@/stores/customer/productsStore'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { ref } from 'vue'
import {
  validatePhoneNumber,
  phoneValidateData,
  validateTable,
  tableValidateData
} from '@/models/validate'
import router from '@/router'
//api
const customerStore = useCustomerStore()
const customerFunction = useAllFunctionDataStore()
//-----
//手機
const phoneNumber = ref<any>()
//手機驗證結果
const isValidPhoneNumber = ref<boolean>(false)
//手機是否點擊過輸入框
const isTouchPhoneNumber = ref<boolean>(false)
//-----
//桌號
//取得掃碼桌號
const tableNumber = ref<any>()
//桌號驗證結果
const isValidTable = ref<boolean>(false)
//桌號是否點擊過輸入框
const isTouchTable = ref<boolean>(false)
//-----
async function goCheckHistory() {
  let data: { tableNumber?: Number; phoneNumber?: String } = {
    tableNumber: undefined,
    phoneNumber: undefined
  }
  //送出資料驗證
  function dataValidate(): boolean {
    //桌號驗證
    if (tableNumber.value && !validateTable(isValidTable.value, tableNumber.value)) {
      customerFunction.getAlertStatusFunction(true, tableValidateData.validationMessage, 2)
      return false
    } else {
      data.tableNumber = tableNumber.value
    }
    //電話驗證
    if (phoneNumber.value && !validatePhoneNumber(isValidPhoneNumber.value, phoneNumber.value)) {
      customerFunction.getAlertStatusFunction(true, phoneValidateData.validationMessage, 2)
      return false
    } else {
      data.phoneNumber = phoneNumber.value
    }

    if (!tableNumber.value && !phoneNumber.value) {
      customerFunction.getAlertStatusFunction(true, '請輸入查詢資訊', 2)
      return false
    }

    return true
  }
  if (!dataValidate()) return

  //訂單查詢(桌號、手機)
  await customerStore.fetchCustomerSearchOrders(data)

  router.push({
    name: 'orderHistory',
    params: {
      table: data.tableNumber ? Number(data.tableNumber) : null,
      phone: data.phoneNumber ? String(data.phoneNumber) : null,
      and: data.tableNumber && data.phoneNumber ? '&' : null
    }
  })
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-15.75rem-3.25rem)] flex-col gap-6 px-3 py-6">
    <div class="flex flex-col justify-end gap-3">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">進度查詢</div>
      </div>
      <UiInput
        :is-label="true"
        :label="'內用桌號'"
        :placeholder="tableValidateData.placeholder"
        :is-important="false"
        :type="'text'"
        v-model="tableNumber"
        :is-validation-message="!validateTable(isValidTable, tableNumber, true)"
      >
        <template #helper></template>
        <template #validationMessage>{{ tableValidateData.validationMessage }} </template>
      </UiInput>
      <UiInput
        :id="'phoneNumber'"
        :is-label="true"
        :label="'請輸入手機號碼'"
        :placeholder="phoneValidateData.placeholder"
        :is-important="false"
        :type="'text'"
        v-model="phoneNumber"
        :is-validation-message="!validatePhoneNumber(isValidPhoneNumber, phoneNumber, true)"
      >
        <template #helper></template>
        <template #validationMessage>{{ phoneValidateData.validationMessage }} </template>
      </UiInput>
    </div>

    <div class="flex items-center justify-center gap-3">
      <UiButton
        :btn-style="'style1'"
        :btn-width="'w-full '"
        :btn-padding="'px-6 py-2'"
        :icon-size="''"
        :is-only-icon="false"
        :font-size="'text'"
        @define-function="goCheckHistory"
        :is-disabled="!tableNumber && !phoneNumber"
      >
        開始查詢
      </UiButton>
    </div>
  </div>
</template>
<style scoped></style>

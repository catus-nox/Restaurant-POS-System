<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import UiInput from '@/components/ui/UiInput.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'
import router from '@/router'
import {
  validateReceipt,
  receiptValidateData,
  validateTaxId,
  taxIdValidateData,
  validatePhoneNumber,
  phoneValidateData
} from '@/models/validate'
import { useRoute } from 'vue-router'
//-----
//api
const employeeStore = useEmployeeStore()
const functionDataStore = useFunctionDataStore()
//-----
const productId: number = Number(useRoute().params.id)
//-----
//現金
const cash = computed({
  get: () => functionDataStore.getNowCustomerCash,
  set: (value) => functionDataStore.getNowCustomerCashFunction(value)
})
// const cash = ref<number>()
//備註
const note = ref<any>()
//-----
//發票資訊
const payReceiptData: {
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
// const pay = ref(payReceiptData.options[3].id)
const pay = computed({
  get: () => functionDataStore.getNowCustomerPay,
  set: (value) => functionDataStore.getNowCustomerPayFunction(value)
})
//-----
//載具
const receipt = computed({
  get: () => functionDataStore.getNowCustomerReceipt,
  set: (value) => functionDataStore.getNowCustomerReceiptFunction(value)
})
//載具驗證結果
// const isValidReceipt = ref<boolean>(false)
const isValidReceipt = computed({
  get: () => functionDataStore.getNowCustomerIsValidReceipt,
  set: (value) => functionDataStore.getNowCustomerIsValidReceiptFunction(value)
})
//是否點擊過載具
const isTouchReceipt = ref<boolean>(false)
//-----
//統編
// const taxId = ref<any>(undefined)
const taxId = computed({
  get: () => functionDataStore.getNowCustomerTaxId,
  set: (value) => functionDataStore.getNowCustomerTaxIdFunction(value)
})
//統編驗證結果
// const isValidTaxId = ref<boolean>(false)
const isValidTaxId = computed({
  get: () => functionDataStore.getNowCustomerIsValidTaxId,
  set: (value) => functionDataStore.getNowCustomerIsValidTaxIdFunction(value)
})
//是否點擊過統編
const isTouchTaxId = ref<boolean>(false)
//-----
//手機
// const phoneNumber = ref<any>(undefined)
const phoneNumber = computed({
  get: () => functionDataStore.getNowCustomerPhoneNumber,
  set: (value) => functionDataStore.getNowCustomerPhoneNumberFunction(value)
})
//手機驗證結果
// const isValidPhoneNumber = ref<boolean>(false)
const isValidPhoneNumber = computed({
  get: () => functionDataStore.getNowCustomerIsValidPhoneNumber,
  set: (value) => functionDataStore.getNowCustomerIsValidPhoneNumberFunction(value)
})
//手機是否點擊過輸入框
const isTouchPhoneNumber = ref<boolean>(false)
//
const nowClick = ref()
function nowClickFunction(value: number) {
  if (nowClick.value == value) {
    nowClick.value = null
    return
  }
  nowClick.value = value
}
//-----
//取得單一訂單資訊
const fohFetOrderDetailData = computed(() => employeeStore.getFohFetOrderDetailData)
onMounted(async () => {
  //   //取得單一訂單資訊
  await employeeStore.fetchEmployeeFohGetOrderDetail(productId)
})
</script>

<template>
  <div v-if="functionDataStore" class="flex h-full w-full grow flex-col text-2xl text-black">
    <div class="inline-flex items-center gap-6 bg-primary-200 px-6 py-3 font-bold text-neutral-950">
      <svg
        @click="router.push({ name: 'employeeFohOrder' })"
        class="h-7 w-7 cursor-pointer"
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
          d="m15 19-7-7 7-7"
        />
      </svg>
      <div class="text-2xl">選擇結帳方式</div>
    </div>
    <div :class="nowClick == 1 ? 'click' : ''">
      <div class="dropdown" @click="nowClickFunction(1)">
        <div class="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1475_15884)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.25 26.25C21.1065 26.25 22.887 25.5125 24.1997 24.1997C25.5125 22.887 26.25 21.1065 26.25 19.25C26.25 17.3935 25.5125 15.613 24.1997 14.3003C22.887 12.9875 21.1065 12.25 19.25 12.25C17.3935 12.25 15.613 12.9875 14.3003 14.3003C12.9875 15.613 12.25 17.3935 12.25 19.25C12.25 21.1065 12.9875 22.887 14.3003 24.1997C15.613 25.5125 17.3935 26.25 19.25 26.25ZM28 19.25C28 21.5706 27.0781 23.7962 25.4372 25.4372C23.7962 27.0781 21.5706 28 19.25 28C16.9294 28 14.7038 27.0781 13.0628 25.4372C11.4219 23.7962 10.5 21.5706 10.5 19.25C10.5 16.9294 11.4219 14.7038 13.0628 13.0628C14.7038 11.4219 16.9294 10.5 19.25 10.5C21.5706 10.5 23.7962 11.4219 25.4372 13.0628C27.0781 14.7038 28 16.9294 28 19.25Z"
                fill="#292929"
              />
              <path
                d="M16.5164 20.902C16.5986 21.945 17.4229 22.757 18.9016 22.855V23.625H19.5579V22.8498C21.0891 22.743 21.9834 21.924 21.9834 20.7375C21.9834 19.656 21.3009 19.0995 20.0759 18.8125L19.5579 18.69V16.59C20.2159 16.6652 20.6324 17.024 20.7321 17.521H21.8836C21.8014 16.5148 20.9386 15.729 19.5579 15.6433V14.875H18.9016V15.6625C17.5944 15.7902 16.7054 16.576 16.7054 17.689C16.7054 18.6725 17.3669 19.299 18.4676 19.5545L18.9016 19.6612V21.8872C18.2296 21.7857 17.7834 21.4148 17.6836 20.902H16.5146H16.5164ZM18.8964 18.5325C18.2506 18.3838 17.9006 18.0775 17.9006 17.619C17.9006 17.1045 18.2786 16.7195 18.9016 16.6075V18.5325H18.8964ZM19.6524 19.838C20.4381 20.02 20.7986 20.314 20.7986 20.8337C20.7986 21.427 20.3489 21.833 19.5579 21.9082V19.817L19.6524 19.838Z"
                fill="#292929"
              />
              <path
                d="M1.75 0C1.28587 0 0.840752 0.184374 0.512563 0.512563C0.184374 0.840752 0 1.28587 0 1.75L0 15.75C0 16.2141 0.184374 16.6592 0.512563 16.9874C0.840752 17.3156 1.28587 17.5 1.75 17.5H8.89525C8.99675 16.898 9.149 16.3135 9.34675 15.75H5.25C5.25 14.8217 4.88125 13.9315 4.22487 13.2751C3.5685 12.6187 2.67826 12.25 1.75 12.25V5.25C2.67826 5.25 3.5685 4.88125 4.22487 4.22487C4.88125 3.5685 5.25 2.67826 5.25 1.75H22.75C22.75 2.67826 23.1187 3.5685 23.7751 4.22487C24.4315 4.88125 25.3217 5.25 26.25 5.25V11.424C26.915 12.019 27.5047 12.698 28 13.4435V1.75C28 1.28587 27.8156 0.840752 27.4874 0.512563C27.1592 0.184374 26.7141 0 26.25 0L1.75 0Z"
                fill="#292929"
              />
              <path
                d="M17.4965 8.89512L17.5 8.74987C17.4996 8.14716 17.3436 7.55475 17.0471 7.03002C16.7506 6.50529 16.3236 6.06603 15.8075 5.75478C15.2913 5.44352 14.7036 5.27083 14.1011 5.25341C13.4987 5.236 12.9019 5.37446 12.3687 5.65538C11.8354 5.93631 11.3838 6.35017 11.0574 6.8569C10.7311 7.36362 10.5411 7.94603 10.506 8.54772C10.4708 9.1494 10.5916 9.74998 10.8567 10.2913C11.1218 10.8326 11.5221 11.2962 12.019 11.6374C13.5306 10.1976 15.4381 9.24262 17.4965 8.89512Z"
                fill="#292929"
              />
            </g>
            <defs>
              <clipPath id="clip0_1475_15884">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div>現金</div>
        </div>
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
            d="m19 9-7 7-7-7"
          />
        </svg>
      </div>
      <div class="flex flex-col" v-show="nowClick == 1">
        <div class="flex w-full gap-6 p-6 py-4">
          <UiInput
            :title-class="'text-2xl text-black font-bold '"
            :class="'!w-full max-w-96 !flex-row !gap-6'"
            :id="'receipt'"
            :is-label="true"
            :label="'現金面額'"
            :placeholder="'請輸入金額'"
            :is-important="false"
            :type="'text'"
            v-model="cash"
          >
            <template #helper></template>
            <template #validationMessage> </template>
          </UiInput>
        </div>
        <div class="flex w-full gap-6 p-6 py-4">
          <span>找零金額 </span>
          <span>
            <template v-if="fohFetOrderDetailData">
              <template v-if="cash"> $ {{ cash - fohFetOrderDetailData.totalAmount }} </template>
              <template v-else> $ {{ 0 - fohFetOrderDetailData.totalAmount }} </template>
            </template></span
          >
        </div>
        <div class="flex w-full gap-6 p-6 py-4">
          <UiInput
            :title-class="'text-2xl text-black font-bold '"
            :class="'!w-full max-w-96 !flex-row !gap-6'"
            :id="'receipt'"
            :is-label="true"
            :label="'付款備註'"
            :placeholder="'請輸入備註'"
            :is-important="false"
            :type="'text'"
            v-model="note"
          >
            <template #helper></template>
            <template #validationMessage> </template>
          </UiInput>
        </div>
      </div>
    </div>

    <div :class="nowClick == 2 ? 'click' : ''">
      <div class="dropdown" @click="nowClickFunction(2)">
        <div class="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0003 17.5003C15.9333 17.5003 17.5003 15.9333 17.5003 14.0003C17.5003 12.0673 15.9333 10.5003 14.0003 10.5003C12.0673 10.5003 10.5003 12.0673 10.5003 14.0003C10.5003 15.9333 12.0673 17.5003 14.0003 17.5003Z"
              stroke="#1E1E1E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.6337 17.5003C22.4784 17.8522 22.432 18.2425 22.5007 18.621C22.5693 18.9995 22.7497 19.3487 23.0187 19.6237L23.0887 19.6937C23.3056 19.9104 23.4777 20.1677 23.5951 20.451C23.7126 20.7342 23.773 21.0379 23.773 21.3445C23.773 21.6511 23.7126 21.9548 23.5951 22.238C23.4777 22.5213 23.3056 22.7786 23.0887 22.9953C22.872 23.2123 22.6146 23.3844 22.3314 23.5018C22.0481 23.6192 21.7445 23.6797 21.4378 23.6797C21.1312 23.6797 20.8276 23.6192 20.5443 23.5018C20.261 23.3844 20.0037 23.2123 19.787 22.9953L19.717 22.9253C19.442 22.6564 19.0928 22.4759 18.7143 22.4073C18.3359 22.3387 17.9455 22.385 17.5937 22.5403C17.2486 22.6882 16.9543 22.9338 16.747 23.2468C16.5397 23.5598 16.4285 23.9266 16.427 24.302V24.5003C16.427 25.1192 16.1812 25.7127 15.7436 26.1502C15.306 26.5878 14.7125 26.8337 14.0937 26.8337C13.4748 26.8337 12.8813 26.5878 12.4437 26.1502C12.0062 25.7127 11.7603 25.1192 11.7603 24.5003V24.3953C11.7513 24.0092 11.6263 23.6347 11.4016 23.3205C11.1769 23.0063 10.8628 22.767 10.5003 22.6337C10.1484 22.4784 9.7581 22.432 9.37964 22.5007C9.00118 22.5693 8.65195 22.7497 8.37699 23.0187L8.30699 23.0887C8.09029 23.3056 7.83295 23.4777 7.54969 23.5951C7.26642 23.7126 6.96279 23.773 6.65616 23.773C6.34952 23.773 6.04589 23.7126 5.76263 23.5951C5.47937 23.4777 5.22203 23.3056 5.00532 23.0887C4.78838 22.872 4.61628 22.6146 4.49885 22.3314C4.38143 22.0481 4.32099 21.7445 4.32099 21.4378C4.32099 21.1312 4.38143 20.8276 4.49885 20.5443C4.61628 20.261 4.78838 20.0037 5.00532 19.787L5.07532 19.717C5.34428 19.442 5.52471 19.0928 5.59333 18.7143C5.66195 18.3359 5.61563 17.9455 5.46032 17.5937C5.31243 17.2486 5.06687 16.9543 4.75387 16.747C4.44086 16.5397 4.07408 16.4285 3.69866 16.427H3.50033C2.88149 16.427 2.28799 16.1812 1.85041 15.7436C1.41282 15.306 1.16699 14.7125 1.16699 14.0937C1.16699 13.4748 1.41282 12.8813 1.85041 12.4437C2.28799 12.0062 2.88149 11.7603 3.50033 11.7603H3.60533C3.99149 11.7513 4.366 11.6263 4.68017 11.4016C4.99435 11.1769 5.23366 10.8628 5.36699 10.5003C5.52229 10.1484 5.56862 9.7581 5.5 9.37964C5.43137 9.00118 5.25095 8.65195 4.98199 8.37699L4.91199 8.30699C4.69505 8.09029 4.52294 7.83295 4.40552 7.54969C4.2881 7.26642 4.22766 6.96279 4.22766 6.65616C4.22766 6.34952 4.2881 6.04589 4.40552 5.76263C4.52294 5.47937 4.69505 5.22203 4.91199 5.00532C5.1287 4.78838 5.38604 4.61628 5.6693 4.49885C5.95256 4.38143 6.25619 4.32099 6.56282 4.32099C6.86946 4.32099 7.17309 4.38143 7.45635 4.49885C7.73961 4.61628 7.99695 4.78838 8.21366 5.00532L8.28366 5.07532C8.55862 5.34428 8.90784 5.52471 9.2863 5.59333C9.66477 5.66195 10.0551 5.61563 10.407 5.46032H10.5003C10.8454 5.31243 11.1397 5.06687 11.347 4.75387C11.5543 4.44086 11.6655 4.07408 11.667 3.69866V3.50033C11.667 2.88149 11.9128 2.28799 12.3504 1.85041C12.788 1.41282 13.3815 1.16699 14.0003 1.16699C14.6192 1.16699 15.2127 1.41282 15.6502 1.85041C16.0878 2.28799 16.3337 2.88149 16.3337 3.50033V3.60533C16.3352 3.98074 16.4464 4.34753 16.6537 4.66054C16.861 4.97354 17.1553 5.2191 17.5003 5.36699C17.8522 5.52229 18.2425 5.56862 18.621 5.5C18.9995 5.43137 19.3487 5.25095 19.6237 4.98199L19.6937 4.91199C19.9104 4.69505 20.1677 4.52294 20.451 4.40552C20.7342 4.2881 21.0379 4.22766 21.3445 4.22766C21.6511 4.22766 21.9548 4.2881 22.238 4.40552C22.5213 4.52294 22.7786 4.69505 22.9953 4.91199C23.2123 5.1287 23.3844 5.38604 23.5018 5.6693C23.6192 5.95256 23.6797 6.25619 23.6797 6.56282C23.6797 6.86946 23.6192 7.17309 23.5018 7.45635C23.3844 7.73961 23.2123 7.99695 22.9953 8.21366L22.9253 8.28366C22.6564 8.55862 22.4759 8.90784 22.4073 9.2863C22.3387 9.66477 22.385 10.0551 22.5403 10.407V10.5003C22.6882 10.8454 22.9338 11.1397 23.2468 11.347C23.5598 11.5543 23.9266 11.6655 24.302 11.667H24.5003C25.1192 11.667 25.7127 11.9128 26.1502 12.3504C26.5878 12.788 26.8337 13.3815 26.8337 14.0003C26.8337 14.6192 26.5878 15.2127 26.1502 15.6502C25.7127 16.0878 25.1192 16.3337 24.5003 16.3337H24.3953C24.0199 16.3352 23.6531 16.4464 23.3401 16.6537C23.0271 16.861 22.7815 17.1553 22.6337 17.5003Z"
              stroke="#1E1E1E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>台灣發票選項</div>
        </div>
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
            d="m19 9-7 7-7-7"
          />
        </svg>
      </div>
      <div
        v-show="nowClick == 2"
        class="flex flex-row gap-6 p-6 py-4"
        v-for="(option, index) in payReceiptData.options"
        :key="index"
      >
        <UiInputOption
          :key="index"
          :id="option.name"
          :value="option.id"
          :type="'radio'"
          v-model="pay"
          :class="'!w-fit items-start'"
        >
          {{ option.name }}
        </UiInputOption>

        <div class="flex max-w-96 grow flex-col gap-2" v-if="index === 0">
          <UiInput
            :id="'receipt'"
            :is-label="false"
            :label="'請輸入載具'"
            :placeholder="receiptValidateData.placeholder"
            :is-important="false"
            :type="'text'"
            v-model="receipt"
            @define-focus-function="isTouchReceipt = true"
            @define-input-function="validateReceipt(isValidReceipt, receipt)"
            :is-validation-message="validateReceipt(isValidReceipt, receipt) !== isTouchReceipt"
          >
            <template #helper></template>
            <template #validationMessage>{{ receiptValidateData.validationMessage }} </template>
          </UiInput>
        </div>
        <div class="flex max-w-96 grow flex-col gap-2" v-if="index === 1">
          <UiInput
            :id="'taxId'"
            :is-label="false"
            :label="'請輸入統編'"
            :placeholder="taxIdValidateData.placeholder"
            :is-important="false"
            :type="'text'"
            v-model="taxId"
            @define-focus-function="isTouchTaxId = true"
            @define-input-function="validateTaxId(isValidTaxId, taxId)"
            :is-validation-message="validateTaxId(isValidTaxId, taxId) !== isTouchTaxId"
          >
            <template #helper></template>
            <template #validationMessage>{{ taxIdValidateData.validationMessage }} </template>
          </UiInput>
        </div>
      </div>
    </div>

    <div :class="nowClick == 3 ? 'click' : ''">
      <div class="dropdown">
        <div class="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14C0 6.26801 6.26801 0 14 0V0C21.732 0 28 6.26801 28 14V14C28 21.732 21.732 28 14 28V28C6.26801 28 0 21.732 0 14V14Z"
              fill="#292929"
            />
            <path
              d="M14.3281 14.8516H11.3984V13.1641H14.3281C14.8073 13.1641 15.1953 13.0859 15.4922 12.9297C15.7943 12.7682 16.0156 12.5495 16.1562 12.2734C16.2969 11.9922 16.3672 11.6719 16.3672 11.3125C16.3672 10.9635 16.2969 10.638 16.1562 10.3359C16.0156 10.0339 15.7943 9.78906 15.4922 9.60156C15.1953 9.41406 14.8073 9.32031 14.3281 9.32031H12.1016V19H9.95312V7.625H14.3281C15.2135 7.625 15.9688 7.78385 16.5938 8.10156C17.224 8.41406 17.7031 8.84896 18.0312 9.40625C18.3646 9.95833 18.5312 10.5885 18.5312 11.2969C18.5312 12.0312 18.3646 12.6641 18.0312 13.1953C17.7031 13.7266 17.224 14.1354 16.5938 14.4219C15.9688 14.7083 15.2135 14.8516 14.3281 14.8516Z"
              fill="white"
            />
          </svg>

          <div>訂單會員集點</div>
        </div>
        <!-- <svg
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
            d="m19 9-7 7-7-7"
          />
        </svg> -->
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-6 p-6 py-4">
          <div>會員手機</div>
          <div class="flex max-w-96 grow flex-col gap-2">
            <UiInput
              :id="'taxId'"
              :is-label="false"
              :label="'請輸入會員手機號碼'"
              :placeholder="taxIdValidateData.placeholder"
              :is-important="false"
              :type="'text'"
              v-model="phoneNumber"
              @define-focus-function="isTouchPhoneNumber = true"
              @define-input-function="validatePhoneNumber(isValidPhoneNumber, phoneNumber)"
              :is-validation-message="
                validatePhoneNumber(isValidPhoneNumber, phoneNumber) !== isTouchPhoneNumber
              "
            >
              <template #helper></template>
              <template #validationMessage>{{ phoneValidateData.validationMessage }} </template>
            </UiInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.click {
  @apply bg-primary-100;
}
.dropdown {
  @apply flex cursor-pointer items-center justify-between border-b border-[#b1b1b1] p-6;
}
</style>

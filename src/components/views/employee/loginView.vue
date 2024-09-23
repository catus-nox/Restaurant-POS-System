<script setup lang="ts">
import { computed, ref } from 'vue'
import router from '@/router'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import {
  accountValidateData,
  validateAccount,
  passwordValidateData,
  validatePassword
} from '@/models/validate'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
//-----
//api
const employeeStore = useEmployeeStore()
const customerFunction = useAllFunctionDataStore()
//-----
//帳號
const account = ref('')
//帳號驗證結果
const isValidAccount = ref<boolean>(false)
//帳號是否點擊過輸入框
const isTouchAccount = ref<boolean>(false)
//-----
//密碼
const password = ref('')
//密碼驗證結果
const isValidPassword = ref<boolean>(false)
//密碼是否點擊過輸入框
const isTouchPassword = ref<boolean>(false)
//-----
//員工登入
async function employeeLogin() {
  //-----
  //驗證
  function validate(): boolean {
    //帳號判斷
    if (!validateAccount(isValidAccount.value, account.value)) {
      customerFunction.getAlertStatusFunction(true, accountValidateData.validationMessage, 2)
      return false
    }
    //密碼編判斷
    if (!validatePassword(isTouchPassword.value, password.value)) {
      customerFunction.getAlertStatusFunction(true, passwordValidateData.validationMessage, 2)
      return false
    }
    return true
  }
  if (!validate()) return
  //-----
  // 給api的data資訊
  let data: {
    account: string
    password: string
  } = {
    account: account.value,
    password: password.value
  }
  //員工登入
  await employeeStore.fetchEmployeeLogin(data)
}
//員工忘記密碼
function employeeForgetPassword() {
  customerFunction.getAlertStatusFunction(true, '去找老闆!', 2)
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-6">
    <div class="flex w-full max-w-[459px] flex-col items-center gap-4">
      <img src="../../../assets/img/logo/character-black.png" class="max-w-72" alt="" />
      <div
        class="flex w-full max-w-[459px] flex-col items-center gap-7 rounded-3xl border border-neutral-950 bg-white p-5"
      >
        <div class="flex w-full flex-col gap-4">
          <UiInput
            :is-label="true"
            :label="'帳號'"
            :placeholder="'請輸入手機號碼'"
            :is-important="true"
            :type="'text'"
            v-model="account"
            @define-focus-function="isTouchAccount = true"
            @define-input-function="validateAccount(isValidAccount, account)"
            :is-validation-message="validateAccount(isValidAccount, account) !== isTouchAccount"
          >
            <template #helper>{{ accountValidateData.helper }}</template>
            <template #validationMessage>
              {{ accountValidateData.validationMessage }}
            </template>
          </UiInput>
          <UiInput
            :is-label="true"
            :label="'密碼'"
            :placeholder="'請輸入密碼'"
            :is-important="true"
            :type="'password'"
            v-model="password"
            @define-focus-function="isTouchPassword = true"
            @define-input-function="validatePassword(isValidPassword, password)"
            :is-validation-message="validatePassword(isValidPassword, password) !== isTouchPassword"
          >
            <template #helper>{{ passwordValidateData.helper }}</template>
            <template #validationMessage>
              {{ passwordValidateData.validationMessage }}
            </template>
          </UiInput>
        </div>
        <div class="flex w-full flex-col items-center gap-2">
          <UiButton
            :btn-style="'style1'"
            :btn-width="'w-full'"
            :is-left-icon="false"
            :is-right-icon="false"
            @define-function="employeeLogin"
          >
            登入
          </UiButton>
          <RouterLink
            @click="employeeForgetPassword"
            class="text text-primary-800 underline"
            style="text-underline-offset: 0.4rem"
            to="/employeeLogin"
            >忘記密碼 ?
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import {
  accountValidateData,
  validateAccount,
  passwordValidateData,
  validatePassword
} from '@/models/validate'

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
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-6">
    <div class="flex w-full max-w-[459px] flex-col items-center gap-4">
      <img src="../../../assets/img/logo/character-black.png" class="max-w-72" alt="" />
      <div
        class="flex w-full max-w-[459px] flex-col items-center gap-4 gap-7 rounded-3xl border border-neutral-950 bg-neutral-0 p-5"
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
            :type="'text'"
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
            :router-name="'employeeFohOrderView'"
            :is-left-icon="false"
            :is-right-icon="false"
          >
            登入
          </UiButton>
          <RouterLink
            class="text text-primary-800 underline"
            style="text-underline-offset: 0.4rem"
            to="/employeeLogin"
            >忘記密碼 ?</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

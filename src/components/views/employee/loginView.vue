<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-6">
    <div class="flex w-full max-w-[459px] flex-col items-center gap-4">
      <img src="../../../assets/img/logo/character-black.png" class="max-w-72" alt="" />
      <div
        class="bg-neutral-0 flex w-full max-w-[459px] flex-col items-center gap-4 gap-7 rounded-3xl border border-neutral-950 p-5"
      >
        <div class="flex w-full flex-col gap-4">
          <UiInput
            :is-label="true"
            :label="'帳號'"
            :placeholder="'請輸入手機號碼'"
            :is-important="true"
            :type="'text'"
          >
            <template #helper></template>
            <template #validationMessage></template>
          </UiInput>
          <UiInput
            :is-label="true"
            :label="'密碼'"
            :placeholder="'請輸入密碼'"
            :is-important="true"
            :type="'text'"
          >
            <template #helper></template>
            <template #validationMessage></template>
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

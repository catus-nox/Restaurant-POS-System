<script setup lang="ts">
import { useEmployeeStore } from '@/stores/employee/productsStore'
import UiButton from '@/components/ui/UiButton.vue'
import EmployeeUiNavbarOptionButton from '@/components/ui/employee/UiNavbarOptionButton.vue'
import { useRoute } from 'vue-router'

//-----
const route = useRoute()
//-----
//api
const employeeStore = useEmployeeStore()
//-----
//判斷前後台
let identity: number
let username: string
if ((route.name as string).includes('employeeFoh')) {
  identity = localStorage.foh_identity
  username = localStorage.foh_username
}
if ((route.name as string).includes('employeeBoh')) {
  identity = localStorage.boh_identity
  username = localStorage.boh_username
}
//-----
//員工登出
async function employeeLogout() {
  // ['employeeFohOrder', 'employeeFohCheckout'].includes(route.name as string)
  if ((route.name as string).includes('employeeFoh')) {
    await employeeStore.fetchEmployeeLogout(1)
    return
  }
  // ['employeeBohOrder'].includes(route.name as string)
  if ((route.name as string).includes('employeeBoh')) {
    await employeeStore.fetchEmployeeLogout(2)
    return
  }
}
</script>

<template>
  <div class="flex w-full max-w-32 flex-col justify-between bg-secondary-200 px-4 py-6">
    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <div class="h-20 w-20 overflow-hidden rounded-full bg-white">
          <img
            class="-ml-[3px] w-[207%] max-w-none object-cover"
            src="../../../assets/img/logo/character-black.png"
            alt=""
          />
        </div>

        <div class="text-center text-xl font-normal text-neutral-950">
          <template v-if="identity == 1"> 外場店員 </template>
          <template v-if="identity == 2"> 內場店員 </template>

          <span class="block text-sm text-primary-700">
            {{ username }}
          </span>
        </div>
      </div>
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-full'"
        :btnPadding="'px-2 py-2'"
        :font-size="'text-xs'"
        :is-right-icon="false"
        :icon-size="'w-4 h-4'"
        @define-function="employeeLogout"
      >
        <template #left-icon
          ><svg
            class="h-full w-full"
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
              d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
            />
          </svg>
        </template>
        登出
      </UiButton>
    </div>

    <div><EmployeeUiNavbarOptionButton></EmployeeUiNavbarOptionButton></div>
  </div>
</template>

<style scoped></style>

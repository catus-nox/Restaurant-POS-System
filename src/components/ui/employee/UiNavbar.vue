<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import EmployeeUiNavbarOptionButton from '@/components/ui/employee/UiNavbarOptionButton.vue'
const identity = localStorage.identity
const username = localStorage.username
const token = localStorage.token
</script>

<template>
  <div class="flex w-full max-w-32 flex-col justify-between bg-primary-700 px-4 py-6">
    <div class="flex flex-col items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <div class="h-20 w-20 overflow-hidden rounded-full bg-neutral-0">
          <img
            class="-ml-[3px] w-[207%] max-w-none object-cover"
            src="../../../assets/img/logo/character-black.png"
            alt=""
          />
        </div>

        <div class="text-center text-xl font-normal text-neutral-950">
          <template v-if="identity == 1"> 外場店員 </template>
          <template v-if="identity == 2"> 內場店員 </template>
          <span class="block text-sm text-neutral-0/55">午仔魚</span>
        </div>
      </div>
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-full'"
        :btnPadding="'px-2 py-2'"
        :router-name="'employeeLogin'"
        :font-size="'text-xs'"
        :is-right-icon="false"
        :icon-size="'w-4 h-4'"
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

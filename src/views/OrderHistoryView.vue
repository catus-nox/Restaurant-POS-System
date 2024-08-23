<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

import IconRepeat from '@/components/icons/IconRepeat.vue'
</script>

<template>
  <div class="flex flex-col gap-6 py-6">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="text-center text-2xl font-semibold text-black">歷史訂單</div>
    </div>

    <div class="flex flex-col gap-4 px-3">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <div class="text-base font-semibold text-black">今天</div>
          <UiButton
            :btn-style="'style4'"
            :btn-width="'w-fit'"
            :btn-padding="'px-6 py-2'"
            :left-icon="IconRepeat"
            :icon-size="''"
            :icon-style="''"
            :is-only-icon="false"
            :font-size="'text-xs'"
            :font-padding="'px-1'"
          >
            刷新進度
          </UiButton>
        </div>

        <div class="flex flex-col gap-3 rounded-xl border border-tickets-netural-900 bg-white p-4">
          <div class="flex h-6 justify-between gap-2">
            <div class="text-base font-medium leading-normal text-black">取餐邊號 :</div>
            <div class="text-base font-medium leading-normal text-black">01</div>
          </div>
          <div class="flex h-6 justify-between gap-2">
            <div class="text-base font-medium leading-normal text-black">訂單進度 :</div>
            <div class="text-base font-medium leading-normal text-black">準備中</div>
          </div>
          <div class="flex h-6 justify-between gap-2">
            <div class="text-base font-medium leading-normal text-black">取餐方式 :</div>
            <div class="text-base font-medium leading-normal text-black">預約自取</div>
          </div>
          <div class="flex h-6 justify-between gap-2">
            <div class="text-base font-medium leading-normal text-black">付款狀態 :</div>
            <div class="text-base font-medium leading-normal text-black">已結帳</div>
          </div>
          <div class="flex h-6 justify-between gap-2">
            <div class="text-base font-medium leading-normal text-black">結帳金額 :</div>
            <div class="text-base font-medium leading-normal text-black">$ 120</div>
          </div>

          <div class="flex items-center justify-end gap-2">
            <UiButton
              :btn-style="'style4'"
              :btn-width="'w-fit'"
              :btn-padding="'px-6 py-2'"
              :icon-size="''"
              :icon-style="''"
              :is-only-icon="false"
              :font-size="'text-xs'"
              :font-padding="'px-0'"
            >
              詳細資訊
            </UiButton>
            <UiButton
              :btn-style="'style3'"
              :btn-width="'w-fit'"
              :btn-padding="'px-6 py-2'"
              :icon-size="''"
              :icon-style="''"
              :is-only-icon="false"
              :font-size="'text-xs'"
              :font-padding="'px-0'"
            >
              再訂一次
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="flex flex-col gap-4 px-3">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <div class="text-base font-semibold text-black">過去的訂單</div>
        </div>

        <div
          class="inline-flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-tickets-netural-400 bg-white p-4"
        >
          <div class="flex h-5 flex-col items-start justify-start gap-2">
            <div class="inline-flex items-center justify-between">
              <div class="text-base font-bold text-tickets-netural-400">
                登入會員後，可顯示歷史訂單
              </div>
            </div>
          </div>
        </div>

        <div v-for="index in 10" :key="index">
          <div
            class="flex flex-col gap-3 rounded-xl border border-tickets-netural-900 bg-white p-4"
          >
            <div class="flex h-6 justify-between gap-2">
              <div class="text-base font-medium leading-normal text-black">訂單進度 :</div>
              <div class="text-base font-medium leading-normal text-black">2024/05/11 已完成</div>
            </div>
            <div class="flex h-6 justify-between gap-2">
              <div class="text-base font-medium leading-normal text-black">取餐方式 :</div>
              <div class="text-base font-medium leading-normal text-black">預約自取</div>
            </div>
            <div class="flex h-6 justify-between gap-2">
              <div class="text-base font-medium leading-normal text-black">付款狀態 :</div>
              <div class="text-base font-medium leading-normal text-black">已結帳</div>
            </div>
            <div class="flex h-6 justify-between gap-2">
              <div class="text-base font-medium leading-normal text-black">結帳金額 :</div>
              <div class="text-base font-medium leading-normal text-black">$ 120</div>
            </div>

            <div class="flex items-center justify-end gap-2">
              <UiButton
                :btn-style="'style4'"
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
                :font-padding="'px-0'"
              >
                詳細資訊
              </UiButton>
              <UiButton
                :btn-style="'style3'"
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
                :font-padding="'px-0'"
              >
                再訂一次
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<style scoped></style>

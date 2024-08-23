<script setup lang="ts">
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiButton from '@/components/ui/UiButton.vue'
import IconCheckCircle2 from '@/components/icons/IconCheckCircle2.vue'
</script>

<template>
  <div>
    <UiCartProcess :status="'-translate-x-0'" :done="2" />
  </div>

  <div class="flex flex-col justify-start gap-6 px-3 py-6">
    <div class="flex items-center justify-center gap-2">
      <IconCheckCircle2 class="h-6 w-6" />
      <div class="text-2xl font-semibold text-black">訂單送出</div>
    </div>

    <div class="flex items-center justify-start gap-3">
      <div class="flex flex-col items-center justify-start gap-2">
        <div class="text-center text-base font-medium leading-normal text-black">取餐編號</div>
        <div
          class="flex flex-col items-center justify-center rounded-lg border-2 border-black bg-white p-3"
        >
          <div class="text-center text-[28px] font-bold leading-tight text-black">01</div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="text-base font-medium leading-normal text-black">取餐方式 : 預約自取</div>
        <div class="text-base font-medium leading-normal text-black">
          取餐時間 : 7/24 (三) 11:00
        </div>
        <div class="text-base font-medium leading-normal text-black">付款狀態 : 已結帳</div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <div class="text-base font-medium leading-normal text-black">訂單明細</div>
        <table
          class="flex w-full flex-col items-start justify-start rounded border border-tickets-netural-900 bg-white"
        >
          <thead class="w-full border-b border-tickets-netural-900 bg-tickets-secondary-100">
            <tr class="flex w-full">
              <th
                class="w-full px-3 py-2.5 text-xs font-medium leading-none text-tickets-netural-900"
              >
                商品
              </th>
              <th
                class="w-2/5 px-3 py-2.5 text-xs font-medium leading-none text-tickets-netural-900"
              >
                數量
              </th>
              <th
                class="w-2/5 px-3 py-2.5 text-xs font-medium leading-none text-tickets-netural-900"
              >
                小計
              </th>
            </tr>
          </thead>
          <tbody class="w-full">
            <tr class="flex items-center justify-center">
              <td
                class="w-full px-3 py-2.5 text-center text-xs font-medium leading-none text-tickets-netural-900"
              >
                經典美式咖啡 (少冰)
              </td>
              <td
                class="w-2/5 px-3 py-2.5 text-center text-xs font-medium leading-none text-tickets-netural-900"
              >
                1
              </td>
              <td
                class="w-2/5 px-3 py-2.5 text-center text-xs font-medium leading-none text-tickets-netural-900"
              >
                $120
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center bg-tickets-primary-200 p-2">
        <div class="text-base font-semibold leading-snug text-black">總計 1 項 / 共 $120</div>
      </div>
      <div class="text-base font-medium leading-normal text-black">訂單備註 : 需要吸管，謝謝 !</div>
    </div>
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 border-t border-tickets-netural-500 p-3"
  >
    <RouterLink to="/" class="w-full">
      <UiButton
        :btn-style="'style1'"
        :btn-width="'w-full '"
        :btn-padding="'px-6 py-2'"
        :icon-size="''"
        :icon-style="''"
        :is-only-icon="false"
        :font-size="'text '"
        :font-padding="'px-0'"
      >
        會員登入
      </UiButton>
    </RouterLink>
    <RouterLink to="/menu" class="w-full">
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-full'"
        :btn-padding="'px-6 py-2'"
        :icon-size="''"
        :icon-style="''"
        :is-only-icon="false"
        :font-size="'text '"
        :font-padding="'px-0'"
      >
        回到首頁
      </UiButton>
    </RouterLink>
  </div>
</template>
<style scoped></style>

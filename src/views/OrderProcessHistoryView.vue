<script setup lang="ts">
import { ref } from 'vue'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiButton from '@/components/ui/UiButton.vue'

const nowClick = ref<number>(0)
function toggleMenu(index: number) {
  console.log(index)

  nowClick.value = index
}

const customerStatus = [{ name: '預約自取' }, { name: '現場外帶' }, { name: '內用' }]
</script>

<template>
  <div class="flex min-h-[60vh] flex-col gap-6 px-3 py-6">
    <div class="flex flex-col justify-end gap-3">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">進度查詢</div>
      </div>

      <div class="flex items-center gap-1">
        <div class="text-base font-medium">內用桌號</div>
        <!-- <span class="text-base font-normal text-tickets-error-700">*</span> -->
      </div>
      <div>
        <!-- <label for="phone" class=""></label> -->
        <div
          class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
        >
          <input
            id="phone"
            name="phone"
            type="data"
            placeholder="請填寫桌號"
            aria-describedby="phone-description"
            class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
          />
        </div>
        <!-- <p id="phone-description" class="">選擇日期時間</p> -->
      </div>

      <div class="flex items-center gap-1">
        <div class="text-base font-medium">外帶手機號碼</div>
        <!-- <span class="text-base font-normal text-tickets-error-700">*</span> -->
      </div>
      <div>
        <!-- <label for="phone" class=""></label> -->
        <div
          class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
        >
          <input
            id="phone"
            name="phone"
            type="data"
            placeholder="請填寫手機"
            aria-describedby="phone-description"
            class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
          />
        </div>
        <!-- <p id="phone-description" class="">選擇日期時間</p> -->
      </div>
    </div>

    <div class="flex items-center justify-center gap-3">
      <div class="w-full">
        <RouterLink to="/">
          <UiButton
            :btn-style="'style1'"
            :btn-width="'w-full '"
            :btn-padding="'px-6 py-2'"
            :icon-size="''"
            :icon-style="''"
            :is-only-icon="false"
            :font-size="'text'"
            :font-padding="'px-0'"
          >
            進度查詢
          </UiButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

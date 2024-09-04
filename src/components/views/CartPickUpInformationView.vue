<script setup lang="ts">
import { ref } from 'vue'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'

const nowClick = ref<number>(0)
function toggleMenu(index: number) {
  console.log(index)

  nowClick.value = index
}

const customerStatus = [{ name: '預約自取' }, { name: '現場外帶' }, { name: '內用' }]
</script>

<template>
  <div>
    <UiCartProcess :status="'-translate-x-1/4'" />
  </div>

  <div class="flex flex-col gap-6 px-3 py-6">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="text-xl font-semibold text-black">取餐資訊</div>
      </div>
      <div class="flex gap-3">
        <template v-for="(sta, index) in customerStatus" :key="index">
          <template v-if="index === nowClick">
            <div @click="toggleMenu(index)">
              <UiButton
                :btn-style="'style4'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs font-medium'"
                :btn-press="'press4'"
              >
                {{ sta.name }}
              </UiButton>
            </div>
          </template>
          <template v-else>
            <div @click="toggleMenu(index)">
              <UiButton
                :btn-style="'style4'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs font-medium'"
              >
                {{ sta.name }}
              </UiButton>
            </div>
          </template>
        </template>
      </div>
    </div>
    <template v-if="nowClick === 0">
      <div class="flex flex-col gap-2">
        <div class="text-base font-medium text-black">門市資訊</div>
        <div class="flex flex-col rounded-lg bg-secondary-100 p-3">
          <div class="text-base text-netural-950">BUY咖</div>
          <div class="text-base text-netural-600">高雄市苓雅區四維三路217號</div>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">自取時間</div>
          <UiBadge :style="'radioBadge'" />
        </div>

        <UiInput
          :is-label="true"
          :label="'選擇日期時間'"
          :placeholder="'2024/07/24'"
          :is-important="true"
          :type="'datetime-local'"
        >
          <template #helper></template>
          <template #validationMessage></template>
        </UiInput>
      </div>
    </template>
    <template v-if="nowClick === 2">
      <div class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">內用桌號</div>
          <UiBadge :style="'radioBadge'" />
        </div>
        <UiInput
          :is-label="false"
          :label="'桌號'"
          :placeholder="'請填寫桌號'"
          :is-important="false"
          :type="'text'"
        >
          <template #helper></template>
          <template #validationMessage></template>
        </UiInput>
      </div>
    </template>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">會員集點</div>
        <UiBadge :style="'checkboxBadge'" />
      </div>
      <UiInput
        :is-label="true"
        :label="'請輸入手機號碼'"
        :placeholder="'0912345678'"
        :is-important="false"
        :type="'text'"
      >
        <template #helper></template>
        <template #validationMessage></template>
      </UiInput>
    </div>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">訂單內容</div>
      </div>

      <div
        class="flex items-center justify-between rounded-lg border border-netural-950 bg-white p-3"
      >
        <div class="flex items-center gap-4">
          <img
            class="relative h-[75px] w-[75px] rounded-lg object-cover object-right"
            src="../../assets/img/1002930.jpg"
          />
          <div class="flex w-[118px] flex-col gap-1">
            <div class="text-base font-bold text-black">經典美式咖啡</div>
            <div class="text-base font-medium text-netural-300">少冰</div>
            <div class="text-base font-medium text-black">$ 120</div>
          </div>
        </div>
        <UiCounter>1</UiCounter>
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="tickets-netural-950 text-base font-normal leading-snug">特殊需求</div>
            <UiBadge :style="'checkboxBadge'" />
          </div>

          <div class="flex rounded-lg border border-netural-950 bg-white px-4 py-3">
            <textarea
              id="comment"
              name="comment"
              placeholder="新增備註"
              rows="3"
              class="w-full border-none p-0 text-base font-normal leading-snug text-netural-950 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none"
            ></textarea>
          </div>
        </div>
        <div class="text-right text-base font-normal leading-snug text-netural-500">0/100</div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center gap-3 border-t border-netural-500 p-3">
    <UiButton
      :btn-style="'style4'"
      :btn-width="'w-fit'"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :icon-style="''"
      :is-only-icon="false"
      :font-size="'text whitespace-nowrap !text-black font-medium  '"
      :font-padding="'px-0'"
      :btn-press="'press4'"
      :router-name="'menu'"
    >
      繼續點餐
    </UiButton>
    <UiButton
      :btn-style="'style1'"
      :btn-width="'w-full '"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :icon-style="''"
      :is-only-icon="false"
      :font-size="'text justify-between flex w-full items-center'"
      :font-padding="'!px-0'"
      :router-name="'cartPayInformation'"
    >
      <template #left-icon>
        <span
          class="bet inline-flex h-4 w-4 flex-col items-center justify-center rounded border border-white text-sm"
          ><span class="pb-0.5">1</span></span
        >
      </template>

      <span>前往結帳</span>

      <template #right-icon>
        <span>$100</span>
      </template>
    </UiButton>
  </div>
</template>
<style scoped></style>

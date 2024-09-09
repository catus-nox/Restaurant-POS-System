<script setup lang="ts">
import { ref } from 'vue'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'

const nowClick = ref<number>(0)
function toggleMenu(index: number) {
  console.log(index)

  nowClick.value = index
}

const customerStatus = [{ name: '現金付款' }, { name: 'Line Pay' }]

const pay = ref('One')
const payData = {
  name: '發票資訊',
  options: ['手機載具', '公司統一編號', '捐贈發票', '發票紙本證明聯']
}
</script>

<template>
  <div>
    <UiCartProcess :status="'-translate-x-[10%]'" :done="1" />
  </div>

  <div class="flex flex-col gap-6 px-3 py-6">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="text-xl font-semibold text-black">付款資訊</div>
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
      <div class="flex flex-col justify-end gap-2">
        <div class="flex flex-col gap-2" v-for="(option, index) in payData.options" :key="index">
          <div class="flex items-center justify-between" v-if="index === 0">
            <div class="text text-black">發票資訊</div>
            <UiBadge :style="'radioBadge'" />
          </div>

          <UiInputOption :key="index" :id="option" :value="option" :type="'radio'">
            {{ option }}
          </UiInputOption>

          <div class="flex flex-col gap-2" v-if="index === 0">
            <UiInput
              :is-label="false"
              :label="'載具'"
              :placeholder="'/ABC1234'"
              :is-important="false"
              :type="'text'"
            >
              <template #helper></template>
              <template #validationMessage></template>
            </UiInput>
            <div class="flex gap-2">
              <UiButton
                :btn-style="'style3'"
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs font-medium'"
              >
                確認
              </UiButton>
              <UiButton
                :btn-style="'style4'"
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs  font-medium'"
              >
                取消
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">訂單內容</div>
      </div>

      <div
        class="border-tickets-neutral-950 flex items-center justify-between rounded-lg border bg-white p-3"
      >
        <div class="flex items-center gap-4">
          <img
            class="relative h-[75px] w-[75px] rounded-lg object-cover object-right"
            src="../../assets/img/1002930.jpg"
          />
          <div class="flex w-[118px] flex-col gap-1">
            <div class="text-base font-bold text-black">經典美式咖啡</div>
            <div class="text-base font-medium text-neutral-300">少冰</div>
            <div class="text-base font-medium text-black">$ 120</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="border-tickets-neutral-500 flex items-center justify-center gap-3 border-t p-3">
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
      :router-name="'cartConfirmInformation'"
    >
      <template #left-icon>
        <span
          class="bet inline-flex h-4 w-4 flex-col items-center justify-center rounded border border-white text-sm"
          ><span class="pb-0.5">1</span></span
        >
      </template>

      <span>送出訂單</span>

      <template #right-icon>
        <span>$100</span>
      </template>
    </UiButton>
  </div>
</template>
<style scoped></style>

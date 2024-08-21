<script setup lang="ts">
import { ref } from 'vue'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiButton from '@/components/ui/UiButton.vue'

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
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
                :font-padding="'px-0'"
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
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
                :font-padding="'px-0'"
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
            <div
              class="flex items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
            >
              <span class="tickets-netural-950 text-center text-xs font-medium">必填</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input
              class="h-4 w-4 border-[10px] border-black bg-white accent-black"
              type="radio"
              :id="option"
              :value="option"
              v-model="pay"
            />
            <label class="cursor-pointer" :for="option">{{ option }}</label>
          </div>
          <div class="flex flex-col gap-2" v-if="index === 0">
            <div>
              <!-- <label for="day" class=""></label> -->
              <div
                class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
              >
                <input
                  id="day"
                  name="email"
                  type="data"
                  placeholder="/ABC1234"
                  aria-describedby="day-description"
                  class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
                />
              </div>
              <!-- <p id="day-description" class="">選擇日期時間</p> -->
            </div>
            <div class="flex gap-2">
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
                確認
              </UiButton>
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
        class="flex items-center justify-between rounded-lg border border-tickets-netural-950 bg-white p-3"
      >
        <div class="flex items-center gap-4">
          <img
            class="relative h-[75px] w-[75px] rounded-lg object-cover object-right"
            src="../assets/img/1002930.jpg"
          />
          <div class="flex w-[118px] flex-col gap-1">
            <div class="text-base font-medium text-black">經典美式咖啡</div>
            <div class="text-base font-medium text-tickets-netural-300">少冰</div>
            <div class="text-base font-medium text-black">$ 120</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center gap-3 border-t border-tickets-netural-500 p-3">
    <RouterLink to="/menu">
      <UiButton
        :btn-style="'style4'"
        :btn-width="'w-fit'"
        :btn-padding="'px-6 py-2'"
        :icon-size="''"
        :icon-style="''"
        :is-only-icon="false"
        :font-size="'text whitespace-nowrap !text-black'"
        :font-padding="'px-0'"
        :btn-press="'press4'"
      >
        繼續點餐
      </UiButton>
    </RouterLink>
    <div class="w-full">
      <RouterLink to="/cartConfirmInformation">
        <UiButton
          :btn-style="'style1'"
          :btn-width="'w-full '"
          :btn-padding="'px-6 py-2'"
          :icon-size="''"
          :icon-style="''"
          :is-only-icon="false"
          :font-size="'text justify-between flex w-full items-center'"
          :font-padding="'!px-0'"
        >
          <span
            class="bet inline-flex h-4 w-4 flex-col items-center justify-center rounded border border-white text-sm"
            ><span>1</span></span
          >
          <span>送出訂單</span> <span>$100</span>
        </UiButton>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped></style>

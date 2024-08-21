<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
                :btn-width="'w-fit'"
                :btn-padding="'px-6 py-2'"
                :icon-size="''"
                :icon-style="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
                :font-padding="'!px-0'"
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
                :font-padding="'!px-0'"
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
        <div class="flex flex-col rounded-lg bg-tickets-secondary-100 p-3">
          <div class="text-base text-tickets-netural-950">BUY咖</div>
          <div class="text-base text-tickets-netural-600">高雄市苓雅區四維三路217號</div>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">自取時間</div>
          <div
            class="flex items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
          >
            <span class="tickets-netural-950 text-center text-xs font-medium">必填</span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <div class="tickets-netural-950 text-base font-medium">選擇日期時間</div>
          <span class="text-base font-normal text-tickets-error-700">*</span>
        </div>
        <div>
          <!-- <label for="day" class=""></label> -->
          <div
            class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
          >
            <input
              id="day"
              name="email"
              type="data"
              placeholder="今天 7/24(三)"
              aria-describedby="day-description"
              class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
            />
          </div>
          <!-- <p id="day-description" class="">選擇日期時間</p> -->
        </div>
        <div>
          <!-- <label for="day" class=""></label> -->
          <div
            class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
          >
            <input
              id="day"
              name="email"
              type="data"
              placeholder="11:00"
              aria-describedby="day-description"
              class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
            />
          </div>
          <!-- <p id="day-description" class="">選擇日期時間</p> -->
        </div>
      </div>
    </template>
    <template v-if="nowClick === 2">
      <div class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">內用桌號</div>
          <div
            class="flex items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
          >
            <span class="tickets-netural-950 text-center text-xs font-medium">必填</span>
          </div>
        </div>
        <div>
          <!-- <label for="day" class=""></label> -->
          <div
            class="flex items-center gap-2 rounded-full border border-tickets-netural-950 bg-white py-2 pl-4 pr-3"
          >
            <input
              id="day"
              name="email"
              type="data"
              placeholder="請填寫桌號"
              aria-describedby="day-description"
              class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
            />
          </div>
          <!-- <p id="day-description" class="">選擇日期時間</p> -->
        </div>
      </div>
    </template>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">會員集點</div>
        <div
          class="flex items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
        >
          <span class="text-center text-xs font-medium">必填</span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <div class="text-base font-medium">請輸入手機號碼</div>
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
            placeholder="0912345678"
            aria-describedby="phone-description"
            class="shrink grow basis-0 text-base font-medium text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
          />
        </div>
        <!-- <p id="phone-description" class="">選擇日期時間</p> -->
      </div>
    </div>

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
        <UiCounter
          :btn-group-p="'gap-4'"
          :font-size="'text'"
          :btn-size="'w-7 h-7'"
          :icon-size="'w-3 h-3'"
        />
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="tickets-netural-950 text-base font-normal leading-snug">特殊需求</div>
            <div
              class="flex items-center justify-center gap-1 rounded-full bg-tickets-primary-200 px-2.5 py-0.5"
            >
              <div class="tickets-netural-950 text-center text-xs font-medium">選填</div>
            </div>
          </div>

          <div class="flex rounded-lg border border-tickets-netural-950 bg-white px-4 py-3">
            <textarea
              id="comment"
              name="comment"
              placeholder="新增備註"
              rows="3"
              class="w-full text-base font-normal leading-snug text-tickets-netural-950 placeholder:text-gray-500 focus-visible:outline-none"
            ></textarea>
          </div>
        </div>
        <div class="text-right text-base font-normal leading-snug text-tickets-netural-500">
          0/100
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
      <RouterLink to="/cartPayInformation">
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
          <span>前往結帳</span> <span>$100</span>
        </UiButton>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped></style>

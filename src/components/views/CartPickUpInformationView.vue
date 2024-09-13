<script setup lang="ts">
import { useCustomerStore } from '@/stores/productsStore'
import { computed, onMounted, ref, watch } from 'vue'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'

//-----
//api
const customerStore = useCustomerStore()
// 數量
const serving = ref<[]>([])
//-----
//選單項目
const customerStatus: {
  name: string
  id: '預約自取' | '外帶' | '內用'
}[] = [
  { name: '預約自取', id: '預約自取' },
  { name: '現場外帶', id: '外帶' },
  { name: '內用', id: '內用' }
]
const goCheckoutType = ref<'預約自取' | '外帶' | '內用'>(
  customerStatus[0].id as '預約自取' | '外帶' | '內用'
)
// 選單控制
const customerStatusClick = ref<number>(0)
function toggleMenu(index: number) {
  customerStatusClick.value = index
  goCheckoutType.value = customerStatus[index].id
}
//選單判斷
function customerStatusApi() {
  for (let i = 0; i < customerStatus.length; i++) {
    if (customerStatusClick.value === 0) {
      return
    } else if (customerStatusClick.value === 1) {
      return
    } else if (customerStatusClick.value === 2) {
      console.log(6666)
    } else {
      console.log('無設定此選單')
      return
    }
  }
}
//-----
//取得購物車現有訂單
const cart: any = computed(() => customerStore.getCartData)
//取得現在購物車的商品筆數跟總價
const orderInfo: any = computed(() => customerStore.getOrderInfoData)
//-----
//電話
const goCheckoutPhone = ref('')
//預約日期
const goCheckoutTakeDate = ref(takeTimeDateArray(0))
//預約時間
const goCheckoutTakeTime = ref()
//桌號
const goCheckoutTable = ref('')
//-----
//取得外帶自取時間選項
const takeTime: any = computed(() => customerStore.getTakeTimeData)
//取得「今天、明天、後天」的日期
function takeTimeDateArray(inputDate: 0 | 1 | 2) {
  const today = new Date()
  // 格式化日期為 YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear() // 取得四位數的年份
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份從 0 開始，所以加 1
    const day = String(date.getDate()).padStart(2, '0') // 確保日期有兩位數
    return `${year}-${month}-${day}`
  }
  // 今天、明天、後天 =3
  // return Array.from({ length: 3 }, (_, i) => {
  //   const date = new Date(today)
  //   date.setDate(today.getDate() + i)
  //   return formatDate(date)
  // })
  const date = new Date(today)
  date.setDate(today.getDate() + inputDate)
  return formatDate(date)
}

function filterByDateFunction() {
  // 定義篩選函數
  const filterByDate = (data: any[], date: any) => {
    return data.filter((item) => {
      // 解析日期部分
      let itemDate = item.takeTime.split(' ')[1].split('(')[0] // 取得 '??/??' 移除(Mon)
      console.log(goCheckoutTakeDate.value)

      console.log(itemDate === goCheckoutTakeDate.value)

      return itemDate === goCheckoutTakeDate.value
    })
  }
  console.log(filterByDate(takeTime.value, goCheckoutTakeDate.value))

  // 使用篩選函數
  // return filterByDate(takeTime.value, goCheckoutTakeDate.value)
}

// 篩選符合當前日期的項目
function confirmTodayDate() {
  // return takeTime.value.filter((takeTimeItem: any) =>
  //   takeTimeItem.takeTime.includes(takeTimeDateArray)
  // )
}
//-----
//備註文字
const goCheckoutNote = ref('')
//判斷最高字數，最高數入數量
watch(goCheckoutNote, (newValue) => {
  if (newValue.length > 100) {
    goCheckoutNote.value = newValue.slice(0, 100) // 截斷文字
  }
})
//-----
//前往結帳
async function goCheckout() {
  let data: {
    orderId: number
    guid: string
    phone: string | null
    type: '內用' | '外帶' | '預約自取' // 僅允許三種型別
    table?: string | null
    takeTime?: string | null
    note?: string
  } = {
    orderId: Number(localStorage.orderId),
    guid: String(localStorage.guid),
    phone: goCheckoutPhone.value,
    type: goCheckoutType.value,
    table: goCheckoutTable.value,
    takeTime: goCheckoutTakeDate.value,
    note: goCheckoutNote.value
  }
  await customerStore.fetchCustomerPostGoCheckout(data)
}
//-----
onMounted(async () => {
  //取得購物車現有訂單
  await customerStore.fetchCustomerGetCart(localStorage.orderId, localStorage.guid)
  //購物車商品數量
  serving.value = cart.value.map((cartItem: { serving: number }) => cartItem.serving)
  //取得外帶自取時間選項
  await customerStore.fetchCustomerGetTakeTime()

  filterByDateFunction()
})
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
          <template v-if="index === customerStatusClick">
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
    <template v-if="customerStatusClick === 0">
      <div class="flex flex-col gap-2">
        <div class="text-base font-medium text-black">門市資訊</div>
        <div class="flex flex-col rounded-lg bg-secondary-100 p-3">
          <div class="text-base text-neutral-950">BUY咖</div>
          <div class="text-base text-neutral-600">高雄市苓雅區四維三路217號</div>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">自取時間</div>
          <UiBadge :style="'radioBadge'" />
        </div>

        <UiInput
          :id="'goCheckoutTakeDate'"
          :is-label="true"
          :label="'選擇日期'"
          :is-important="true"
          :type="'date'"
          :step="1"
          :placeholder="goCheckoutTakeDate"
          :value="goCheckoutTakeDate"
          :min="takeTimeDateArray(0)"
          :max="takeTimeDateArray(2)"
          v-model="goCheckoutTakeDate"
        >
          <template #helper></template>
          <template #validationMessage></template>
        </UiInput>
        {{ goCheckoutTakeTime }}
        <UiSelect :id="'goCheckoutTakeTime'" v-model="goCheckoutTakeTime">
          <template #option>
            <!-- <template v-for="(index) in ">
    <option value=""></option>
   </template> -->
          </template>
          <template #helper></template>
          <template #validationMessage></template>
        </UiSelect>
      </div>
    </template>
    <template v-if="customerStatusClick === 2">
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
          v-model="goCheckoutTable"
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
        :id="'goCheckoutPhone'"
        :is-label="true"
        :label="'請輸入手機號碼'"
        :placeholder="'0912345678'"
        :is-important="false"
        :type="'text'"
        v-model="goCheckoutPhone"
      >
        <template #helper></template>
        <template #validationMessage></template>
      </UiInput>
    </div>

    <div class="flex flex-col justify-end gap-2">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-black">訂單內容</div>
      </div>
      <template v-if="orderInfo">
        <template v-for="(cartItem, index) in cart" :key="index">
          <template v-if="serving[index] > 0">
            <div
              class="flex items-center justify-between rounded-lg border border-neutral-950 bg-white p-3"
            >
              <div class="flex items-center gap-4">
                <img
                  class="relative h-[75px] w-[75px] rounded-lg object-cover object-right"
                  src="../../assets/img/1002928.jpg"
                />
                <!-- <img
              class="relative h-[75px] w-[75px] rounded-lg object-cover object-right"
              :src="cartItem.imagePath"
            /> -->
                <div class="flex w-[118px] flex-col gap-1">
                  <div class="text-base font-bold text-black">{{ cartItem.name }}</div>
                  <div class="text-xs font-medium text-neutral-300">
                    {{ cartItem.customization.join(' |') }}
                  </div>
                  <div class="text-base font-medium text-black">{{ cartItem.price }}</div>
                </div>
              </div>
              <UiCounter
                v-model="serving[index]"
                :order-item-id="cartItem.orderItemId"
                :serving="serving[index]"
              ></UiCounter>
            </div>
          </template>
        </template>
      </template>

      <div class="flex flex-col gap-1">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="tickets-neutral-950 text-base font-normal leading-snug">特殊需求</div>
            <UiBadge :style="'checkboxBadge'" />
          </div>

          <div class="flex rounded-lg border border-neutral-950 bg-white px-4 py-3">
            <textarea
              id="comment"
              name="comment"
              placeholder="新增備註"
              rows="3"
              class="w-full border-none p-0 text-base font-normal leading-snug text-neutral-950 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none"
              v-model="goCheckoutNote"
            ></textarea>
          </div>
        </div>
        <div class="text-right text-base font-normal leading-snug text-neutral-500">
          {{ goCheckoutNote.length }}/100
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center gap-3 border-t border-neutral-500 p-3">
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
      :is-only-icon="false"
      :font-size="'text justify-between flex w-full items-center'"
      :font-padding="'px-0'"
      :router-name="'cartPayInformation'"
      :icon-size="'w-auto'"
      @define-function="goCheckout"
    >
      <template #left-icon v-if="orderInfo">
        <span
          class="inline-flex h-4 min-w-4 flex-col items-center justify-center rounded border border-white text-sm"
          ><span class="p-0.5">{{ orderInfo.count }}</span></span
        >
      </template>

      <span>前往結帳</span>

      <template #right-icon v-if="orderInfo">
        <span>${{ orderInfo.totalAmount }}</span>
      </template>
    </UiButton>
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/productsStore'
import { computed, onMounted, ref, watch } from 'vue'
import { validatePhoneNumber, phoneValidateData } from '@/models/validate'
import UiCartProcess from '@/components/ui/UiCartProcess.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import { useRouter } from 'vue-router'

//-----
const router = useRouter()
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
  isTouchPhoneNumber.value = false
  phoneNumber.value = ''
  customerStatusClick.value = index
  goCheckoutType.value = customerStatus[index].id
}

//-----
//取得購物車現有訂單
const cart: any = computed(() => customerStore.getCartData)
//取得現在購物車的商品筆數跟總價
const orderInfo: any = computed(() => customerStore.getOrderInfoData)
//-----
//手機
const phoneNumber = ref<any>(undefined)
//手機驗證結果
const isValidPhoneNumber = ref<boolean>(false)
//手機是否點擊過輸入框
const isTouchPhoneNumber = ref<boolean>(false)
//-----
//桌號
const goCheckoutTable = ref('')

//-----
//取得外帶自取時間選項
const takeTime: any = computed(() => customerStore.getTakeTimeData)
//預約日期
const goCheckoutTakeDay = ref('YYYY-MM-DD')
watch(goCheckoutTakeDay, () => {
  takeTimeNumber.value = takeTimeNumberArray(goCheckoutTakeDay.value)
})
//預約時間
const goCheckoutTakeTime: any = ref('')
//-----
//日期
const takeTimeDay = ref()
const takeTimeDayComputed = computed(() => takeTimeDay.value)
//取得日期
function takeTimeDayArray() {
  const dateCount: any = {}
  takeTime.value.forEach((slot: any) => {
    const { takeDate } = slot
    if (!dateCount[takeDate]) {
      dateCount[takeDate] = 0
    }
    dateCount[takeDate]++
  })
  const uniqueDates: any = Object.keys(dateCount).map((date) => date.split('(')[0])
  return uniqueDates
}
//時間
const takeTimeNumber = ref()
const takeTimeNumberComputed = computed(() => takeTimeNumber.value)
//取得時間
function takeTimeNumberArray(day: string) {
  return takeTime.value.filter((record: { takeDate: string | any[] }) =>
    record.takeDate.includes(day)
  )
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
//重新取得購物車商品數量
async function returnCustomerGetCart() {
  await customerStore.fetchCustomerGetOrderInfo(localStorage.orderId, localStorage.guid)
}
//-----
//前往結帳
async function goCheckout() {
  let data: {
    orderId: number
    guid: string
    phone?: string | null
    type: '內用' | '外帶' | '預約自取' // 僅允許三種型別
    table?: string | null
    takeDate?: string | null
    takeTime?: string | null
    note?: string
  } = {
    orderId: Number(localStorage.orderId),
    guid: String(localStorage.guid),
    phone: phoneNumber.value,
    type: goCheckoutType.value,
    note: goCheckoutNote.value
  }
  function goCheckoutValidate(): boolean {
    //選單判斷
    if (customerStatusClick.value === 0) {
      if (goCheckoutTakeTime.value === '') {
        alert('請選擇自取時間')
        return false
      } else {
        data.takeDate = takeTimeNumberComputed.value[goCheckoutTakeTime.value].takeDate
        data.takeTime = takeTimeNumberComputed.value[goCheckoutTakeTime.value].takeTime
      }
    }
    if (customerStatusClick.value === 2) {
      if (goCheckoutTable.value === '') {
        alert('請輸入桌號')
        return false
      } else {
        data.table = goCheckoutTable.value
      }
    }
    //電話判斷
    if (phoneNumber.value && !isValidPhoneNumber.value) {
      alert(phoneValidateData.validationMessage)
      return false
    }
    return true
  }

  if (!goCheckoutValidate()) return

  await customerStore.fetchCustomerPostGoCheckout(data)
  router.push({ name: 'cartPayInformation' })
}
//-----
onMounted(async () => {
  //取得購物車現有訂單
  await customerStore.fetchCustomerGetCart(localStorage.orderId, localStorage.guid)
  //購物車商品數量
  serving.value = cart.value.map((cartItem: { serving: number }) => cartItem.serving)
  //取得外帶自取時間選項
  await customerStore.fetchCustomerGetTakeTime()
  //取得日期
  takeTimeDay.value = takeTimeDayArray()
  goCheckoutTakeDay.value = takeTimeDay.value[0]
  //取得時間
  takeTimeNumber.value = takeTimeNumberArray(goCheckoutTakeDay.value)
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

      <div v-if="takeTimeDayComputed" class="flex flex-col justify-end gap-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold text-black">自取時間</div>
          <UiBadge :style="'radioBadge'" />
        </div>
        <UiInput
          :id="'goCheckoutTakeDay'"
          :is-label="true"
          :label="'選擇日期'"
          :is-important="true"
          :type="'date'"
          :step="1"
          :placeholder="takeTimeDayComputed[0]"
          :value="goCheckoutTakeDay"
          :min="takeTimeDayComputed[0]"
          :max="takeTimeDayComputed[takeTimeDayComputed.length - 1]"
          v-model="goCheckoutTakeDay"
        >
          <template #helper></template>
          <template #validationMessage></template>
        </UiInput>
        <UiSelect :id="'goCheckoutTakeTime'" v-model="goCheckoutTakeTime">
          <template #option>
            <template v-if="takeTimeNumberComputed">
              <template v-for="(time, index) in takeTimeNumberComputed" :key="index">
                <option :value="index">{{ time.takeTime }}</option>
              </template>
            </template>
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
        :id="'phoneNumber'"
        :is-label="true"
        :label="'請輸入手機號碼'"
        :placeholder="phoneValidateData.placeholder"
        :is-important="false"
        :type="'text'"
        v-model="phoneNumber"
        @define-focus-function="isTouchPhoneNumber = true"
        @define-input-function="validatePhoneNumber(isValidPhoneNumber, phoneNumber)"
        :is-validation-message="
          validatePhoneNumber(isValidPhoneNumber, phoneNumber) !== isTouchPhoneNumber
        "
      >
        <template #helper></template>
        <template #validationMessage>{{ phoneValidateData.validationMessage }} </template>
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
                  :src="cartItem.imagePath"
                />
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
                @counter-minus="returnCustomerGetCart"
                @counter-plus="returnCustomerGetCart"
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

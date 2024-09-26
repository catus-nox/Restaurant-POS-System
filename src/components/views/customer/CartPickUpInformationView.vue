<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer/productsStore'
import { computed, onMounted, ref, watch } from 'vue'
import {
  validatePhoneNumber,
  phoneValidateData,
  tableValidateData,
  validateTable
} from '@/models/validate'
import UiCartProcess from '@/components/ui/customer/UiCartProcess.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import { useRouter } from 'vue-router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'

import { useCustomerFunctionDataStore } from '@/stores/customer/functionDataStore'

//-----
const router = useRouter()
//api
const customerStore = useCustomerStore()
const customerFunction = useAllFunctionDataStore()
const customerFunctionDataStore = useCustomerFunctionDataStore()
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
// 如果有桌號選桌選單
const customerStatusClick = ref<number>(
  localStorage.customer_table === undefined ||
    localStorage.customer_table === 'undefined' ||
    localStorage.customer_table === null ||
    !localStorage.customer_table
    ? 0
    : 2
)
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
//取得掃碼桌號
const goCheckoutTable = ref<any>(
  localStorage.customer_table === undefined ||
    localStorage.customer_table === 'undefined' ||
    localStorage.customer_table === null ||
    !localStorage.customer_table
    ? ''
    : localStorage.customer_table
)
//桌號驗證結果
const isValidTable = ref<boolean>(false)

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
  if (!takeTime.value) return
  console.log(takeTime.value)

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
  if (!takeTime.value) return
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
  //取得現在購物車的商品筆數跟總價
  await customerStore.fetchCustomerGetOrderInfo()
}
//-----
//前往結帳
async function goCheckout() {
  function orderInfoCount() {
    if (orderInfo.value == null || orderInfo.value == undefined || orderInfo.value.count <= 0) {
      customerFunction.getAlertStatusFunction(true, '購物車為空', 2)
      return false
    }
    return true
  }
  if (!orderInfoCount()) return

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
    orderId: Number(localStorage.customer_orderId),
    guid: String(localStorage.customer_guid),
    phone: phoneNumber.value,
    type: goCheckoutType.value,
    note: goCheckoutNote.value
  }
  function goCheckoutValidate(): boolean {
    //選單判斷
    if (customerStatusClick.value === 0) {
      if (goCheckoutTakeTime.value === '') {
        customerFunction.getAlertStatusFunction(true, '請選擇自取時間', 2)
        return false
      } else {
        data.takeDate = takeTimeNumberComputed.value[goCheckoutTakeTime.value].takeDate
        data.takeTime = takeTimeNumberComputed.value[goCheckoutTakeTime.value].takeTime
      }
    }
    if (customerStatusClick.value === 2) {
      if (!validateTable(isValidTable.value, goCheckoutTable.value)) {
        customerFunction.getAlertStatusFunction(true, tableValidateData.validationMessage, 2)
        return false
      } else {
        data.table = goCheckoutTable.value
      }
    }
    //電話判斷
    if (phoneNumber.value && !validatePhoneNumber(isValidPhoneNumber.value, phoneNumber.value)) {
      customerFunction.getAlertStatusFunction(true, phoneValidateData.validationMessage, 2)
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
  await customerStore.fetchCustomerGetCart()
  if (localStorage.customer_guid && localStorage.customer_orderId) {
    //購物車商品數量
    serving.value = cart.value.map((cartItem: { serving: number }) => cartItem.serving)
  }
  //取得現在購物車的商品筆數跟總價
  await customerStore.fetchCustomerGetOrderInfo()
  //-----
  // 如果沒有購物車沒有商品=0
  if (customerStore.getOrderInfoData == null) {
    return
  }
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
          :default-class="'text-left'"
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
          :placeholder="tableValidateData.placeholder"
          :is-important="false"
          :type="'text'"
          v-model="goCheckoutTable"
          :is-validation-message="!validateTable(isValidTable, goCheckoutTable)"
        >
          <template #helper></template>
          <template #validationMessage>{{ tableValidateData.validationMessage }} </template>
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
      <template v-if="cart">
        <template v-for="(cartItem, index) in cart" :key="index">
          <template v-if="serving[index] > 0">
            <div
              class="flex items-center justify-between rounded-lg border border-neutral-950 bg-white p-3"
            >
              <div class="flex items-center gap-4">
                <img
                  class="relative h-[75px] w-[75px] rounded-lg object-cover"
                  :src="cartItem.imagePath"
                />
                <div class="flex w-[118px] flex-col gap-1">
                  <div class="text-base font-bold text-black">{{ cartItem.name }}</div>
                  <div class="text-xs font-medium text-neutral-300">
                    {{ cartItem.customization.join(' | ') }}
                  </div>
                  <div class="text-base font-medium text-black">$ {{ cartItem.price }}</div>
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
      <template v-if="(orderInfo && orderInfo.count == 0) || !orderInfo">
        <div
          class="flex items-center justify-center rounded-lg bg-neutral-200 p-3 shadow-[inset_0_0_0_1px] shadow-neutral-300"
        >
          <svg
            class="h-12 w-12"
            width="650"
            height="568"
            viewBox="0 0 650 568"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M380.442 137.57C377.932 139.076 376.265 141.642 375.118 144.101C373.929 146.646 373.055 149.61 372.406 152.551C371.514 156.596 370.99 160.869 370.721 164.478L336.186 160.008C336.445 156.666 336.981 152.455 337.919 148.198C339.261 142.102 341.309 136.476 344.109 133.017C344.852 132.099 345.562 131.215 346.245 130.364C353.643 121.148 357.869 115.884 367.316 113.916C379.151 111.45 391.809 109.512 406.871 109.998C421.898 110.483 431.522 112.886 442.287 116.312C446.891 117.776 451.211 121.005 455.217 125.246C459.205 129.469 462.669 134.466 465.618 139.136C466.303 140.22 466.96 142.444 467.328 145.938C467.682 149.289 467.724 153.309 467.553 157.564C467.281 164.345 466.478 171.473 465.668 176.977L431.987 172.107C432.426 168.424 432.835 163.923 432.985 159.55C433.09 156.487 433.072 153.406 432.83 150.673C432.598 148.055 432.128 145.312 431.078 143.211C428.831 138.718 425.589 136.134 421.284 134.754C417.362 133.496 412.531 133.247 407.182 133.004C396.172 132.504 389.066 132.395 380.442 137.57Z"
              fill="white"
              stroke="#292929"
              stroke-width="8"
            />
            <path
              d="M280 163.5L280.293 159.511L276 159.195V163.5V407V411.437L280.413 410.979L280 407C280.413 410.979 280.414 410.979 280.416 410.978L280.423 410.978L280.45 410.975L280.555 410.964L280.971 410.92C281.337 410.882 281.881 410.824 282.591 410.749C284.01 410.598 286.094 410.375 288.754 410.085C294.074 409.505 301.7 408.658 310.928 407.591C329.384 405.456 354.258 402.437 379.921 398.9C405.573 395.365 432.063 391.307 453.733 387.09C464.563 384.983 474.248 382.826 482.047 380.66C489.694 378.536 495.996 376.285 499.703 373.838C512.809 365.189 522.342 354.224 528.545 339.902C534.714 325.662 537.5 308.316 537.5 287C537.5 247.887 528.528 209.31 499.631 191.115C495.681 188.628 489.21 186.428 481.401 184.414C473.458 182.365 463.681 180.402 452.799 178.542C431.028 174.819 404.593 171.465 379.064 168.649C353.522 165.832 328.832 163.548 310.532 161.968C301.38 161.178 293.823 160.564 288.554 160.147C285.919 159.939 283.855 159.78 282.45 159.673C281.747 159.619 281.209 159.579 280.846 159.552L280.434 159.521L280.329 159.513L280.302 159.511L280.296 159.511C280.294 159.511 280.293 159.511 280 163.5Z"
              fill="white"
              stroke="#292929"
              stroke-width="8"
            />
            <path
              d="M269 414C295.972 414 320.065 399.197 337.271 375.912C354.478 352.626 365 320.648 365 285.5C365 250.352 354.478 218.374 337.271 195.088C320.065 171.803 295.972 157 269 157C242.028 157 217.935 171.803 200.729 195.088C183.522 218.374 173 250.352 173 285.5C173 320.648 183.522 352.626 200.729 375.912C217.935 399.197 242.028 414 269 414Z"
              fill="white"
              stroke="#292929"
              stroke-width="8"
            />
            <path
              d="M460 318.273C460 324.09 455.888 329.739 448.408 334.046C440.981 338.322 430.588 341.03 419 341.03C407.412 341.03 397.019 338.322 389.592 334.046C382.112 329.739 378 324.09 378 318.273C378 312.456 382.112 306.807 389.592 302.5C397.019 298.224 407.412 295.515 419 295.515C430.588 295.515 440.981 298.224 448.408 302.5C455.888 306.807 460 312.456 460 318.273Z"
              fill="white"
              stroke="#292929"
              stroke-width="4"
            />
            <path
              d="M402.93 335.843C409.907 335.843 416.29 333.927 420.971 330.75C425.644 327.579 428.753 323.041 428.753 317.838C428.753 312.635 425.644 308.097 420.971 304.926C416.29 301.75 409.907 299.833 402.93 299.833C395.953 299.833 389.57 301.75 384.888 304.926C380.215 308.097 377.106 312.635 377.106 317.838C377.106 323.041 380.215 327.579 384.888 330.75C389.57 333.927 395.953 335.843 402.93 335.843Z"
              fill="#292929"
              stroke="#292929"
              stroke-width="3"
            />
            <path
              d="M460 250.758C460 256.574 455.888 262.224 448.408 266.531C440.981 270.807 430.588 273.515 419 273.515C407.412 273.515 397.019 270.807 389.592 266.531C382.112 262.224 378 256.574 378 250.758C378 244.941 382.112 239.292 389.592 234.985C397.019 230.709 407.412 228 419 228C430.588 228 440.981 230.709 448.408 234.985C455.888 239.292 460 244.941 460 250.758Z"
              fill="white"
              stroke="#292929"
              stroke-width="4"
            />
            <path
              d="M402.93 268.328C409.907 268.328 416.29 266.412 420.971 263.235C425.644 260.064 428.753 255.526 428.753 250.323C428.753 245.12 425.644 240.582 420.971 237.411C416.29 234.234 409.907 232.318 402.93 232.318C395.953 232.318 389.57 234.234 384.888 237.411C380.215 240.582 377.106 245.12 377.106 250.323C377.106 255.526 380.215 260.064 384.888 263.235C389.57 266.412 395.953 268.328 402.93 268.328Z"
              fill="#292929"
              stroke="#292929"
              stroke-width="3"
            />
            <path
              d="M147.527 385C179.127 373 289.194 368.5 338.027 368C338.027 370.833 331.027 379.4 321.027 389C311.027 398.6 288.861 408.667 279.027 412.5C269.694 415.667 250.327 425 247.527 437C244.027 452 273.527 454.5 290.527 461.5C307.527 468.5 315.527 478 310.027 496C304.527 514 258.027 529.5 227.027 535.5C196.027 541.5 204.027 537.5 147.527 539C91.0273 540.5 58.0271 511.5 51.5271 508C45.0271 504.5 38.5271 492 39.0271 479.5C39.5271 467 85.0271 460.5 100.027 458.5C115.027 456.5 125.5 449 125.5 440.5C125.5 433.5 95.5273 433.5 94.5273 422C93.5273 410.5 108.027 400 147.527 385Z"
              fill="#292929"
            />
          </svg>

          <div class="text-sm text-neutral-600">肚子空空的，趕快去點餐！</div>
        </div>
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
      :is-only-icon="false"
      :font-size="'text whitespace-nowrap !text-black font-medium'"
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
      :icon-size="'w-auto'"
      @define-function="goCheckout"
      :is-disabled="(orderInfo && orderInfo.count == 0) || !orderInfo"
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

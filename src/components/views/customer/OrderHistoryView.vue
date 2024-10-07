<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer/productsStore'
import UiButton from '@/components/ui/UiButton.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
//api
const customerStore = useCustomerStore()
//-----
const route = useRoute()
//-----
//訂單查詢(桌號、手機)
const searchOrders = computed(() => customerStore.postCustomerSearchOrdersData)
//-----
const routeData = {
  tableNumber: Number(route.params.table),
  phoneNumber: String(route.params.phone)
}
let data: { tableNumber?: Number; phoneNumber?: String } = {
  tableNumber: routeData.tableNumber,
  phoneNumber: routeData.phoneNumber
}
//-----
//重新抓取資料
async function rearrangementFunction() {
  await customerStore.fetchCustomerSearchOrders(data)
}
//-----
//選單開關
const nowClick: any = ref({
  preparationOrders: true,
  completedOrders: true
})
function nowClickFunction(click: any) {
  nowClick.value[click] = !nowClick.value[click]
}
//-----
//商品選單開關
const itemClick: any = ref({})
function itemClickFunction(click: any) {
  itemClick.value[click] = !itemClick.value[click]
}
//-----
onMounted(async () => {
  //訂單查詢(桌號、手機)
  await customerStore.fetchCustomerSearchOrders(data)
  console.log(searchOrders.value)
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-15.75rem-3.25rem)] flex-col gap-6 py-6">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="text-center text-2xl font-semibold text-black">歷史訂單</div>
    </div>

    <div class="flex flex-col gap-4 px-3">
      <div
        class="flex cursor-pointer items-center justify-between"
        @click="nowClickFunction('preparationOrders')"
      >
        <div class="text-base font-semibold text-black">
          準備中的訂單 (
          {{
            !searchOrders || searchOrders.preparationOrders.length <= 0
              ? 0
              : searchOrders.preparationOrders.length
          }}
          )
        </div>
        <template v-if="searchOrders && searchOrders.preparationOrders.length > 0">
          <svg
            v-if="nowClick.preparationOrders"
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m5 15 7-7 7 7"
            />
          </svg>
        </template>
      </div>

      <div
        v-if="searchOrders && searchOrders.preparationOrders.length > 0"
        v-show="nowClick.preparationOrders"
        class="flex flex-col gap-4 font-medium"
      >
        <template v-for="(order, index) in searchOrders.preparationOrders" :key="index">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-3 rounded-xl border border-netural-900 bg-white p-4">
              <div class="flex justify-between gap-2">
                <div>訂單進度 :</div>
                <div class="flex items-center gap-2">
                  <UiButton
                    :btn-style="'style4'"
                    :btn-width="'size-6'"
                    :btn-padding="''"
                    :icon-size="''"
                    :is-only-icon="true"
                    :font-size="'text-xs font-medium'"
                    @define-function="rearrangementFunction"
                  >
                    <template #only-icon>
                      <svg
                        class="size-4 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                        />
                      </svg>
                    </template>
                  </UiButton>
                  {{ order.orderStatus }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>取餐方式 :</div>
                <div>
                  {{ order.orderType }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>付款狀態 :</div>
                <div>
                  {{ order.orderPayment }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>訂單邊號 :</div>
                <div>
                  {{ order.orderNumber }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>結帳金額 :</div>
                <div>$ {{ order.orderAmount }}</div>
              </div>
              <div class="h-[1px] w-full bg-neutral-300"></div>
              <div class="flex flex-col justify-between gap-2">
                <div
                  class="flex cursor-pointer items-center justify-between"
                  @click="itemClickFunction('preparationOrders' + index)"
                >
                  <div>訂單明細</div>
                  <svg
                    v-if="itemClick['preparationOrders' + index]"
                    class="size-5 text-neutral-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="size-5 text-neutral-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m5 15 7-7 7 7"
                    />
                  </svg>
                </div>

                <table
                  v-show="itemClick['preparationOrders' + index]"
                  class="flex w-full flex-col text-center text-xs text-neutral-900"
                >
                  <thead class="w-full bg-neutral-200 px-2.5 py-2">
                    <tr class="flex w-full">
                      <th class="w-full px-2">商品</th>
                      <th class="w-[8rem] px-2">數量</th>
                      <th class="w-full px-2">備註</th>
                      <th class="w-[8rem] px-2">小計</th>
                      <th class="w-[8rem] px-2">點數</th>
                    </tr>
                  </thead>
                  <tbody class="w-full px-2.5">
                    <template v-for="(item, itemIndex) in order.orderItem" :key="itemIndex">
                      <tr class="flex items-center">
                        <td class="w-full px-2 py-2">
                          {{ item.name }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.quantity }}
                        </td>
                        <td class="w-full px-2 py-2">
                          {{ item.customization }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.price }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.point }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>

              <!-- <UiButton
                :btn-style="'style1'"
                :btn-width="'w-full'"
                :btn-padding="'px-6 py-2.5'"
                :icon-size="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
              >
                再訂一次
              </UiButton> -->
            </div>
          </div>
        </template>
      </div>
      <div
        v-else
        class="flex min-h-24 items-center justify-center rounded-lg bg-neutral-200 p-3 shadow-[inset_0_0_0_1px] shadow-neutral-300"
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

        <div class="text-sm text-neutral-600">buy咖這麼讚，怎麼還不試試看！</div>
      </div>

      <div
        class="flex cursor-pointer items-center justify-between"
        @click="nowClickFunction('completedOrders')"
      >
        <div class="text-base font-semibold text-black">
          完成的訂單 (
          {{
            !searchOrders || searchOrders.completedOrders.length <= 0
              ? 0
              : searchOrders.completedOrders.length
          }}
          )
        </div>
        <template v-if="searchOrders && searchOrders.completedOrders.length > 0">
          <svg
            v-if="nowClick.completedOrders && searchOrders"
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m5 15 7-7 7 7"
            />
          </svg>
        </template>
      </div>

      <div
        v-if="searchOrders && searchOrders.completedOrders.length > 0"
        v-show="nowClick.completedOrders"
        class="flex flex-col gap-4"
      >
        <template v-for="(order, index) in searchOrders.completedOrders" :key="index">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-3 rounded-xl border border-netural-900 bg-white p-4">
              <div class="flex justify-between gap-2">
                <div>訂單進度 :</div>
                <div class="flex items-center gap-2">
                  {{ order.orderStatus }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>取餐方式 :</div>
                <div>
                  {{ order.orderType }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>付款狀態 :</div>
                <div>
                  {{ order.orderPayment }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>訂單邊號 :</div>
                <div>
                  {{ order.orderNumber }}
                </div>
              </div>
              <div class="flex justify-between gap-2">
                <div>結帳金額 :</div>
                <div>$ {{ order.orderAmount }}</div>
              </div>
              <div class="h-[1px] w-full bg-neutral-300"></div>
              <div class="flex flex-col justify-between gap-2">
                <div
                  class="flex cursor-pointer items-center justify-between"
                  @click="itemClickFunction('completedOrders' + index)"
                >
                  <div>訂單明細</div>
                  <svg
                    v-if="itemClick['completedOrders' + index]"
                    class="size-5 text-neutral-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="size-5 text-neutral-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m5 15 7-7 7 7"
                    />
                  </svg>
                </div>

                <table
                  v-show="itemClick['completedOrders' + index]"
                  class="flex w-full flex-col text-center text-xs text-neutral-900"
                >
                  <thead class="w-full bg-neutral-200 px-2.5 py-2">
                    <tr class="flex w-full">
                      <th class="w-full px-2">商品</th>
                      <th class="w-[8rem] px-2">數量</th>
                      <th class="w-full px-2">備註</th>
                      <th class="w-[8rem] px-2">小計</th>
                      <th class="w-[8rem] px-2">點數</th>
                    </tr>
                  </thead>
                  <tbody class="w-full px-2.5">
                    <template v-for="(item, itemIndex) in order.orderItem" :key="itemIndex">
                      <tr class="flex items-center">
                        <td class="w-full px-2 py-2">
                          {{ item.name }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.quantity }}
                        </td>
                        <td class="w-full px-2 py-2">
                          {{ item.customization }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.price }}
                        </td>
                        <td class="w-[8rem] px-2 py-2">
                          {{ item.point }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <!-- 
              <UiButton
                :btn-style="'style1'"
                :btn-width="'w-full'"
                :btn-padding="'px-6 py-2.5'"
                :icon-size="''"
                :is-only-icon="false"
                :font-size="'text-xs'"
              >
                再訂一次
              </UiButton> -->
            </div>
          </div>
        </template>
      </div>

      <div
        v-else
        class="flex min-h-48 items-center justify-center rounded-lg bg-neutral-200 p-3 shadow-[inset_0_0_0_1px] shadow-neutral-300"
      >
        <div class="text-sm text-neutral-600">甜點正在排隊上榜單...</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

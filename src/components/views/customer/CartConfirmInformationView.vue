<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer/productsStore'
import { computed, onMounted, watch } from 'vue'
import UiCartProcess from '@/components/ui/customer/UiCartProcess.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useRoute } from 'vue-router'
//-----
const route = useRoute()
watch(
  () => route.path,
  (newPath, oldPath) => {}
)
//-----
//api
const customerStore = useCustomerStore()
//訂單完成畫面
const orderData: any = computed(() => customerStore.getOrderData)

//-----
onMounted(async () => {
  const orderGuid: string = String(route.params.guid)
  //訂單完成畫面
  await customerStore.fetchCustomerGetOrder(orderGuid)
})
</script>

<template>
  <div>
    <UiCartProcess :status="'-translate-x-0'" :done="2" />
  </div>
  <div class="flex flex-col justify-start gap-6 px-3 py-6" v-if="orderData">
    <div class="flex items-center justify-center gap-2">
      <svg
        class="h-7 w-7 text-primary-700"
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
          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <div class="text-2xl font-semibold text-black">訂單送出</div>
    </div>

    <div class="flex items-center justify-start gap-3">
      <div class="flex flex-col items-center justify-start gap-2">
        <div class="text-center text-base font-medium leading-normal text-black">取餐編號</div>
        <div
          class="flex flex-col items-center justify-center rounded-lg border-2 border-black bg-white p-3"
        >
          <div class="min-w-10 text-center text-[28px] font-bold leading-tight text-black">
            {{ orderData.number }}
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <div class="text-base font-medium leading-normal text-black">
          取餐方式 : {{ orderData.type }}
        </div>
        <div class="text-base font-medium leading-normal text-black">
          取餐時間 : {{ orderData.takeTime }}
        </div>
        <div class="text-base font-medium leading-normal text-black">
          付款狀態 : {{ orderData.orderStatus }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <div class="text-base font-medium leading-normal text-black">訂單明細</div>
        <table
          class="flex w-full flex-col items-start justify-start rounded border border-neutral-900 bg-white"
        >
          <thead class="w-full border-b border-neutral-900 bg-secondary-100">
            <tr class="flex w-full">
              <th class="w-full px-3 py-2.5 text-xs font-medium leading-none text-neutral-900">
                商品
              </th>
              <th class="w-2/5 px-3 py-2.5 text-xs font-medium leading-none text-neutral-900">
                數量
              </th>
              <th class="w-2/5 px-3 py-2.5 text-xs font-medium leading-none text-neutral-900">
                小計
              </th>
            </tr>
          </thead>
          <tbody class="w-full">
            <template v-for="(product, index) in orderData.products" :key="index">
              <tr class="flex items-center justify-center">
                <td
                  class="w-full px-3 py-2.5 text-center text-xs font-medium leading-none text-neutral-900"
                >
                  {{ product.name }}
                </td>
                <td
                  class="w-2/5 px-3 py-2.5 text-center text-xs font-medium leading-none text-neutral-900"
                >
                  {{ product.serving }}
                </td>
                <td
                  class="w-2/5 px-3 py-2.5 text-center text-xs font-medium leading-none text-neutral-900"
                >
                  $ {{ product.price }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center bg-primary-200 p-2">
        <div class="text-base font-semibold leading-snug text-black">
          總計 {{ orderData.count }} 項 / 共 $ {{ orderData.totalAmount }}
        </div>
      </div>
      <div class="text-base font-medium leading-normal text-black">
        備註 :
        <template v-if="orderData.note">
          {{ orderData.note }}
        </template>
        <template v-else> 無 </template>
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center gap-3 border-t border-neutral-500 p-3">
    <!-- <UiButton
      :btn-style="'style1'"
      :btn-width="'w-full '"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :icon-style="''"
      :is-only-icon="false"
      :font-size="'text '"
      :font-padding="'px-0'"
      :router-name="'menu'"
    >
      會員登入
    </UiButton> -->
    <UiButton
      :btn-style="'style4'"
      :btn-width="'w-full'"
      :btn-padding="'px-6 py-2'"
      :icon-size="''"
      :icon-style="''"
      :is-only-icon="false"
      :font-size="'text '"
      :font-padding="'px-0'"
      :router-name="'menu'"
    >
      回到首頁
    </UiButton>
  </div>
</template>
<style scoped></style>

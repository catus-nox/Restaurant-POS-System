<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customer/productsStore'
import UiButton from '@/components/ui/UiButton.vue'

//-----
const route = useRoute()
//-----api
const customerStore = useCustomerStore()
//-----
defineEmits(['counterPlus', 'counterMinus'])
const props = defineProps({
  orderItemId: {
    type: Number,
    default: 0
  },
  serving: {
    type: Number,
    default: 0
  }
})
const model = defineModel()
//-----
let baseCountNumber: any = 1
const quantity: any = computed({
  get: () => model.value,
  set: (value: any) => {
    const parsedValue = parseInt(value, 10)
    if (!isNaN(parsedValue) && parsedValue >= baseCountNumber) {
      model.value = parsedValue
    } else {
      model.value = baseCountNumber
    }
  }
})

const increment = () => {
  quantity.value++
  const serving = Number(model.value) + 1
  incrementToCArtDataFunction(serving)
}
const decrement = () => {
  baseCountNumber = ['cartPickUpInformation'].includes(route.name as string) ? 0 : 1
  if (quantity.value > baseCountNumber) {
    quantity.value--
  }
  const serving = Number(model.value) - 1 < 0 ? 0 : Number(model.value) - 1
  incrementToCArtDataFunction(serving)
}
const updateQuantity = (target: HTMLInputElement) => {
  model.value = target.value
  incrementToCArtDataFunction(Number(target.value))
}

async function incrementToCArtDataFunction(serving: number) {
  const data = {
    orderId: String(localStorage.customer_orderId),
    orderItemId: props.orderItemId,
    serving: serving
  }
  await customerStore.fetchCustomerPostEditCart(data)
  returnCustomerGetCart()
}
//-----
//重新取得購物車商品數量
async function returnCustomerGetCart() {
  //取得現在購物車的商品筆數跟總價
  await customerStore.fetchCustomerGetOrderInfo()
}
//-----
onMounted(() => {})
</script>

<template>
  <div class="flex w-fit items-center gap-4">
    <UiButton
      @define-function="decrement"
      :btn-style="'style4'"
      :is-only-icon="true"
      :btn-padding="'p-2'"
    >
      <template #only-icon>
        <svg
          class="h-3 w-3 text-neutral-950"
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
            d="M5 12h14"
          />
        </svg>
      </template>
    </UiButton>
    <input
      class="text-tickets-neutral-950 block h-4 w-12 min-w-8 border-none bg-transparent bg-opacity-0 text-center text shadow-none outline-none checked:bg-black focus:ring-0 focus-visible:ring-0"
      :value="quantity"
      @blur="updateQuantity($event.target as HTMLInputElement)"
    />
    <UiButton
      @define-function="increment"
      :btn-style="'style4'"
      :is-only-icon="true"
      :btn-padding="'p-2'"
    >
      <template #only-icon>
        <svg
          class="h-3 w-3 text-neutral-950"
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
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </template>
    </UiButton>
  </div>
</template>

<style scoped></style>

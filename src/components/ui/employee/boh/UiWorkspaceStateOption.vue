<script setup lang="ts">
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import UiButton from '@/components/ui/UiButton.vue'
import UiInputOption from '@/components/ui/UiInputOption.vue'
import { computed, ref, type PropType } from 'vue'

//-----
//api
const employeeStore = useEmployeeStore()
const functionDataStore = useFunctionDataStore()
//-----
const props = defineProps({
  orderData: {
    type: Object as PropType<any>,
    default: () => ({
      typeAndNumber: '--???',
      time: '??:??取餐',
      orderId: 0,
      items: [
        {
          Name: '?????',
          Quantity: 1,
          Customization: '????'
        }
      ]
    })
  }
})
const model = defineModel()
defineEmits(['defineFunction'])
//點擊
let clicks: any = ref([])
// const clickComputed = computed(() => click.value)
for (let index = 0; index < props.orderData.items.length; index++) {
  clicks.value.push(false)
}
</script>

<template>
  <div
    class="order inline-flex h-fit max-h-full w-full min-w-[calc(1rem*19.75)] max-w-[calc(1rem*19.75)] cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_2px] shadow-neutral-900"
  >
    <div
      class="inline-flex flex-col gap-4 p-4 font-bold text-black shadow-[0_2px_0_-1px] shadow-neutral-900"
    >
      <UiButton
        :btn-style="'style1'"
        :btn-width="'min-w-60'"
        @define-function="$emit('defineFunction', props.orderData.orderId)"
      >
        完成備餐
      </UiButton>
      <div class="flex flex-col gap-2">
        <div class="text-5xl">{{ props.orderData.typeAndNumber }}</div>
        <div class="text-h1">{{ props.orderData.time }}</div>
      </div>
    </div>

    <div class="overflow-y-auto">
      <UiInputOption
        v-for="(PickedOption, index) in props.orderData.items"
        :key="index"
        :id="`${props.orderData.typeAndNumber}${index}`"
        :value="index"
        :border-radius="'rounded'"
        :type="'checkbox'"
        class="boh-order p-4"
        v-model="model"
        :class="String(model).includes(String(index)) ? 'orderClick' : ''"
      >
        <div
          class="inline-flex grow basis-0 flex-col gap-0.5 text-3xl font-medium text-neutral-950"
        >
          <div class="orderClickText text-4xl">{{ PickedOption.Name }}</div>
          <div class="orderClickText">x {{ PickedOption.Quantity }}</div>
          <div class="inline-flex items-center gap-3 bg-primary-100 p-2 font-normal">
            {{ PickedOption.Customization }}
          </div>
        </div>
        <br />
      </UiInputOption>
    </div>
  </div>
</template>

<style scoped>
.press {
  @apply shadow-[0_0_0_4px] shadow-primary-700;
}
.order {
  @apply hover:shadow-[0_0_0_4px] hover:shadow-primary-700;
}
.scrollbar::-webkit-scrollbar {
  @apply hidden;
}
.orderClick .orderClickText {
  @apply line-through;
}
</style>

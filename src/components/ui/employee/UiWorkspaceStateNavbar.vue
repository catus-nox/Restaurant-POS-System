<script setup lang="ts">
import { useEmployeeFunctionDataStore } from '@/stores/employee/functionDataStore'
import { computed } from 'vue'
import type { PropType } from 'vue'

//-----
//api
const employeeFunctionDataStore = useEmployeeFunctionDataStore()
//-----
//Status選單
const orderStates = computed(() => employeeFunctionDataStore.orderStates)
//Status選單選擇
const nowOrderStatusClick = computed(() => employeeFunctionDataStore.getNowOrderStatusClick)

//-----
const props = defineProps({
  orderAllCountData: {
    type: Array as PropType<any>,
    default: () => []
  }
})
</script>

<template>
  <div class="scrollbar overflow-x-auto" v-if="employeeFunctionDataStore">
    <ul class="flex">
      <template v-for="(state, index) in orderStates" :key="index">
        <li
          :id="state"
          class="state-navbar-btn"
          :class="[
            index === nowOrderStatusClick ? 'press-state-navbar-btn' : '',
            index === 0 ? 'state-navbar-btn0' : '',
            index === 1 ? 'state-navbar-btn1' : '',
            index === 2 ? 'state-navbar-btn2' : '',
            index === 3 ? 'state-navbar-btn3' : '',
            index === 4 ? 'state-navbar-btn4' : '',

            index === nowOrderStatusClick && index === 0 ? 'press-state-navbar-btn0' : '',
            index === nowOrderStatusClick && index === 1 ? 'press-state-navbar-btn1' : '',
            index === nowOrderStatusClick && index === 2 ? 'press-state-navbar-btn2' : '',
            index === nowOrderStatusClick && index === 3 ? 'press-state-navbar-btn3' : '',
            index === nowOrderStatusClick && index === 4 ? 'press-state-navbar-btn4' : ''
          ]"
          @click="employeeFunctionDataStore.getNowOrderStatusClickFunction(index)"
        >
          <span class="relative inline-flex items-center justify-center gap-2">
            <span> {{ state }}</span>
            <span
              v-show="props.orderAllCountData[index].orderCount > 0"
              v-text="
                props.orderAllCountData[index].orderCount >= 99
                  ? '(99+)'
                  : `( ${props.orderAllCountData[index].orderCount} )`
              "
            ></span>
            <span
              v-show="employeeFunctionDataStore.getOrderDetailsNavBarStatusCount[index] > 0"
              class="alertNumber"
              v-text="
                employeeFunctionDataStore.getOrderDetailsNavBarStatusCount[index] &&
                employeeFunctionDataStore.getOrderDetailsNavBarStatusCount[index] >= 99
                  ? '99+'
                  : employeeFunctionDataStore.getOrderDetailsNavBarStatusCount[index]
              "
            ></span>
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.state-navbar-btn {
  @apply relative grow;
  @apply cursor-pointer px-2.5 py-4 text-center text-h5;
  @apply font-normal text-neutral-600 shadow-[inset_0_-2px_0_-1px] shadow-neutral-600;
}
.state-navbar-btn .alertNumber {
  @apply inline-flex size-6 items-center justify-center;
  @apply rounded-full bg-primary-300 px-1 text-xs font-medium text-neutral-950;
  @apply absolute -right-6 -top-3;
}
.press-state-navbar-btn {
  @apply font-bold shadow-[inset_0_-6px_0_-3px];
}
.state-navbar-btn:hover {
  @apply font-bold;
}
.scrollbar::-webkit-scrollbar {
  /* @apply hidden; */
}
.press-state-navbar-btn0 {
  @apply text-neutral-950 shadow-neutral-950;
}
.press-state-navbar-btn1 {
  @apply text-error-500 shadow-error-500;
}
.press-state-navbar-btn2 {
  @apply text-primary-600 shadow-primary-600;
}
.press-state-navbar-btn3 {
  @apply text-tertiary-600 shadow-tertiary-600;
}
.press-state-navbar-btn4 {
  @apply text-neutral-600 shadow-neutral-600;
}

.state-navbar-btn0:hover {
  @apply text-neutral-950;
}
.state-navbar-btn1:hover {
  @apply text-error-500;
}
.state-navbar-btn2:hover {
  @apply text-primary-600;
}
.state-navbar-btn3:hover {
  @apply text-tertiary-600;
}
.state-navbar-btn4:hover {
  @apply text-neutral-600;
}
</style>

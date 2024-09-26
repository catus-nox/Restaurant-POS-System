<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
//-----
const route = useRoute()
//-----
// api
const customerFunction = useAllFunctionDataStore()
//-----
// 關閉 Modal
customerFunction.getAlertStatusFunction(false)
// 彈窗時間
let duration = 1500
// 彈窗data
const alertStatus = computed(() => customerFunction.getAlertStatus)
// 自動消失
function showAlert() {
  setTimeout(() => {
    alertStatus.value.status === 1 ? customerFunction.getAlertStatusFunction(false) : ''
  }, duration)
}
//-----
watch(alertStatus, (newValue) => {
  if (newValue.isShow === true) {
    showAlert()
  }
})
//判斷目前頁面是否為員工
function pageCustomerOrEmployeeState(): any {
  if (route.name && (route.name as string).includes('employee')) {
    customerFunction.getCustomerOrEmployeeFunction(2)
  } else {
    customerFunction.getCustomerOrEmployeeFunction(1)
  }
  return route.name && (route.name as string).includes('employee')
}
// customerFunction.getAlertStatusFunction(true, '測試', 2)
</script>

<template>
  <div
    v-if="alertStatus.isShow === true"
    class="fixed left-1/2 top-0 z-50 h-full w-full -translate-x-1/2 bg-neutral-800/40"
    :class="[
      alertStatus.isShow === true ? '' : '-translate-x-[150%] opacity-0',
      pageCustomerOrEmployeeState()
        ? 'top-1/2 max-h-[834px] max-w-screen-xl -translate-y-1/2'
        : 'max-w-screen-sm'
    ]"
    @click="customerFunction.getAlertStatusFunction(false)"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 w-fit min-w-52 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white text-neutral-950 shadow-[inset_0_0_0_1px] shadow-neutral-600"
    >
      <div class="flex cursor-pointer flex-col items-center p-8">
        <div
          class="w-full overflow-hidden"
          :class="[
            alertStatus.status == 1 ? 'success alert-animation' : '',
            alertStatus.status == 2 ? 'error alert-animation' : ''
          ]"
        >
          <div></div>
        </div>

        <div class="text-xl" v-if="alertStatus">{{ alertStatus.text }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-animation {
  max-width: 145px;
}
.alert-animation > div {
  --animation-duration: 250ms; /* 1500/6 */
  width: calc(100% * var(--w));
  background-size: 100% 100%;
  @apply translate-x-[0%] pt-[100%];
}
.success > div {
  --w: 6;
  --step: 5;
  background-image: url(../../assets/img/alert/success.png);
  animation: a1 infinite steps(var(--step), start);
  animation-duration: 1s;
  animation-duration: calc(var(--animation-duration) * var(--w));
}
@keyframes a1 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-100% / var(--w) * var(--step)));
  }
}
.error > div {
  --w: 3;
  --step: 2;
  background-image: url(../../assets/img/alert/error.png);
  animation: a2 infinite steps(var(--step), start);
  animation-duration: calc(var(--animation-duration) * var(--w));
}
@keyframes a2 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-100% / var(--w) * var(--step)));
  }
}
</style>

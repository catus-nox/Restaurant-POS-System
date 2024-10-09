<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
//-----
const route = useRoute()
//-----
// api
const customerFunction = useAllFunctionDataStore()
//

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  isError: {
    type: Boolean,
    default: false
  },
  isSuccess: {
    type: Boolean,
    default: false
  },
  isText: {
    type: Boolean,
    default: false
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
</script>

<template>
  <div class="pointer-events-none flex flex-col items-center p-8">
    <div
      class="alert-animation w-full overflow-hidden"
      :class="[
        props.isLoading ? 'loading' : '',
        props.isSuccess ? 'success' : '',
        props.isError ? 'error' : ''
      ]"
    >
      <div></div>
    </div>
    <div class="text-xl" v-if="props.isText"><slot></slot></div>
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
  animation: aa infinite steps(var(--w), end);
  animation-duration: calc(var(--animation-duration) * var(--w));
  @apply translate-x-[0%] pt-[100%];
}
.loading > div {
  --w: 3;
  background-image: url(../../assets/img/alert/loading.png);
}
.success > div {
  --w: 6;
  background-image: url(../../assets/img/alert/success.png);
}
.error > div {
  --w: 3;
  background-image: url(../../assets/img/alert/error.png);
}
@keyframes aa {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(calc(-100%));
  }
}
</style>

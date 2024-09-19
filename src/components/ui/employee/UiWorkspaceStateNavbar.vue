<script setup lang="ts">
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import { computed } from 'vue'
import type { PropType } from 'vue'

//-----
//api
const functionDataStore = useFunctionDataStore()
//-----
//Status選單
const orderStates = computed(() => functionDataStore.orderStates)
//Status選單選擇
const nowOrderStatusClick = computed(() => functionDataStore.getNowOrderStatusClick)

//-----
const props = defineProps({
  orderAllCountData: {
    type: Array as PropType<any>,
    default: () => []
  }
})
</script>

<template>
  <div class="scrollbar overflow-x-auto" v-if="functionDataStore">
    <ul class="flex shadow-[inset_0_-2px_0_-1px] shadow-neutral-300">
      <template v-for="(state, index) in orderStates" :key="index">
        <li
          :id="state"
          class="state-navbar-btn"
          :class="index === nowOrderStatusClick ? 'press-state-navbar-btn' : ''"
          @click="functionDataStore.getNowOrderStatusClickFunction(index)"
        >
          {{ state }}
          <span
            v-text="
              props.orderAllCountData[index].orderCount >= 99
                ? '99+'
                : props.orderAllCountData[index].orderCount
            "
          ></span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.state-navbar-btn {
  @apply inline-flex grow items-center justify-center gap-2;
  @apply cursor-pointer px-2.5 py-4 text-center text-h5;
  @apply font-normal text-neutral-300;
}
.state-navbar-btn span {
  @apply inline-flex h-fit min-h-[22px] w-fit min-w-[22px] items-center justify-center;
  @apply rounded-full bg-primary-300 px-1 text-xs font-medium text-neutral-950;
}
.press-state-navbar-btn {
  @apply font-bold text-neutral-950;
  @apply shadow-[inset_0_-6px_0_-3px] shadow-neutral-950;
}
.state-navbar-btn:hover {
  @apply font-bold text-neutral-950;
}
.scrollbar::-webkit-scrollbar {
  /* @apply hidden; */
}
</style>

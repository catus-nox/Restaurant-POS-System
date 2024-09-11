<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  status: {
    type: String,
    default: '-translate-x-1/4',
    validator: (value: string) =>
      ['-translate-x-1/4', '-translate-x-[10%]', '-translate-x-0'].includes(value)
  },
  done: {
    type: Number,
    default: 0,
    validator: (value: number) => [0, 1, 2].includes(value)
  }
})
// eslint-disable-next-line vue/no-dupe-keys
const status = ['訂單資訊', '付款資訊', '確認送出']
</script>

<template>
  <div class="bg-secondary-100 p-3 px-6">
    <div class="relative z-10 flex justify-between">
      <div class="absolute left-[2rem] top-2 z-[-1] h-[1px] w-[calc(100%-4rem)] overflow-hidden">
        <div class="-left-full flex h-full w-[200%]" :class="props.status">
          <div class="h-full w-1/2 bg-primary-700"></div>
          <div class="h-full w-1/2 bg-neutral-400"></div>
        </div>
        <!-- <div class="left-1/2 h-full w-full translate-x-1/2 bg-neutral-400"></div> -->
      </div>
      <template v-for="(sta, index) in status" :key="index">
        <div
          class="done group left-0 flex w-fit flex-col items-center gap-2"
          v-if="index <= props.done"
        >
          <div
            class="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-400 bg-white text-xs text-neutral-400 group-[.done]:border-primary-700 group-[.done]:bg-primary-700 group-[.done]:text-white"
          >
            {{ index + 1 }}
          </div>
          <div class="text-xs text-neutral-400 group-[.done]:text-primary-700">
            {{ sta }}
          </div>
        </div>
        <div class="group left-0 flex w-fit flex-col items-center gap-2" v-else>
          <div
            class="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-400 bg-white text-xs text-neutral-400 group-[.done]:border-primary-700 group-[.done]:bg-primary-700 group-[.done]:text-white"
          >
            {{ index + 1 }}
          </div>
          <div class="text-xs text-neutral-400 group-[.done]:text-primary-700">
            {{ sta }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>

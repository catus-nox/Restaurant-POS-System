<script setup lang="ts">
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import { computed } from 'vue'

//-----
//api
const functionDataStore = useFunctionDataStore()
//-----
//orderBy 選項選擇
const nowOrderBySelect = computed({
  get: () => functionDataStore.getNowOrderBySelect,
  set: (value) => functionDataStore.getNowOrderBySelectFunction(value)
})

//Search 搜尋
const nowSearchFunction = computed({
  get: () => functionDataStore.getNowSearch,
  set: (value) => functionDataStore.getNowSearchFunction(value)
})
</script>

<template>
  <div class="flex gap-4 p-4" v-if="functionDataStore">
    <div class="flex max-w-[50%] grow items-center gap-2">
      <div class="text-xl font-medium">排序依據</div>
      <UiSelect
        class="grow"
        :id="'getNowOrderBySelect'"
        v-model="nowOrderBySelect"
        :is-default-disabled="false"
      >
        <template #option>
          <template v-for="(order, index) in functionDataStore.orderBy" :key="index">
            <option :value="order">{{ order }}</option>
          </template>
        </template>
        <template #helper></template>
        <template #validationMessage></template>
      </UiSelect>
    </div>
    {{ functionDataStore.getNowSearch }}
    <UiInput
      :class="'grow !flex-row items-center gap-2 text-xl'"
      :is-label="true"
      :label="'搜尋訂單'"
      :placeholder="'輸入桌號、編號或手機號碼'"
      :is-important="false"
      :type="'search'"
      :is-icon="true"
      v-model="nowSearchFunction"
      :title-class="'!m-0'"
    >
      <template #prefix>
        <svg
          class="h-6 w-6 text-neutral-950"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </template>
      <template #helper></template>
      <template #validationMessage></template>
    </UiInput>
  </div>
</template>

<style scoped></style>

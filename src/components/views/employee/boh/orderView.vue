<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useEmployeeFunctionDataStore } from '@/stores/employee/functionDataStore'
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeBohUiWorkspaceStateOption from '@/components/ui/employee/boh/UiWorkspaceStateOption.vue'
import router from '@/router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
//-----
//api
const employeeStore = useEmployeeStore()
const employeeFunctionDataStore = useEmployeeFunctionDataStore()
const allFunctionDataStore = useAllFunctionDataStore()
//-----
//內場訂單總覽
const bohGetOrder = computed(() => employeeStore.getBohGetOrderData)
//點擊
let clickGroup: any = ref([]) // 初始化為一個空陣列

// 完成備餐 (修改OrderStatusEnum)
async function bohOrderCompletedFunction(value: number) {
  await employeeStore.fetchEmployeeBohOrderCompleted(value)
}
//-----
onMounted(async () => {
  //判斷是否有登入
  if (
    localStorage.boh_identity == 'undefined' ||
    localStorage.boh_identity == 'null' ||
    !localStorage.boh_identity
  ) {
    router.push({ name: 'employeeLogin' })
    allFunctionDataStore.getAlertStatusFunction(true, '請先登入', 2)
    return
  }

  //內場訂單總覽
  await employeeFunctionDataStore.bohOrderShow()
  //點擊
  for (let i = 0; i < bohGetOrder.value.length; i++) {
    clickGroup.value.push({ ['order' + i]: [] })
  }
})

//-----
let intervalId: any = null
// 組件開啟時加定時器
onMounted(() => {
  intervalId = setInterval(() => {
    //點擊
    if (bohGetOrder.value.length >= 0) {
      for (let i = 0; i < bohGetOrder.value.length; i++) {
        clickGroup.value.push({ ['order' + i]: [] })
      }
    }
    //內場訂單總覽
    employeeFunctionDataStore.bohOrderShow()
  }, allFunctionDataStore.dataGrid)
})
// 組件卸載時清除定時器
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="flex h-full w-full grow flex-col" v-if="employeeFunctionDataStore">
    <EmployeeUiSearchAndFilterBar />
    <div class="scrollbar flex h-full w-full gap-6 overflow-x-auto p-6" v-if="bohGetOrder">
      <template v-for="(order, index) in bohGetOrder" :key="index">
        <template v-if="clickGroup[index]">
          <EmployeeBohUiWorkspaceStateOption
            :order-data="order"
            v-model="clickGroup[index]['order' + index]"
            @define-function="bohOrderCompletedFunction"
          />
        </template>
      </template>
    </div>
  </div>
</template>
<style scoped>
.scrollbar::-webkit-scrollbar {
  @apply hidden;
}
</style>

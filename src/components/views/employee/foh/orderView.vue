<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useEmployeeFunctionDataStore } from '@/stores/employee/functionDataStore'
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeUiWorkspaceStateNavbar from '@/components/ui/employee/UiWorkspaceStateNavbar.vue'
import EmployeeFohUiWorkspaceStateOption from '@/components/ui/employee/foh/UiWorkspaceStateOption.vue'
import router from '@/router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'

//-----
//api
const employeeStore = useEmployeeStore()
const employeeFunctionDataStore = useEmployeeFunctionDataStore()
const allFunctionDataStore = useAllFunctionDataStore()
//-----
//取得今日全部訂單數量與頁數
const fohGetOrderAllCountData = computed(() => employeeStore.getFohGetOrderAllCountData)
//外場訂單總覽
const fohGetOrder: any = computed(() => employeeStore.getFohGetOrderData)
//-----

onMounted(async () => {
  if (
    localStorage.foh_identity == 'undefined' ||
    localStorage.foh_identity == 'null' ||
    !localStorage.foh_identity
  ) {
    router.push({ name: 'employeeLogin' })
    allFunctionDataStore.getAlertStatusFunction(true, '請先登入', 2)
    return
  }
  //取得今日全部訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetAllOrderCount()
  //外場訂單總覽
  await employeeStore.fetchEmployeeFohGetOrder()
})

//-----
let intervalId: any = null
// 組件開啟時加定時器
onMounted(() => {
  intervalId = setInterval(() => {
    //選單顯示.orderShow()
    employeeFunctionDataStore.orderShow()
  }, allFunctionDataStore.dataGrid)
})
// 組件卸載時清除定時器
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="h-full w-full grow" v-if="employeeFunctionDataStore">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar
      v-if="fohGetOrderAllCountData"
      :order-all-count-data="fohGetOrderAllCountData"
    />
    <div class="grid grid-cols-3 gap-6 p-6">
      <template v-for="(order, index) in fohGetOrder" :key="index">
        <EmployeeFohUiWorkspaceStateOption :order-data="order" />
      </template>
    </div>
  </div>
</template>
<style scoped></style>

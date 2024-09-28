<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
//外場訂單總覽-有頁數
// const fohGetOrder: any = computed(() => employeeStore.getFohGetOrderData)
//外場訂單總覽-無頁數
const fohGetOrderNoPaging: any = computed(() => employeeStore.getFohGetOrderNoPagingData)
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
  //取得今日全部訂單數量與頁數 //外場訂單總覽
  await employeeFunctionDataStore.fohOrderShow()
})

//-----
//監聽新舊資料比較功能
function findDifferences(oldOrders: any, newOrders: any) {
  // 創建一個 Map，使用 orderId 作為 key
  const oldMap = oldOrders.map((order: any) => [order.orderId, order])
  const newMap = newOrders.map((order: any) => [order.orderId, order])

  console.log(oldOrders)

  function filterFunction(filterData: any, mapData: any) {
    return filterData.filter((order: any) => {
      const oldOrder = mapData.get(order.orderCount)
      return !oldOrder // 如果在 oldMap 中找不到這個 orderId，或找到的內容不同，則返回 true
    })
  }
  // 增加的數量
  let addDifferences = filterFunction(newOrders, oldMap)
  // // 減少的數量
  let reduceDifferences = filterFunction(oldOrders, newMap)

  console.log(addDifferences, reduceDifferences)

  return { add: addDifferences, reduce: reduceDifferences }
}
//取得新增訂單選單狀態數量比較
function findDifferencesStatusBar(oldOrders: any, newOrders: any) {
  if (!oldOrders) return
  const oldMap = oldOrders.map((order: any) => order.orderCount)
  const newMap = newOrders.map((order: any) => order.orderCount)
  const alertMap = newMap.map((value: any, index: any) => value - oldMap[index])

  employeeFunctionDataStore.getOrderDetailsNavBarStatusCountFunction(alertMap)
}
//-----
//監聽是否有資料變化
const previousApiData = ref(fohGetOrderAllCountData.value) // 上一次的 API 數據
watch(
  [fohGetOrderNoPaging, fohGetOrderAllCountData],
  (newData, oldData) => {
    if (previousApiData.value) {
      const hasChanged = JSON.stringify(oldData[1]) !== JSON.stringify(newData[1]) // 比較 newData 與 previousApiData 的差異
      if (hasChanged) {
        findDifferencesStatusBar(oldData[1], newData[1])
      } else {
        // console.log('API 資料無變化')
      }
    }
    previousApiData.value = newData[1] // 更新 previousApiData 為當前數據，供下次比較
  },
  { immediate: true }
) // { immediate: true } 確保初始時也觸發一次

//-----
let intervalId: any = null
// 組件開啟時加定時器
onMounted(() => {
  intervalId = setInterval(() => {
    //選單顯示
    employeeFunctionDataStore.fohOrderShow()
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
    <div
      class="grid h-[calc(100%-8rem)] grid-cols-3 gap-6 overflow-y-auto p-6"
      style="grid-auto-rows: 31%"
    >
      <template v-for="(order, index) in fohGetOrderNoPaging" :key="index">
        <EmployeeFohUiWorkspaceStateOption :order-data="order" />
      </template>
    </div>
  </div>
</template>
<style scoped></style>

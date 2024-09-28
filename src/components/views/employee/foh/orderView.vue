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
//外場訂單總覽-無頁數-預設
const fohGetOrderNoPagingDefaultData: any = computed(
  () => employeeStore.getFohGetOrderNoPagingDefaultData
)
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
//取得取得今日全部訂單數量與頁數-比較
function findDifferencesAllCount(oldOrders: any, newOrders: any) {
  if (!oldOrders) return
  const oldMap = oldOrders.map((order: any) => order.orderCount)
  const newMap = newOrders.map((order: any) => order.orderCount)
  const alertMap = newMap.map((value: any, index: any) => value - oldMap[index])

  employeeFunctionDataStore.getOrderDetailsNavBarStatusCountFunction(alertMap)
}
//取得今日全部訂單數量與頁數-上一次的 API 數據
const previousAllCount = ref(fohGetOrderAllCountData.value)
//取得今日全部訂單數量與頁數-監聽變化
watch(
  fohGetOrderAllCountData,
  (newData, oldData) => {
    //-----
    //取得今日全部訂單數量與頁數-監聽
    if (previousAllCount.value) {
      const hasChanged = JSON.stringify(oldData) !== JSON.stringify(newData) // 比較差異
      if (hasChanged) {
        // console.log('API 資料有變化')
        findDifferencesAllCount(oldData, newData)
      } else {
        // console.log('API 資料無變化')
      }
    }
    previousAllCount.value = newData // 更新 previous 為當前數據，供下次比較
  },
  { immediate: true } // 確保初始時也觸發一次
)
//-----
//監聽新舊資料比較功能
function findDifferencesOrderNoPaging(oldOrders: any, newOrders: any) {
  if (!oldOrders) return
  // 創建一個 Map，使用 orderId 作為 key
  const oldMap = oldOrders.map((order: any) => [order.orderId, order.orderStatus])
  const newMap = newOrders.map((order: any) => [order.orderId, order.orderStatus])

  // // 找到已被刪除的項目 (old有, 但new沒有)
  // const removedItems = oldMap.filter(
  //   (oldData: any) => !newMap.some((newData: any) => newData[0] === oldData[0])
  // )
  // // 找到新增的項目 (new有, 但old沒有)
  // const addedItems = newMap.filter(
  //   (newData: any) => !oldMap.some((oldData: any) => oldData[0] === newData[0])
  // )

  // 找到狀態有變化的項目 (id相同, 但狀態不同)
  const changedItems = newMap.filter((newData: any) => {
    const match = oldMap.find((oldData: any) => {
      return oldData[0] === newData[0]
    })
    return match && match[1] !== newData[1]
  })
  return changedItems
}
//外場訂單總覽-無頁數-預設-上一次的 API 數據
const previousOrderNoPaging = ref(fohGetOrderNoPagingDefaultData.value)
//外場訂單總覽-無頁數-監聽變化
watch(
  fohGetOrderNoPagingDefaultData,
  (newData, oldData) => {
    //-----
    //外場訂單總覽-無頁數-監聽
    if (previousOrderNoPaging.value) {
      const hasChanged = JSON.stringify(oldData) !== JSON.stringify(newData) // 比較差異
      findDifferencesOrderNoPaging(oldData, newData)
      if (hasChanged) {
        // console.log(findDifferencesOrderNoPaging(oldData, newData))
        // console.log('API 資料有變化')
      } else {
        // console.log('API 資料無變化')
      }
    }
    previousOrderNoPaging.value = newData // 更新 previous 為當前數據，供下次比較
  },
  { immediate: true } // 確保初始時也觸發一次
)
//-----
let intervalId: any = null
// 組件開啟時加定時器
onMounted(() => {
  intervalId = setInterval(() => {
    //選單顯示
    employeeFunctionDataStore.fohOrderShow()
    //
    employeeStore.fetchEmployeeFohGetOrderNoPagingDefault()
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeUiWorkspaceStateNavbar from '@/components/ui/employee/UiWorkspaceStateNavbar.vue'
import EmployeeUiWorkspaceStateOption from '@/components/ui/employee/UiWorkspaceStateOption.vue'
import EmployeeUiOrderDetailsNavbar from '@/components/ui/employee/UiOrderDetailsNavbar.vue'

//-----
//api
const employeeStore = useEmployeeStore()
//-----
//取得今日全部訂單數量與頁數
const fohGetOrderAllCountData = computed(() => employeeStore.getFohGetOrderAllCountData)
//外場訂單總覽
const fohGetOrder: any = computed(() => employeeStore.getFohGetOrderData)
//-----
//訂單狀態控制
const nowOrderStatusClick: any = ref(0)
async function toggleMenu(index: number) {
  nowOrderStatusClick.value = index

  let nowOrderStatus = 0
  if (!(index == 0)) {
    nowOrderStatus = index + 1
  }
  //取得今日訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetAllOrderCount()

  //外場訂單總覽
  let orderGetData: any = {
    orderStatus: nowOrderStatus
  }
  await employeeStore.fetchEmployeeFohGetOrder(orderGetData)
}
//-----
onMounted(async () => {
  //取得今日全部訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetAllOrderCount()
  //外場訂單總覽
  await employeeStore.fetchEmployeeFohGetOrder()
})
</script>

<template>
  <div class="h-full grow">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar
      v-if="fohGetOrderAllCountData"
      :now-order-status-click="nowOrderStatusClick"
      :order-all-count-data="fohGetOrderAllCountData"
      @toggle-menu="toggleMenu"
    />
    <div class="grid grid-cols-3 gap-6 p-6">
      <template v-for="(order, index) in fohGetOrder" :key="index">
        <EmployeeUiWorkspaceStateOption :order-data="order" />
      </template>
    </div>
  </div>
  <EmployeeUiOrderDetailsNavbar />
</template>
<style scoped></style>

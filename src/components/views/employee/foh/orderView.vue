<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeUiWorkspaceStateNavbar from '@/components/ui/employee/UiWorkspaceStateNavbar.vue'
import EmployeeUiWorkspaceStateOption from '@/components/ui/employee/UiWorkspaceStateOption.vue'
import EmployeeUiOrderDetailsNavbar from '@/components/ui/employee/UiOrderDetailsNavbar.vue'

//-----
//api
const employeeStore = useEmployeeStore()
const functionDataStore = useFunctionDataStore()
//-----
//取得今日全部訂單數量與頁數
const fohGetOrderAllCountData = computed(() => employeeStore.getFohGetOrderAllCountData)
//外場訂單總覽
const fohGetOrder: any = computed(() => employeeStore.getFohGetOrderData)
//-----
onMounted(async () => {
  //取得今日全部訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetAllOrderCount()
  //外場訂單總覽
  await employeeStore.fetchEmployeeFohGetOrder()
})
</script>

<template>
  <div class="h-full grow" v-if="functionDataStore">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar
      v-if="fohGetOrderAllCountData"
      :order-all-count-data="fohGetOrderAllCountData"
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

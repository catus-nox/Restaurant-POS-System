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
//取得今日訂單數量與頁數
const fohGetOrderCountData: any = computed(() => employeeStore.getFohGetOrderCountData)

//-----
onMounted(async () => {
  //取得今日訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetOrderCount(localStorage.token)

  console.log(fohGetOrderCountData.value)
})
</script>

<template>
  <div class="h-full grow">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar />

    <div class="grid grid-cols-3 gap-6 p-6">
      <template v-for="index in 9" :key="index">
        <EmployeeUiWorkspaceStateOption />
      </template>
    </div>
  </div>
  <EmployeeUiOrderDetailsNavbar />
</template>
<style scoped></style>

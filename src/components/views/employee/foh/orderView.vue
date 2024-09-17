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
const fohGetOrderCount: any = computed(() => employeeStore.getFohGetOrderCountData)
//外場訂單總覽
const fohGetOrder: any = computed(() => employeeStore.getFohGetOrderData)
//-----
//訂單狀態控制
const nowClick: any = ref(0)
async function toggleMenu(index: number) {
  if (index >= 0) {
    nowClick.value = index
  } else {
    nowClick.value = index + 1
  }

  let getData: {
    token: string // 添加 token 參數
    page?: number // 抓該頁的1~9筆訂單  (為空或其他值會傳第一頁)
    orderStatus?:
      | '全部訂單'
      | '0'
      | '待結帳'
      | '2'
      | '準備中'
      | '3'
      | '待取餐'
      | '4'
      | '已完成'
      | '5' //(全部訂單不會抓"已完成"的)
    type?: '0' | '全部訂單' | '內用' | '1' | '外帶' | '2' | '預約自取' | '3' //用餐類型，為空的話也是傳所有類型的(外帶跟預約自取都算外帶)
    orderBy?: '時間越早優先' | '時間越晚優先' //依據排序，為空的話會以"時間越早優先"為主
    search?: any //依據值來搜尋
  } = {
    token: localStorage.token,
    page: fohGetOrderCount.value.pageCount,
    orderStatus: '待結帳',
    type: '全部訂單',
    orderBy: '時間越早優先'
  }
  //外場訂單總覽
  await employeeStore.fetchEmployeeFohGetOrder(getData)
}

//-----
onMounted(async () => {
  //取得今日訂單數量與頁數
  await employeeStore.fetchEmployeeFohGetOrderCount(localStorage.token)

  let getData: {
    token: string // 添加 token 參數
    page?: number // 抓該頁的1~9筆訂單  (為空或其他值會傳第一頁)
    orderStatus?:
      | '全部訂單'
      | '0'
      | '待結帳'
      | '2'
      | '準備中'
      | '3'
      | '待取餐'
      | '4'
      | '已完成'
      | '5' //(全部訂單不會抓"已完成"的)
    type?: '0' | '全部訂單' | '內用' | '1' | '外帶' | '2' | '預約自取' | '3' //用餐類型，為空的話也是傳所有類型的(外帶跟預約自取都算外帶)
    orderBy?: '時間越早優先' | '時間越晚優先' //依據排序，為空的話會以"時間越早優先"為主
    search?: any //依據值來搜尋
  } = {
    token: localStorage.token,
    page: fohGetOrderCount.value.pageCount,
    orderStatus: '全部訂單',
    type: '全部訂單',
    orderBy: '時間越早優先'
  }
  //外場訂單總覽
  await employeeStore.fetchEmployeeFohGetOrder(getData)
})
</script>

<template>
  <div class="h-full grow">
    <EmployeeUiSearchAndFilterBar />
    <EmployeeUiWorkspaceStateNavbar :index="nowClick" @toggle-menu="toggleMenu" />

    <div class="grid grid-cols-3 gap-6 p-6">
      <template v-for="index in fohGetOrder" :key="index">
        <EmployeeUiWorkspaceStateOption />
      </template>
    </div>
  </div>
  <EmployeeUiOrderDetailsNavbar />
</template>
<style scoped></style>

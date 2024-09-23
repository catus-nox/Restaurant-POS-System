<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { useFunctionDataStore } from '@/stores/employee/functionDataStore'
import EmployeeUiSearchAndFilterBar from '@/components/ui/employee/UiSearchAndFilterBar.vue'
import EmployeeBohUiWorkspaceStateOption from '@/components/ui/employee/boh/UiWorkspaceStateOption.vue'
import router from '@/router'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
//-----
//api
const employeeStore = useEmployeeStore()
const functionDataStore = useFunctionDataStore()
const customerFunction = useAllFunctionDataStore()
//-----
//內場訂單總覽
const bohGetOrder = computed(() => employeeStore.getBohGetOrderData)
//點擊
let clickGroup: any = ref([]) // 初始化為一個空陣列

//-----
onMounted(async () => {
  //畔對是否有登入
  if (
    localStorage.boh_identity == 'undefined' ||
    localStorage.boh_identity == 'null' ||
    !localStorage.boh_identity
  ) {
    router.push({ name: 'employeeLogin' })
    customerFunction.getAlertStatusFunction(true, '請先登入', 2)
    return
  }

  //外場訂單總覽
  await employeeStore.fetchEmployeeBohGetOrder()
  //點擊
  for (let i = 0; i < bohGetOrder.value.length; i++) {
    clickGroup.value.push({ ['order' + i]: [] })
  }
})

async function bohOrderCompletedFunction() {
  // await employeeStorebohOrderShow
}
</script>

<template>
  <div class="flex h-full w-full grow flex-col" v-if="functionDataStore">
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

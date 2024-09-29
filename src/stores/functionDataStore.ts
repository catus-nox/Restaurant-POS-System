import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
export const useAllFunctionDataStore = defineStore('allFunction', () => {
  //------
  //每?秒抓一次資料
  const dataGrid = 3000

  //state
  const route = useRoute()

  //取得alert狀態
  const alertStatus = ref<{ isShow: boolean; status?: 1 | 2; text?: string }>({
    isShow: false,
    text: undefined // 預設為 undefined，可以是文字或 null
  })

  //取得是否為員工
  const customerOrEmployee = ref<1 | 2>(1)

  //------
  //getter

  //取得alert狀態
  const getAlertStatus = computed(() => alertStatus.value)
  //取得是否為員工
  const getCustomerOrEmployee = computed(() => customerOrEmployee.value)

  //------
  //action 異步請求

  //取得alert狀態
  function getAlertStatusFunction(isShow: boolean, text?: string, status?: 1 | 2) {
    alertStatus.value = {
      isShow,
      status,
      text
    }
  }

  function getCustomerOrEmployeeFunction(value: 1 | 2) {
    customerOrEmployee.value = value
  }

  return {
    dataGrid,
    getAlertStatus,
    getAlertStatusFunction,
    getCustomerOrEmployee,
    getCustomerOrEmployeeFunction
  }
})

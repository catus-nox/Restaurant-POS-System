import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCustomerFunctionDataStore = defineStore('customerFunction', () => {
  //------
  //state

  //取得掃碼桌號
  const customerTable = ref<number | undefined>(undefined)

  //------
  //getter

  //取得掃碼桌號
  const getCustomerTable = computed(() => customerTable.value)

  //------
  //action 異步請求

  //取得掃碼桌號
  function getCustomerTableFunction(table: number | undefined) {
    customerTable.value = table
  }

  return {
    getCustomerTable,
    getCustomerTableFunction
  }
})

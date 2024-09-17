import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { postEmployeeLogin, getEmployeeFohGetOrderCount } from '@/models/employee/api'

export const useEmployeeStore = defineStore('employee', () => {
  //------
  //state

  //員工登入
  const loginData = ref()
  //取得今日訂單數量與頁數
  const fohGetOrderCountData = ref()

  //------
  //getter

  //員工登入
  const getLoginData = computed(() => loginData.value)
  //取得今日訂單數量與頁數
  const getFohGetOrderCountData = computed(() => fohGetOrderCountData.value)

  //------
  //action 異步請求

  //員工登入
  const fetchEmployeeLogin = async (data: { account: string; password: string }) => {
    try {
      const response = await postEmployeeLogin({
        account: data.account,
        password: data.password
      })
      if (response.data.statusCode === 400) {
        alert(`${response.data.message}，去找老闆!`)
      } else {
        //員工資訊
        loginData.value = response.data.data
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //取得今日訂單數量與頁數
  const fetchEmployeeFohGetOrderCount = async (
    token: string, // 添加 token 參數
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
      | '5'
  ) => {
    // 如果 orderStatus 是 undefined，則給它一個默認值，例如 '全部訂單'
    const status = orderStatus || '全部訂單'
    try {
      const response = await getEmployeeFohGetOrderCount(token, status)
      fohGetOrderCountData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getLoginData,
    fetchEmployeeLogin,
    getFohGetOrderCountData,
    fetchEmployeeFohGetOrderCount
  }
})

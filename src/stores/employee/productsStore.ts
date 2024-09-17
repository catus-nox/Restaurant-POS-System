import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  postEmployeeLogin,
  getEmployeeFohGetOrderCount,
  getEmployeeFohGetOrder
} from '@/models/employee/api'

export const useEmployeeStore = defineStore('employee', () => {
  //------
  //state

  //員工登入
  const loginData = ref()
  //取得今日訂單數量與頁數
  const fohGetOrderCountData = ref()
  //外場訂單總覽
  const fohGetOrderData = ref()

  //------
  //getter

  //員工登入
  const getLoginData = computed(() => loginData.value)
  //取得今日訂單數量與頁數
  const getFohGetOrderCountData = computed(() => fohGetOrderCountData.value)
  //外場訂單總覽
  const getFohGetOrderData = computed(() => fohGetOrderData.value)

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
      | '5' //如果 orderStatus 是 undefined，則給它一個默認值，例如 '全部訂單' //(全部訂單不會抓"已完成"的)
  ) => {
    const status = orderStatus || '全部訂單'
    try {
      const response = await getEmployeeFohGetOrderCount(token, status)
      fohGetOrderCountData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //外場訂單總覽
  const fetchEmployeeFohGetOrder = async (getData: {
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
  }) => {
    try {
      const response = await getEmployeeFohGetOrder(getData)
      fohGetOrderData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getLoginData,
    fetchEmployeeLogin,
    getFohGetOrderCountData,
    fetchEmployeeFohGetOrderCount,
    getFohGetOrderData,
    fetchEmployeeFohGetOrder
  }
})

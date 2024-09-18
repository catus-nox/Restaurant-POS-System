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
  //取得今日全部訂單數量與頁數
  const fohGetOrderAllCountData = ref()
  //外場訂單總覽
  const fohGetOrderData = ref()

  //------
  //getter

  //員工登入
  const getLoginData = computed(() => loginData.value)
  //取得今日訂單數量與頁數
  const getFohGetOrderCountData = computed(() => fohGetOrderCountData.value)
  //取得今日全部訂單數量與頁數
  const getFohGetOrderAllCountData = computed(() => fohGetOrderAllCountData.value)
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
    getData: {
      token?: string // 添加 token 參數
      orderStatus?:
        | '全部訂單'
        | '0'
        | 0
        | '待結帳'
        | '2'
        | 2
        | '準備中'
        | '3'
        | 3
        | '待取餐'
        | '4'
        | 4
        | '已完成'
        | '5'
        | 5 //(全部訂單不會抓"已完成"的)
    } = {}
  ) => {
    try {
      let getDataStringOrderStatus = getData.orderStatus || '0'
      if (Number(getDataStringOrderStatus) != 0) {
        getDataStringOrderStatus = Number(getData.orderStatus) + 1
      }
      const getDataString: any = {
        token: getData.token,
        orderStatus: getDataStringOrderStatus
      }
      getDataString.token = localStorage.token

      const response = await getEmployeeFohGetOrderCount(getDataString)
      fohGetOrderCountData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得今日全部訂單數量與頁數
  const fetchEmployeeFohGetAllOrderCount = async (
    getData: {
      token?: string // 添加 token 參數
      orderStatus?:
        | '全部訂單'
        | '0'
        | 0
        | '待結帳'
        | '2'
        | 2
        | '準備中'
        | '3'
        | 3
        | '待取餐'
        | '4'
        | 4
        | '已完成'
        | '5'
        | 5 //(全部訂單不會抓"已完成"的)
    } = {}
  ) => {
    try {
      const allResponse = []

      let getDataStringOrderStatus = getData.orderStatus || '0'
      if (Number(getDataStringOrderStatus) != 0) {
        getDataStringOrderStatus = Number(getData.orderStatus) + 1
      }

      const getDataString: any = {
        token: getData.token,
        orderStatus: getDataStringOrderStatus
      }

      getDataString.token = localStorage.token
      const states = ['全部訂單', '待結帳', '準備中', '待取餐', '已完成']
      for (let index = 0; index < states.length; index++) {
        if (index > 0) {
          getDataString.orderStatus = index + 1
        }
        const response = await getEmployeeFohGetOrderCount(getDataString)
        allResponse.push(response.data.data)
      }
      fohGetOrderAllCountData.value = allResponse
    } catch (error) {
      console.log(error)
    }
  }

  //外場訂單總覽
  const fetchEmployeeFohGetOrder = async (
    getData: {
      token?: string // 添加 token 參數
      page?: number // 抓該頁的1~9筆訂單  (為空或其他值會傳第一頁)
      orderStatus?:
        | '全部訂單'
        | '0'
        | 0
        | '待結帳'
        | '2'
        | 2
        | '準備中'
        | '3'
        | 3
        | '待取餐'
        | '4'
        | 4
        | '已完成'
        | '5'
        | 5 //(全部訂單不會抓"已完成"的)
      type?: '0' | '全部訂單' | '內用' | '1' | '外帶' | '2' | '預約自取' | '3' //用餐類型，為空的話也是傳所有類型的(外帶跟預約自取都算外帶)
      orderBy?: '時間越早優先' | '時間越晚優先' //依據排序，為空的話會以"時間越早優先"為主
      search?: any //依據值來搜尋
    } = {}
  ) => {
    try {
      const getDataStringPage = getData.page != null ? getData.page : 1
      let getDataStringOrderStatus = getData.orderStatus != null ? getData.orderStatus : '0'
      if (Number(getDataStringOrderStatus) != 0) {
        getDataStringOrderStatus = Number(getData.orderStatus) + 1
      }

      const getDataStringType = getData.type != null ? getData.type : '0'
      const getDataStringOrderBy = getData.orderBy != null ? getData.orderBy : '時間越早優先'

      const getDataString: any = {
        token: getData.token,
        page: `?page=${getDataStringPage}`,
        orderStatus: `&orderStatus=${getDataStringOrderStatus}`,
        type: `&type=${getDataStringType}`,
        orderBy: `&orderBy=${getDataStringOrderBy}`,
        search: `&search=${getData.search}`
      }
      getDataString.token = localStorage.token
      getDataString.search = getData.search != null ? getDataString.search : null

      const response = await getEmployeeFohGetOrder(getDataString)

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
    getFohGetOrderAllCountData,
    fetchEmployeeFohGetAllOrderCount,
    getFohGetOrderData,
    fetchEmployeeFohGetOrder
  }
})

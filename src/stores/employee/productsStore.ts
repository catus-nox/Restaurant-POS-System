import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  postEmployeeLogin,
  postEmployeeLogout,
  getEmployeeFohGetOrderCount,
  getEmployeeFohGetOrder,
  getEmployeeFohFetOrderDetail,
  postEmployeeFohCheckout,
  postEmployeeFohOrderCompleted
} from '@/models/employee/api'
import router from '@/router'
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
  //取得單一訂單資訊
  const fohFetOrderDetailData = ref()

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
  //取得單一訂單資訊
  const getFohFetOrderDetailData = computed(() => fohFetOrderDetailData.value)

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
        //-----
        if (loginData.value.identity === 1) {
          localStorage.foh_identity = loginData.value.identity
          localStorage.foh_username = loginData.value.username
          localStorage.foh_token = loginData.value.token
          router.push({ name: 'employeeFohOrder' })
        }
        if (loginData.value.identity === 2) {
          localStorage.boh_identity = loginData.value.identity
          localStorage.boh_username = loginData.value.username
          localStorage.boh_token = loginData.value.token
          router.push({ name: 'employeeBohOrder' })
        }
        alert(`${loginData.value.username} ${response.data.message}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //員工登出
  const fetchEmployeeLogout = async (identity: number, getData?: { token: string }) => {
    try {
      const getDataString: any = {
        token: getData?.token
      }

      if (identity === 1) {
        getDataString.token = localStorage.foh_token
      }
      if (identity === 2) {
        getDataString.token = localStorage.boh_token
      }
      const response = await postEmployeeLogout(getDataString)

      if (response.data.statusCode === 400) {
        alert(response.data.message)
      } else {
        alert(`${loginData.value.username} ${response.data.message}`)
        if (identity === 1) {
          localStorage.foh_identity = null
          localStorage.foh_username = null
          localStorage.foh_token = null
        }
        if (identity === 2) {
          localStorage.boh_identity = null
          localStorage.boh_username = null
          localStorage.boh_token = null
        }

        router.push({ name: 'employeeLogin' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  //取得今日訂單數量與頁數
  const fetchEmployeeFohGetOrderCount = async (
    getData: {
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
        orderStatus: getDataStringOrderStatus
      }

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

      getDataString.token = localStorage.foh_token
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

      const getDataStringSearch = getData.search != null ? `&search=${getData.search}` : ''

      const getDataString: any = {
        page: `?page=${getDataStringPage}`,
        orderStatus: `&orderStatus=${getDataStringOrderStatus}`,
        type: `&type=${getDataStringType}`,
        orderBy: `&orderBy=${getDataStringOrderBy}`,
        search: getDataStringSearch
      }

      const response = await getEmployeeFohGetOrder(getDataString)

      fohGetOrderData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得單一訂單資訊
  const fetchEmployeeFohGetOrderDetail = async (orderId: number) => {
    try {
      const response = await getEmployeeFohFetOrderDetail(orderId)
      fohFetOrderDetailData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //外場結帳(外場結帳僅供現金)
  const fetchEmployeeFohCheckout = async (data: {
    orderId: number // 訂單編號，必須為數字
    cash: number // 客人付的現金，必須為數字
    note?: string // 付款備註，選填，類型為字串
    invoice: '載具' | '統編' | '捐贈發票' | '紙本' // 發票類型，特定字串選項
    invoiceCarrier?: string // 發票載具號碼或統編，選填，類型為字串
    phone?: string // 顧客電話，選填，類型為字串
  }) => {
    try {
      const response = await postEmployeeFohCheckout(data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  //完成訂單(送餐)
  const fetchEmployeeFohOrderCompleted = async (orderId: number) => {
    try {
      const response = await postEmployeeFohOrderCompleted(orderId)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  //內場訂單總覽
  const fetchEmployeeBohGetOrder = async (
    getData: {
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

      const getDataStringSearch = getData.search != null ? `&search=${getData.search}` : ''

      const getDataString: any = {
        page: `?page=${getDataStringPage}`,
        orderStatus: `&orderStatus=${getDataStringOrderStatus}`,
        type: `&type=${getDataStringType}`,
        orderBy: `&orderBy=${getDataStringOrderBy}`,
        search: getDataStringSearch
      }

      const response = await getEmployeeFohGetOrder(getDataString)

      fohGetOrderData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getLoginData,
    fetchEmployeeLogin,
    fetchEmployeeLogout,
    getFohGetOrderCountData,
    fetchEmployeeFohGetOrderCount,
    getFohGetOrderAllCountData,
    fetchEmployeeFohGetAllOrderCount,
    getFohGetOrderData,
    fetchEmployeeFohGetOrder,
    getFohFetOrderDetailData,
    fetchEmployeeFohGetOrderDetail,
    fetchEmployeeFohCheckout
  }
})

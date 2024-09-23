import request from '@/plugins/axios'

//員工登入
export function postEmployeeLogin(data: { account: string; password: string }) {
  return request({
    url: `/employee/login`,
    method: 'post',
    data: {
      account: data.account,
      password: data.password
    }
  })
}

//員工登出
export function postEmployeeLogout(
  getData: {
    token: string
  },
  data?: any
) {
  return request({
    url: `/employee/logout`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${getData.token}`
    },
    data
  })
}

//取得今日訂單數量與頁數
export function getEmployeeFohGetOrderCount(
  getData: {
    orderStatus?: string | number
  },
  data?: any
) {
  return request({
    url: `/foh/getOrderCount/${getData.orderStatus}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.foh_token}`
    },
    data //params:
  })
}

//外場訂單總覽
export function getEmployeeFohGetOrder(
  getData: {
    page?: string // 抓該頁的1~9筆訂單  (為空或其他值會傳第一頁)
    orderStatus?: string | number
    type?: string
    orderBy?: string
    search?: any //依據值來搜尋
  },
  data?: any
) {
  return request({
    url: `/foh/getOrder?${getData.page}${getData.orderStatus}${getData.type}${getData.orderBy}${getData.search}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.foh_token}`
    },
    data
  })
}

//取得單一訂單資訊
export function getEmployeeFohFetOrderDetail(orderId: number, data?: any) {
  return request({
    url: `/foh/getOrderDetail/${orderId}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.foh_token}`
    },
    data
  })
}

//外場結帳(外場結帳僅供現金)
export function postEmployeeFohCheckout(data: {
  orderId: number // 訂單編號，必須為數字
  cash: number // 客人付的現金，必須為數字
  note?: string // 付款備註，選填，類型為字串
  invoice: '載具' | '統編' | '捐贈發票' | '紙本' // 發票類型，特定字串選項
  invoiceCarrier?: string // 發票載具號碼或統編，選填，類型為字串
  phone?: string // 顧客電話，選填，類型為字串
}) {
  return request({
    url: `/foh/checkout`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.foh_token}`
    },
    data: {
      orderId: data.orderId,
      cash: data.cash,
      note: data.note,
      invoice: data.invoice,
      invoiceCarrier: data.invoiceCarrier,
      phone: data.phone
    }
  })
}

//完成訂單(送餐)
export function postEmployeeFohOrderCompleted(orderId: number) {
  return request({
    url: `/foh/orderCompleted`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.foh_token}`
    },
    data: {
      orderId
    }
  })
}

//內場訂單總覽
export function getEmployeeBohGetOrder(
  getData: {
    type?: '0' | 0 | '全部訂單' | '內用' | '1' | 1 | '外帶' | '2' | 2 | '預約自取' | '3' | 3
    orderBy?: '時間越早優先' | '時間越晚優先'
    search?: any
  },
  data?: any
) {
  return request({
    url: `/boh/getOrder?${getData.type}${getData.orderBy}${getData.search}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.boh_token}`
    },
    data
  })
}

// 完成備餐 (修改OrderStatusEnum)
export function getEmployeeBohOrderCompleted(orderId: number) {
  return request({
    url: `/boh/orderCompleted`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.boh_token}`
    },
    data: {
      orderId
    }
  })
}

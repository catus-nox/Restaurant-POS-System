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
    token?: string // 添加 token 參數
    orderStatus?: string | number
  },
  data?: any
) {
  return request({
    url: `/foh/getOrderCount/${getData.orderStatus}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${getData.token}`
    },
    data //params:
  })
}

//外場訂單總覽
export function getEmployeeFohGetOrder(
  getData: {
    token?: string // 添加 token 參數
    page?: string // 抓該頁的1~9筆訂單  (為空或其他值會傳第一頁)
    orderStatus?: string | number
    type?: string
    orderBy?: string
    search?: any //依據值來搜尋
  },
  data?: any
) {
  return request({
    url: `/foh/getOrder${getData.page}${getData.orderStatus}${getData.type}${getData.orderBy}${getData.search}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${getData.token}`
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
export function postEmployeeCheckout(data: {
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

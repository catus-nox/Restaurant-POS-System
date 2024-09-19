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

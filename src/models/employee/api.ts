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

//取得今日訂單數量與頁數
export function getEmployeeFohGetOrderCount(
  token: string, // 添加 token 參數
  //orderStatus為空的話就會回傳全部訂單的結果 (全部訂單不會抓"已完成"的)
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
    | '5',
  data?: any
) {
  return request({
    url: `/foh/getOrderCount/${orderStatus}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data //params:
  })
}

//外場訂單總覽
export function getEmployeeFohGetOrder(
  getData: {
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
    orderBy?: '時間越早優先' | '時間越早優先' | '時間越晚優先' //依據排序，為空的話會以"時間越早優先"為主
    search?: any //依據值來搜尋
  },
  data?: any
) {
  return request({
    url: `/foh/getOrder?page=${getData.page}&orderStatus=${getData.orderStatus}&type=${getData.type}&orderBy=${getData.orderBy}&search=${getData.search}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${getData.token}`
    },
    data
  })
}

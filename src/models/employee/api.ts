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
      Authorization: `Bearer ${token}` // 在 headers 中添加 Authorization
    },
    data //params:
  })
}

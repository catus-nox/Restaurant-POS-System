import request from '@/plugins/axios'

//取得菜單類別(咖啡、蛋糕、餅乾…)
export function getCustomerGetMenuCategory(data?: any) {
  return request({
    url: '/customer/getMenuCategory',
    method: 'get',
    data
  })
}

//取得菜單品項(美式咖啡、拿鐵…)
export function getCustomerGetMenuItem(data?: any) {
  return request({
    url: '/customer/getMenuItem',
    method: 'get',
    data
  })
}

//取得單一餐點資訊
export function getCustomerGetProduct(id: any, data?: any) {
  return request({
    url: `/customer/getProduct/${id}`,
    method: 'get',
    data
  })
}

//取得OrderId跟Guid(唯一識別碼)
//(使用者第一次加入購物車時索取訂單資訊)
export function getOrderId(data?: any) {
  return request({
    url: `/customer/getOrderId`,
    method: 'get',
    data
  })
}

//加入購物車
export function addItem(data: {
  guid: string
  orderId: number
  productId: number
  customization?: {
    options?: string
    extraPrice?: number
  }[]
  serving: number
}) {
  return request({
    url: `/customer/addItem`,
    method: 'POST',
    data: {
      guid: data.guid,
      orderId: data.orderId,
      productId: data.productId,
      customization: data.customization,
      serving: data.serving
    }
  })
}

//取得現在購物車的商品筆數跟總價
export function getOrderInfo(id: number, guid: string, data?: any) {
  return request({
    url: `/customer/getOrderInfo/${id}/${guid}`,
    method: 'get',
    data
  })
}

//取得購物車現有訂單
export function getCart(id: number, guid: string, data?: any) {
  return request({
    url: `/customer/getCart/${id}/${guid}`,
    method: 'get',
    data
  })
}

//購物車訂單編輯(修改份數)
export function postEditCart(data: { orderId: string; orderItemId: number; serving: number }) {
  return request({
    url: `/customer/editCart`,
    method: 'POST',
    data: {
      orderId: data.orderId,
      orderItemId: data.orderItemId,
      serving: data.serving
    }
  })
}

//前往結帳
export function postGoCheckout(data: {
  orderId: number // 訂單Id
  guid: string // 唯一識別碼
  phone: string | null // 顧客電話
  type: '內用' | '外帶' | '預約自取' // 用餐類型，只能是"內用"、"外帶"或"預約自取"
  table?: string | null // 桌號，非內用則可以是null或空字串
  takeTime?: string | null // 外帶時間，可以是null或特定日期格式的字串
  note?: string // 顧客的其他備註
}) {
  return request({
    url: `/customer/goCheckout`,
    method: 'POST',
    data: {
      orderId: data.orderId,
      guid: data.guid,
      phone: data.phone,
      type: data.type,
      table: data.table,
      takeTime: data.takeTime,
      note: data.note
    }
  })
}
//送出訂單(選擇結帳方式-現金)
export function postConfirmOrderCash(data: {
  orderId: Number
  guid: String
  invoice: '載具' | '統編' | '捐贈發票' | '紙本' //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
  invoiceCarrier?: String | null //發票載具號碼or統編
}) {
  return request({
    url: `/customer/confirmOrderCash`,
    method: 'POST',
    data: {
      orderId: data.orderId,
      guid: data.guid,
      invoice: data.invoice,
      invoiceCarrier: data.invoiceCarrier
    }
  })
}

//訂單完成畫面
export function getOrder(guid: string, data?: any) {
  return request({
    url: `/customer/getOrder/${guid}`,
    method: 'get',
    data
  })
}

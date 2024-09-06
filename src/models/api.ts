import request from '@/plugins/axios'

//取得菜單類別(咖啡、蛋糕、餅乾…)
export function GetCustomerGetMenuCategory(data?: any) {
  return request({
    url: '/customer/getMenuCategory',
    method: 'get',
    data
  })
}

//取得菜單品項(美式咖啡、拿鐵…)
export function GetCustomerGetMenuItem(data?: any) {
  return request({
    url: '/customer/getMenuItem',
    method: 'get',
    data
  })
}

//取得單一餐點資訊
export function GetCustomerGetProduct(id: any, data?: any) {
  return request({
    url: `/customer/getProduct/${id}`,
    method: 'get',
    data
  })
}

//取得OrderId跟Guid(唯一識別碼)
//(使用者第一次加入購物車時索取訂單資訊)
export function GetOrderId(data?: any) {
  return request({
    url: `/customer/getOrderId`,
    method: 'get',
    data
  })
}

//加入購物車
export function PostAddItem(data: {
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
    // url: `/customer/addItem`,
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

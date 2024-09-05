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

// export function useProducts(page, category, data) {

//  let text = ''
//  if (page > 0 || category !== '') {
//   text = "?"

//   if (page > 0 && category !== '') {
//    text += `page=${page}&category=${category}`
//   }
//   else if (page > 0) {
//    text += `page=${page}`
//   }
//   else if (category !== '') {
//    text += `category=${category}`
//   }
//  }
//  // console.log(`/products${text}`);

//  return request({
//   url: `/products${text}`,
//   method: "get",
//   data,
//  });
// }

// export function useProductId(id, data) {
//  return request({
//   url: `/product/${id}`,
//   method: "get",
//   data,
//  });
// }

// //客戶購物 - 購物車 (Cart)

// export function postCart(product_id, qty) {
//  return request({
//   url: `/cart`,
//   method: "post",
//   'accept': 'application/json',
//   'Content-Type': 'application/json',
//   data: {
//    "data": {
//     product_id,
//     qty
//    }
//   }
//  });
// }
// export function getCart(data) {
//  return request({
//   url: `/cart`,
//   method: "get",
//   data,
//  });
// }

// export function putCart(product_id, qty) {
//  return request({
//   url: `/cart/${product_id}`,
//   method: "put",
//   data: {
//    "data": {
//     product_id,
//     qty
//    }
//   }
//  });
// }

// export function deleteCart(product_id) {
//  return request({
//   url: `/cart/${product_id}`,
//   method: "delete",
//   'accept': 'application/json',
//  });
// }

// //客戶購物 - 優惠券 (Coupon)
// export function postCoupon(code) {
//  return request({
//   url: `/coupon`,
//   method: "post",
//   'accept': 'application/json',
//   'Content-Type': 'application/json',
//   data: {
//    "data": {
//     code
//    }
//   }
//  });
// }
// //客戶購物 - 結帳 (Order)

// export function postOrder(name, email, tel, address, message) {
//  return request({
//   url: `/order`,
//   method: "post",
//   'accept': 'application/json',
//   'Content-Type': 'application/json',
//   data: {
//    "data": {
//     "user": {
//      name,
//      email,
//      tel,
//      address
//     },
//     message
//    }
//   }
//  });
// }

// export function getOrders(data) {
//  return request({
//   url: `/orders`,
//   method: "get",
//   data,
//  });
// }
// //客戶購物 - 付款 (Pay)

// export function postPay(order_id) {
//  return request({
//   url: `/pay/${order_id}`,
//   method: "post",
//   'accept': 'application/json',
//  });
// }

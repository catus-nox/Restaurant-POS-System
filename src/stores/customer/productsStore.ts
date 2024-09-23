import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAllFunctionDataStore } from '@/stores/functionDataStore'
import {
  getCustomerGetMenuCategory,
  getCustomerGetMenuItem,
  getCustomerGetProduct,
  getOrderId,
  addItem,
  getOrderInfo,
  getCart,
  postEditCart,
  getTakeTime,
  postGoCheckout,
  postConfirmOrderCash,
  postConfirmOrderLinePay,
  postConfirmLinePayRequest,
  getOrder
} from '@/models/customer/api'
import router from '@/router'

export const useCustomerStore = defineStore('customer', () => {
  //-----api
  const customerFunction = useAllFunctionDataStore()

  //------
  //state

  //菜單類別
  const menuCategoryData = ref([])
  //菜單品項
  const menuItemData: any = ref({})
  //取得單一餐點資訊
  const productData: any = ref({})
  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const orderIdData: any = ref({})
  //加入購物車
  const itemData: any = ref()
  //取得現在購物車的商品筆數跟總價
  const orderInfoData: any = ref()
  //取得購物車現有訂單
  const cartData: any = ref()
  //購物車訂單編輯(修改份數)
  const editCartData: any = ref()
  //取得外帶自取時間選項
  const takeTimeData: any = ref()
  //前往結帳
  const goCheckoutData: any = ref()
  //送出訂單(選擇結帳方式-現金)
  const confirmOrderCashData: any = ref()
  //送出訂單(選擇結帳方式-Line Pay)
  const confirmOrderLinePayData: any = ref()
  //送出訂單(選擇結帳方式-Line Pay)-網址
  const confirmOrderLinePayPaymentUrlData: any = ref()
  //送出訂單(選擇結帳方式-Line Pay)-狀態
  const confirmLinePayRequestIsPayMent: any = ref()
  //訂單完成畫面
  const orderData: any = ref()

  //------
  //getter

  //菜單類別
  const getMenuCategoryData = computed(() => menuCategoryData.value)
  //菜單品項
  const getMenuItemData = computed(() => menuItemData.value)
  //取得單一餐點資訊
  const getProductData = computed(() => productData.value)
  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const getOrderIdData = computed(() => orderIdData.value)
  //加入購物車
  const addItemData = computed(() => itemData.value)
  //取得現在購物車的商品筆數跟總價
  const getOrderInfoData = computed(() => orderInfoData.value)
  //取得購物車現有訂單
  const getCartData = computed(() => cartData.value)
  //購物車訂單編輯(修改份數)
  const postEditCartData = computed(() => editCartData.value)
  //取得外帶自取時間選項
  const getTakeTimeData = computed(() => takeTimeData.value)
  //前往結帳
  const postGoCheckoutData = computed(() => goCheckoutData.value)
  //送出訂單(選擇結帳方式-現金)
  const postConfirmOrderCashData = computed(() => confirmOrderCashData.value)
  //送出訂單(選擇結帳方式-Line Pay)
  const postConfirmOrderLinePayData = computed(() => confirmOrderLinePayData.value)
  //送出訂單(選擇結帳方式-Line Pay)-網址
  const getConfirmOrderLinePayPaymentUrlData = computed(
    () => confirmOrderLinePayPaymentUrlData.value
  )
  //送出訂單(選擇結帳方式-Line Pay)-狀態
  const getConfirmLinePayRequestIsPayMent = computed(() => confirmLinePayRequestIsPayMent.value)
  //訂單完成畫面
  const getOrderData = computed(() => orderData.value)

  //------
  //action 異步請求

  //菜單類別
  const fetchCustomerGetMenuCategory = async () => {
    try {
      const response = await getCustomerGetMenuCategory()
      if (response.status === 200) {
        menuCategoryData.value = response.data.data
        // menuCategoryData.value = response?.data?.data || []
      }
    } catch (error) {
      console.log(error)
    }
  }

  //菜單品項
  const fetchCustomerGetMenuItem = async () => {
    try {
      const response = await getCustomerGetMenuItem()
      menuItemData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得單一餐點資訊
  const fetchCustomerGetProduct = async (productId: number) => {
    try {
      const response = await getCustomerGetProduct(productId)
      console.log(`目前customization前端設定`)
      productData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const fetchCustomerGetOrderId = async () => {
    try {
      if (
        localStorage.customer_guid == 'undefined' ||
        localStorage.customer_guid == 'null' ||
        !localStorage.customer_guid ||
        localStorage.customer_orderId == 'undefined' ||
        localStorage.customer_orderId == 'null' ||
        !localStorage.customer_orderId
      ) {
        const response = await getOrderId()
        orderIdData.value = response.data.data
        // 放入localStorage
        localStorage.customer_guid = response.data.data.guid
        localStorage.customer_orderId = response.data.data.orderId
      }
    } catch (error) {
      console.log(error)
    }
  }

  //加入購物車
  const fetchCustomerAddItem = async (data: {
    guid: string
    orderId: number
    productId: number
    customization?: {
      options?: string
      extraPrice?: number
    }[]
    serving: number
  }) => {
    try {
      const response = await addItem({
        guid: data.guid,
        orderId: data.orderId,
        productId: data.productId,
        customization: data.customization,
        serving: data.serving
      })
      customerFunction.getAlertStatusFunction(true, response.data.message)
      router.push({ name: 'menu' })
    } catch (error) {
      console.log(error)
    }
  }

  //取得現在購物車的商品筆數跟總價
  const fetchCustomerGetOrderInfo = async () => {
    try {
      if (
        localStorage.customer_guid == 'undefined' ||
        localStorage.customer_guid == 'null' ||
        !localStorage.customer_guid ||
        localStorage.customer_orderId == 'undefined' ||
        localStorage.customer_orderId == 'null' ||
        !localStorage.customer_orderId
      ) {
        //沒有的話數量歸零
        orderInfoData.value = null
        return
      }

      const response = await getOrderInfo(localStorage.customer_orderId, localStorage.customer_guid)
      orderInfoData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得購物車現有訂單
  const fetchCustomerGetCart = async () => {
    try {
      if (
        localStorage.customer_guid == 'undefined' ||
        localStorage.customer_guid == 'null' ||
        !localStorage.customer_guid ||
        localStorage.customer_orderId == 'undefined' ||
        localStorage.customer_orderId == 'null' ||
        !localStorage.customer_orderId
      ) {
        //沒有的話數量歸零
        cartData.value = null
        return
      }

      const response = await getCart(localStorage.customer_orderId, localStorage.customer_guid)
      cartData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //購物車訂單編輯(修改份數)
  const fetchCustomerPostEditCart = async (data: {
    orderId: string
    orderItemId: number
    serving: number
  }) => {
    try {
      await postEditCart({
        orderId: data.orderId,
        orderItemId: data.orderItemId,
        serving: data.serving
      })
    } catch (error) {
      console.log(error)
    }
  }

  //取得外帶自取時間選項
  const fetchCustomerGetTakeTime = async () => {
    try {
      const response = await getTakeTime()
      takeTimeData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //前往結帳
  const fetchCustomerPostGoCheckout = async (data: {
    orderId: number // 訂單Id
    guid: string // 唯一識別碼
    phone?: string | null // 顧客電話
    type: '內用' | '外帶' | '預約自取' // 用餐類型，只能是"內用"、"外帶"或"預約自取"
    table?: string | null // 桌號，非內用則可以是null或空字串
    takeDate?: string | null //外帶時間(null或是api(CC-4)給你放選項的日期)
    takeTime?: string | null // 外帶時間，可以是null或特定日期格式的字串
    note?: string // 顧客的其他備註
  }) => {
    try {
      await postGoCheckout({
        orderId: data.orderId,
        guid: data.guid,
        phone: data.phone,
        type: data.type,
        table: data.table,
        takeDate: data.takeDate,
        takeTime: data.takeTime,
        note: data.note
      })
    } catch (error) {
      console.log(error)
    }
  }

  //送出訂單(選擇結帳方式-現金)
  const fetchCustomerPostConfirmOrderCash = async (data: {
    orderId: Number
    guid: String
    invoice: '載具' | '統編' | '捐贈發票' | '紙本' //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
    invoiceCarrier?: String | null //發票載具號碼or統編
  }) => {
    try {
      await postConfirmOrderCash({
        orderId: data.orderId,
        guid: data.guid,
        invoice: data.invoice,
        invoiceCarrier: data.invoiceCarrier
      })
    } catch (error) {
      console.log(error)
    }
  }

  //送出訂單(選擇結帳方式-Line Pay)
  const fetchCustomerPostConfirmOrderLinePay = async (data: {
    orderId: Number
    guid: String
    invoice: '載具' | '統編' | '捐贈發票' | '紙本' //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
    invoiceCarrier?: String | null //發票載具號碼or統編
    confirmUrl?: String | null //LinePay付款成功後，Line會導向使用者去的網址
    cancelUrl?: String | null //LinePay取消付款後，Line會導向使用者去的網址
  }) => {
    try {
      const response = await postConfirmOrderLinePay({
        orderId: data.orderId,
        guid: data.guid,
        invoice: data.invoice,
        invoiceCarrier: data.invoiceCarrier,
        confirmUrl: data.confirmUrl,
        cancelUrl: data.cancelUrl
      })

      if (response.data.statusCode === 400) {
        console.log(response.data.message)
      } else {
        //網址
        confirmOrderLinePayPaymentUrlData.value = response.data.data.paymentUrl
        console.log(response.data.data.paymentUrl)
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  // Line Pay付款確認
  const fetchConfirmLinePayRequest = async (data: { orderId: Number; guid: String }) => {
    try {
      const response = await postConfirmLinePayRequest({
        orderId: data.orderId,
        guid: data.guid
      })

      if (response.data.statusCode === 400) {
        console.log(response.data.message)
      } else {
        confirmLinePayRequestIsPayMent.value = response.data.data.isPayMent
        console.log(response.data.message)
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  //訂單完成畫面
  const fetchCustomerGetOrder = async (guid: string) => {
    try {
      const response = await getOrder(guid)
      orderData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getMenuCategoryData,
    fetchCustomerGetMenuCategory,
    getMenuItemData,
    fetchCustomerGetMenuItem,
    getProductData,
    fetchCustomerGetProduct,
    getOrderIdData,
    fetchCustomerGetOrderId,
    addItemData,
    fetchCustomerAddItem,
    getOrderInfoData,
    fetchCustomerGetOrderInfo,
    getCartData,
    fetchCustomerGetCart,
    postEditCartData,
    fetchCustomerPostEditCart,
    getTakeTimeData,
    fetchCustomerGetTakeTime,
    postGoCheckoutData,
    fetchCustomerPostGoCheckout,
    postConfirmOrderCashData,
    fetchCustomerPostConfirmOrderCash,
    postConfirmOrderLinePayData,
    getConfirmOrderLinePayPaymentUrlData,
    fetchCustomerPostConfirmOrderLinePay,
    getConfirmLinePayRequestIsPayMent,
    fetchConfirmLinePayRequest,
    getOrderData,
    fetchCustomerGetOrder
  }
})

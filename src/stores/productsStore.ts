import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getCustomerGetMenuCategory,
  getCustomerGetMenuItem,
  getCustomerGetProduct,
  getOrderId,
  addItem,
  getOrderInfo,
  getCart,
  postEditCart,
  postGoCheckout
} from '@/models/api'

export const useCustomerStore = defineStore('customer', () => {
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
  //前往結帳
  const goCheckoutData: any = ref()

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
  //前往結帳
  const postGoCheckoutData = computed(() => goCheckoutData.value)

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
      productData.value = response.data.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const fetchCustomerGetOrderId = async () => {
    try {
      const response = await getOrderId()
      orderIdData.value = response.data.data
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
      await addItem({
        guid: data.guid,
        orderId: data.orderId,
        productId: data.productId,
        customization: data.customization,
        serving: data.serving
      })
      // itemData.value
    } catch (error) {
      console.log(error)
    }
  }

  //取得現在購物車的商品筆數跟總價
  const fetchCustomerGetOrderInfo = async (id: number, guid: string) => {
    try {
      const response = await getOrderInfo(id, guid)
      orderInfoData.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  //取得購物車現有訂單
  const fetchCustomerGetCart = async (id: number, guid: string) => {
    try {
      const response = await getCart(id, guid)
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
  //前往結帳
  const fetchCustomerPostGoCheckout = async (data: {
    orderId: number // 訂單Id
    guid: string // 唯一識別碼
    phone: string // 顧客電話
    type: '內用' | '外帶' | '預約自取' // 用餐類型，只能是"內用"、"外帶"或"預約自取"
    table?: string | null // 桌號，非內用則可以是null或空字串
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
        takeTime: data.takeTime,
        note: data.note
      })
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
    postGoCheckoutData,
    fetchCustomerPostGoCheckout
  }
})

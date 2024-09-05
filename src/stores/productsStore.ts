import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  GetCustomerGetMenuCategory,
  GetCustomerGetMenuItem,
  GetCustomerGetProduct,
  GetOrderId
} from '@/models/api'

export const useCustomerStore = defineStore('customer', () => {
  //state

  //菜單類別
  const menuCategoryData = ref([])
  //菜單品項
  const menuItemData: any = ref({})
  //取得單一餐點資訊
  const productData: any = ref({})
  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const orderIdData: any = ref({})
  //getter

  //菜單類別
  const GetMenuCategoryData = computed(() => menuCategoryData.value)
  //菜單品項
  const GetMenuItemData = computed(() => menuItemData.value)
  //取得單一餐點資訊
  const GetProductData = computed(() => productData.value)
  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const GetOrderIdData = computed(() => orderIdData.value)

  //action
  // 異步請求

  //菜單類別
  const fetchCustomerGetMenuCategory = async () => {
    try {
      const response = await GetCustomerGetMenuCategory()
      if (response.status === 200) {
        menuCategoryData.value = response.data.data
        // menuCategoryData.value = response?.data?.data || []

        // console.log(response.data.data)
        // console.log(menuCategoryData.value)
        // console.log(GetMenuCategoryData.value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //菜單品項
  const fetchCustomerGetMenuItem = async () => {
    try {
      const response = await GetCustomerGetMenuItem()
      if (response.status === 200) {
        menuItemData.value = response.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  //取得單一餐點資訊
  const fetchCustomerGetProduct = async (productId: number) => {
    try {
      const response = await GetCustomerGetProduct(productId)
      if (response.status === 200) {
        productData.value = response.data.data[0]
      }
    } catch (error) {
      console.log(error)
    }
  }

  //取得OrderId跟Guid(唯一識別碼)(使用者第一次加入購物車時索取訂單資訊)
  const fetchCustomerGetOrderId = async () => {
    try {
      const response = await GetOrderId()
      if (response.status === 200) {
        console.log(response.data.data)

        orderIdData.value = response.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    GetMenuCategoryData,
    fetchCustomerGetMenuCategory,
    GetMenuItemData,
    fetchCustomerGetMenuItem,
    GetProductData,
    fetchCustomerGetProduct,
    GetOrderIdData,
    fetchCustomerGetOrderId
  }
})

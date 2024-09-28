import { defineStore } from 'pinia'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
export const useEmployeeFunctionDataStore = defineStore('employeeFunction', () => {
  //-----
  // api
  const route = useRoute()
  const employeeStore = useEmployeeStore()
  //------
  //state
  //Status選單
  const orderStates: ('全部訂單' | '待結帳' | '準備中' | '待取餐' | '已完成')[] = [
    '全部訂單',
    '待結帳',
    '準備中',
    '待取餐',
    '已完成'
  ]
  //type選單
  // const orderType: ('全部' | '內用' | '外帶' | '預約自取')[] = ['全部', '內用', '外帶', '預約自取']
  const orderType: ('全部' | '內用' | '外帶')[] = ['全部', '內用', '外帶']
  //orderBy 選項
  const orderBy: ('時間越早優先' | '時間越晚優先')[] = ['時間越早優先', '時間越晚優先']
  //Status選單選擇
  const nowOrderStatusClick = ref(0)

  //type選單選擇
  const nowOrderTypeClick = ref(0)
  //orderBy 選項選擇
  const nowOrderBySelect = ref('時間越早優先')
  //Search 搜尋
  const nowSearch = ref('')
  //取得單一訂單資訊 id
  const nowOrderDetailId = ref(0)

  //取得客人現金
  const nowCustomerCash = ref()
  //取得客人備註
  const nowCustomerNote = ref()
  //取得客人發票選項
  const nowCustomerPay = ref('紙本')
  //取得客人載具
  const nowCustomerReceipt = ref()
  //取得客人載具驗證結果
  const nowCustomerIsValidReceipt = ref(false)
  //取得客人統編
  const nowCustomerTaxId = ref()
  //取得客人統編驗證結果
  const nowCustomerIsValidTaxId = ref(false)
  //取得客人手機
  const nowCustomerPhoneNumber = ref()
  //取得客人手機驗證結果
  const nowCustomerIsValidPhoneNumber = ref(false)
  //取得詳細訂單選單狀態
  const orderDetailsNavBarIsShow = ref(false)

  //取得新增訂單選單狀態數量
  const statusCount = orderStates.map(() => 0)
  //取得新增訂單選單狀態數量
  const orderDetailsNavBarStatusCount = ref(statusCount)

  //------
  //getter

  //Status選單選擇
  const getNowOrderStatusClick = computed(() => nowOrderStatusClick.value)
  //type選單選擇
  const getNowOrderTypeClick = computed(() => nowOrderTypeClick.value)
  //orderBy 選項選擇
  const getNowOrderBySelect = computed(() => nowOrderBySelect.value)
  //Search 搜尋
  const getNowSearch = computed(() => nowSearch.value)
  //取得單一訂單資訊 id
  const getNowOrderDetailId = computed(() => nowOrderDetailId.value)

  //取得客人現金
  const getNowCustomerCash = computed(() => nowCustomerCash.value)
  //取得客人備註
  const getNowCustomerNote = computed(() => nowCustomerNote.value)
  //取得客人發票選項
  const getNowCustomerPay = computed(() => nowCustomerPay.value)
  //取得客人載具
  const getNowCustomerReceipt = computed(() => nowCustomerReceipt.value)
  //取得客人載具驗證結果
  const getNowCustomerIsValidReceipt = computed(() => nowCustomerIsValidReceipt.value)
  //取得客人統編
  const getNowCustomerTaxId = computed(() => nowCustomerTaxId.value)
  //取得客人統編驗證結果
  const getNowCustomerIsValidTaxId = computed(() => nowCustomerIsValidTaxId.value)
  //取得客人手機
  const getNowCustomerPhoneNumber = computed(() => nowCustomerPhoneNumber.value)
  //取得客人手機驗證結果
  const getNowCustomerIsValidPhoneNumber = computed(() => nowCustomerIsValidPhoneNumber.value)
  //取得詳細訂單選單狀態
  const getOrderDetailsNavBarIsShow = computed(() => orderDetailsNavBarIsShow.value)

  //取得新增訂單選單狀態數量
  const getOrderDetailsNavBarStatusCount = computed(() => orderDetailsNavBarStatusCount.value)

  //------
  //action 異步請求

  //Status選單選擇
  function getNowOrderStatusClickFunction(index: number) {
    nowOrderStatusClick.value = index
    fohOrderShow()
  }
  //type選單選擇
  function getNowOrderTypeClickFunction(index: number) {
    nowOrderTypeClick.value = index
    fohOrderShow()
    if ((route.name as string).includes('employeeBoh')) {
      bohOrderShow()
    }
    if ((route.name as string).includes('employeeFoh')) {
      fohOrderShow()
    }
  }
  //orderBy 選項選擇
  function getNowOrderBySelectFunction(value: string) {
    nowOrderBySelect.value = value
    if ((route.name as string).includes('employeeBoh')) {
      bohOrderShow()
    }
    if ((route.name as string).includes('employeeFoh')) {
      fohOrderShow()
    }
  }
  //Search 搜尋
  function getNowSearchFunction(value: any) {
    nowSearch.value = value
    if ((route.name as string).includes('employeeBoh')) {
      bohOrderShow()
    }
    if ((route.name as string).includes('employeeFoh')) {
      fohOrderShow()
    }
  }
  //取得單一訂單資訊 id
  function getNowOrderDetailIdFunction(value: number) {
    nowOrderDetailId.value = value
  }
  //取得客人現金
  function getNowCustomerCashFunction(value?: number) {
    nowCustomerCash.value = value
  }
  //取得客人備註
  function getNowCustomerNoteFunction(value: any) {
    nowCustomerNote.value = value
  }
  //取得客人發票選項
  function getNowCustomerPayFunction(value: string) {
    nowCustomerPay.value = value
  }

  //取得客人載具
  function getNowCustomerReceiptFunction(value?: string) {
    nowCustomerReceipt.value = value
  }
  //取得客人載具驗證結果
  function getNowCustomerIsValidReceiptFunction(value: boolean) {
    nowCustomerIsValidReceipt.value = value
  }

  //取得客人統編
  function getNowCustomerTaxIdFunction(value: string) {
    nowCustomerTaxId.value = value
  }
  //取得客人統編驗證結果
  function getNowCustomerIsValidTaxIdFunction(value: boolean) {
    nowCustomerIsValidTaxId.value = value
  }
  //取得客人手機
  function getNowCustomerPhoneNumberFunction(value: any) {
    nowCustomerPhoneNumber.value = value
  }
  //取得客人手機驗證結果
  function getNowCustomerIsValidPhoneNumberFunction(value: any) {
    nowCustomerIsValidPhoneNumber.value = value
  }

  //取得詳細訂單選單狀態
  function getOrderDetailsNavBarIsShowFunction(value: boolean) {
    orderDetailsNavBarIsShow.value = value
  }

  //取得新增訂單選單狀態數量
  function getOrderDetailsNavBarStatusCountFunction(value: []) {
    for (let i = 1; i < orderStates.length; i++) {
      orderDetailsNavBarStatusCount.value[i] = value[i]
    }
    //全部訂單=其他加總
    orderDetailsNavBarStatusCount.value[0] = orderDetailsNavBarStatusCount.value
      .slice(1)
      .reduce((acc, val) => acc + val, 0)
  }

  const fohOrderShow = async () => {
    try {
      //外場訂單總覽
      const orderGetData: any = {
        orderStatus: getNowOrderStatusClick.value,
        type: getNowOrderTypeClick.value,
        orderBy: getNowOrderBySelect.value,
        search: getNowSearch.value
      }

      //取得今日訂單數量與頁數
      await employeeStore.fetchEmployeeFohGetAllOrderCount()
      //外場訂單總覽-有頁數
      // await employeeStore.fetchEmployeeFohGetOrder(orderGetData)
      //外場訂單總覽-無頁數
      await employeeStore.fetchEmployeeFohGetOrderNoPaging(orderGetData)
    } catch (error) {
      console.log(error)
    }
  }

  //boh選單顯示
  async function bohOrderShow() {
    //內場訂單總覽
    const orderGetData: any = {
      type: getNowOrderTypeClick.value,
      orderBy: getNowOrderBySelect.value,
      search: getNowSearch.value
    }
    //內場訂單總覽
    await employeeStore.fetchEmployeeBohGetOrder(orderGetData)
  }

  return {
    orderType,
    orderStates,
    orderBy,
    fohOrderShow,
    bohOrderShow,
    getNowOrderStatusClick,
    getNowOrderStatusClickFunction,
    getNowOrderTypeClick,
    getNowOrderTypeClickFunction,
    getNowOrderBySelect,
    getNowOrderBySelectFunction,
    getNowSearch,
    getNowSearchFunction,
    getNowOrderDetailId,
    getNowOrderDetailIdFunction,
    getNowCustomerCash,
    getNowCustomerNote,
    getNowCustomerPay,
    getNowCustomerReceipt,
    getNowCustomerTaxId,
    getNowCustomerPhoneNumber,
    getNowCustomerCashFunction,
    getNowCustomerNoteFunction,
    getNowCustomerPayFunction,
    getNowCustomerReceiptFunction,
    getNowCustomerTaxIdFunction,
    getNowCustomerPhoneNumberFunction,
    getNowCustomerIsValidReceipt,
    getNowCustomerIsValidTaxId,
    getNowCustomerIsValidReceiptFunction,
    getNowCustomerIsValidTaxIdFunction,
    getNowCustomerIsValidPhoneNumber,
    getNowCustomerIsValidPhoneNumberFunction,
    getOrderDetailsNavBarIsShow,
    getOrderDetailsNavBarIsShowFunction,
    getOrderDetailsNavBarStatusCount, //取得新增訂單選單狀態數量
    getOrderDetailsNavBarStatusCountFunction //取得新增訂單選單狀態數量
  }
})

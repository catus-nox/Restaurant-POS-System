import { defineStore } from 'pinia'
import { useEmployeeStore } from '@/stores/employee/productsStore'
import { ref, computed } from 'vue'
export const useFunctionDataStore = defineStore('employeeFunction', () => {
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
  const orderType: ('全部' | '內用' | '外帶' | '預約自取')[] = ['全部', '內用', '外帶', '預約自取']
  // const orderType: ('全部' | '內用' | '外帶')[] = ['全部', '內用', '外帶']
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

  //------
  //action 異步請求

  //Status選單選擇
  function getNowOrderStatusClickFunction(index: number) {
    nowOrderStatusClick.value = index
    orderShow()
  }
  //type選單選擇
  function getNowOrderTypeClickFunction(index: number) {
    nowOrderTypeClick.value = index
    orderShow()
  }
  //orderBy 選項選擇
  function getNowOrderBySelectFunction(value: string) {
    nowOrderBySelect.value = value
    orderShow()
  }
  //Search 搜尋
  function getNowSearchFunction(value: any) {
    nowSearch.value = value
    orderShow()
  }

  //選單顯示
  async function orderShow() {
    //外場訂單總覽
    const orderGetData: any = {
      orderStatus: getNowOrderStatusClick.value,
      type: getNowOrderTypeClick.value,
      orderBy: getNowOrderBySelect.value,
      search: getNowSearch.value
    }

    //取得今日訂單數量與頁數
    await useEmployeeStore().fetchEmployeeFohGetAllOrderCount()
    //外場訂單總覽
    await useEmployeeStore().fetchEmployeeFohGetOrder(orderGetData)
  }

  return {
    orderType,
    orderStates,
    orderBy,
    orderShow,
    getNowOrderStatusClick,
    getNowOrderStatusClickFunction,
    getNowOrderTypeClick,
    getNowOrderTypeClickFunction,
    getNowOrderBySelect,
    getNowOrderBySelectFunction,
    getNowSearch,
    getNowSearchFunction
  }
})

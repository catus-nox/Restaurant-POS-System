import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { postEmployeeLogin } from '@/models/employee/api'

export const useEmployeeStore = defineStore('employee', () => {
  //------
  //state

  //員工登入
  const loginData = ref()

  //------
  //getter

  //員工登入
  const postLoginData = computed(() => loginData.value)

  //------
  //action 異步請求

  //員工登入
  const fetchEmployeeLogin = async (data: { account: string; password: string }) => {
    try {
      const response = await postEmployeeLogin({
        account: data.account,
        password: data.password
      })
      console.log(response)

      if (response.data.statusCode === 400) {
        alert(response.data.message)
      } else {
        //員工資訊
        loginData.value = response.data.data
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    postLoginData,
    fetchEmployeeLogin
  }
})

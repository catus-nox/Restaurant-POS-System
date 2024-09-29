import axios from 'axios'
import router from '@/router'
// const baseURL = import.meta.env.VITE_APP_API_URL

const instance = axios.create({
  // baseURL: `${baseURL}/api`,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  // timeout: 50000,
  timeout: 0
})

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something before request is sent
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    // console.log(`----------------------`)

    if (response.data.statusCode === 400) {
      // console.log(response.data.message)
    } else if (response.data.statusCode === 401) {
      if (localStorage.boh_identity || localStorage.foh_identity) {
        router.push({ name: 'employeeLogin' })
      }
      // console.log(response.data.message)
    } else {
      // console.log(response.data.message)
      // console.log(response.data.data)
    }

    // console.log(response)

    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log('something wrong 其他異常')
          break
        case 401:
          console.log('請重新登入')
          break
        case 404:
          console.log('你要找的頁面不存在')
          // go to 404 page
          break
        case 500:
          console.log('程式發生問題')
          // go to 500 page
          break
        default:
          console.log(error.message)
      }
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後重整網頁')
      return
    }
    return Promise.reject(error)
  }
)
export default instance

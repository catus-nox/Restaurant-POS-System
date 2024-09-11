import '@/assets/style/tailwimd.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//切換頁面後顯示最上方
router.afterEach(() => {
  // to, from, failure
  window.scrollTo(0, 0)
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
dotenv.config()
const baseURL = process.env.VITE_APP_API_URL
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // [`/${apiName}`]: {
      '/api': {
        target: baseURL,
        changeOrigin: true
        // 如果有字串需要替換可以加入 rewrite 這個屬性
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

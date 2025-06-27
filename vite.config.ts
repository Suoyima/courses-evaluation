import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/courses-evaluation/', // 关键配置：适配GitHub Pages子路径
  build: {},
  server: {
    port: 5173, // 保持与本地开发一致
    open: true, // 启动时自动打开浏览器
  },
})

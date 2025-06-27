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
  build: {
    outDir: 'docs', // 输出到docs目录（GitHub Pages默认托管目录）
    emptyOutDir: true, // 构建前清空输出目录
    assetsInlineLimit: 4096, // 小于4KB的资源转为base64内联
  },
  server: {
    port: 5173, // 保持与本地开发一致
    open: true, // 启动时自动打开浏览器
  },
})

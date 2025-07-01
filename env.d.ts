/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly BASE_URL?: string
  // 添加其他你需要的环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

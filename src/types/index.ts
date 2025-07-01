export * from './course'
export * from './review'

// 通用响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 分页类型
export interface Pagination<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

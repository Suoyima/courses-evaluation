import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // 请替换为实际后端地址
})

export const getUserInfo = async () => {
  const response = await apiClient.get<{
    id: number
    name: string
    avatar: string
    reviews_count: number
  }>('/api/user/info')
  return response.data
}

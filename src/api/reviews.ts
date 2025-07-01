import axios from 'axios'
import type { Review, ReviewCreatePayload } from '../types/review'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // 请替换为实际后端地址
})

export const getLatestReviews = async (limit = 10, offset = 0) => {
  const response = await apiClient.get<{
    reviews: Review[]
    total: number
  }>('/api/reviews/latest', {
    params: { limit, offset },
  })
  return response.data
}

export const getReviewFilters = async () => {
  const response = await apiClient.get<{
    departments: string[]
    rating_ranges: string[]
  }>('/api/filters')
  return response.data
}

export const createReview = async (payload: ReviewCreatePayload) => {
  const response = await apiClient.post<{
    success: boolean
    review_id: number
  }>('/api/reviews', payload)
  return response.data
}

export const getSelectableCourses = async (keyword?: string) => {
  const response = await apiClient.get<{
    courses: {
      id: number
      name: string
      department: string
    }[]
  }>('/api/courses/selectable', { params: { keyword } })
  return response.data
}

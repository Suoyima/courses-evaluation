import axios from 'axios'
import type { CourseDetail, SimilarCourse } from '../types/course'
import type { Review } from '../types/review'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // 请替换为实际后端地址
})

export const getCourseDetail = async (id: number) => {
  const response = await apiClient.get<CourseDetail>(`/api/courses/${id}`)
  return response.data
}

export const getCourseReviews = async (id: number, limit = 10, offset = 0) => {
  const response = await apiClient.get<{
    reviews: Review[]
    total: number
  }>(`/api/courses/${id}/reviews`, {
    params: { limit, offset },
  })
  return response.data
}

export const getSimilarCourses = async (id: number) => {
  const response = await apiClient.get<{
    courses: SimilarCourse[]
  }>(`/api/courses/${id}/similar`)
  return response.data
}

export const searchCourses = async (params: {
  keyword?: string
  department?: string
  min_rating?: number
  max_rating?: number
  credit?: number
}) => {
  const response = await apiClient.get<{
    courses: {
      id: number
      name: string
      department: string
      credit: number
      avg_rating: number
    }[]
    total: number
  }>('/api/courses/search', { params })
  return response.data
}

import axios from 'axios'
import type { CourseBase } from '../types/course'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
})

export interface SearchFilters {
  departments: string[]
  credits: number[]
}

export interface SearchResult {
  courses: CourseBase[]
  total: number
}

export const getSearchFilters = async (): Promise<SearchFilters> => {
  const response = await apiClient.get('/api/search/filters')
  return response.data
}

export const searchCourses = async (params: {
  keyword?: string
  department?: string
  min_rating?: number
  max_rating?: number
  credit?: number
}): Promise<SearchResult> => {
  const response = await apiClient.get('/api/courses/search', { params })
  return response.data
}

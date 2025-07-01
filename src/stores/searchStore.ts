import { defineStore } from 'pinia'
import { searchCourses, getSearchFilters } from '../api/search'
import type { CourseBase } from '../types/course'

interface SearchResult {
  id: number
  name: string
  department: string
  credit: number
  avg_rating: number
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchResults: [] as SearchResult[],
    filters: {
      departments: [] as string[],
      credits: [] as number[],
    },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchSearchFilters() {
      this.loading = true
      try {
        const data = await getSearchFilters()
        this.filters = {
          departments: data.departments,
          credits: data.credits,
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取筛选条件失败'
      } finally {
        this.loading = false
      }
    },
    async searchCourses(params: {
      keyword?: string
      department?: string
      min_rating?: number
      max_rating?: number
      credit?: number
    }) {
      this.loading = true
      try {
        const data = await searchCourses(params)
        this.searchResults = data.courses.map((course) => ({
          id: course.id,
          name: course.name,
          department: course.department,
          credit: course.credit || 0, // 提供默认值
          avg_rating: course.avg_rating,
        }))
      } catch (err) {
        this.error = err instanceof Error ? err.message : '搜索课程失败'
      } finally {
        this.loading = false
      }
    },
  },
})

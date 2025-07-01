import { defineStore } from 'pinia'
import { getCourseDetail, getSimilarCourses } from '../api/courses'
import type { CourseDetail, SimilarCourse } from '../types/course'

export const useCourseStore = defineStore('course', {
  state: () => ({
    currentCourse: null as CourseDetail | null,
    similarCourses: [] as SimilarCourse[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCourseDetail(id: number) {
      this.loading = true
      this.error = null
      try {
        this.currentCourse = await getCourseDetail(id)
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取课程详情失败'
      } finally {
        this.loading = false
      }
    },
    async fetchSimilarCourses(id: number) {
      this.loading = true
      try {
        const data = await getSimilarCourses(id)
        this.similarCourses = data.courses
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取相似课程失败'
      } finally {
        this.loading = false
      }
    },
  },
})

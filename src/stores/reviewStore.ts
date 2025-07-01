import { defineStore } from 'pinia'
import { getLatestReviews, createReview, getSelectableCourses } from '../api/reviews'
import type { Review, ReviewCreatePayload } from '../types/review'

export const useReviewStore = defineStore('review', {
  state: () => ({
    latestReviews: [] as Review[],
    selectableCourses: [] as Array<{
      id: number
      name: string
      department: string
    }>,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchLatestReviews(limit = 10, offset = 0) {
      this.loading = true
      try {
        const data = await getLatestReviews(limit, offset)
        this.latestReviews = data.reviews
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取最新评价失败'
      } finally {
        this.loading = false
      }
    },
    async fetchSelectableCourses(keyword?: string) {
      this.loading = true
      try {
        const data = await getSelectableCourses(keyword)
        this.selectableCourses = data.courses
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取可选课程失败'
      } finally {
        this.loading = false
      }
    },
    async submitReview(payload: ReviewCreatePayload) {
      this.loading = true
      try {
        await createReview(payload)
        return true
      } catch (err) {
        this.error = err instanceof Error ? err.message : '提交评价失败'
        return false
      } finally {
        this.loading = false
      }
    },
  },
})

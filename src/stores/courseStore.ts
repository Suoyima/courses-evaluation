import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type {
  Course,
  Teacher,
  Review,
  ReviewStats,
  Pagination,
  ApiResponse,
  CourseSearchParams,
} from '@/types'

export const useCourseStore = defineStore('course', () => {
  // 状态
  const courses = ref<Course[]>([])
  const courseDetail = ref<Course | null>(null)
  const reviews = ref<Record<string, Review[]>>({})
  const reviewStats = ref<Record<string, ReviewStats>>({})
  const teachers = ref<Teacher[]>([])
  const similarCourses = ref<Course[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const featuredCourses = computed(() => courses.value.slice(0, 5))
  const topRatedCourses = computed(() =>
    [...courses.value]
      .sort((a, b) => {
        const aRating = reviewStats.value[a.id]?.avgRating || 0
        const bRating = reviewStats.value[b.id]?.avgRating || 0
        return bRating - aRating
      })
      .slice(0, 5),
  )

  // 方法
  const fetchCourses = async (params?: CourseSearchParams) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get<ApiResponse<Pagination<Course>>>('/api/courses', { params })
      courses.value = response.data.data.items
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch courses'
      console.error('Error fetching courses:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCourseDetail = async (courseId: string) => {
    isLoading.value = true
    try {
      const [detailRes, reviewsRes, similarRes] = await Promise.all([
        axios.get<ApiResponse<Course>>(`/api/courses/${courseId}`),
        axios.get<ApiResponse<Review[]>>(`/api/courses/${courseId}/reviews`),
        axios.get<ApiResponse<Course[]>>(`/api/courses/${courseId}/similar`),
      ])

      courseDetail.value = detailRes.data.data
      reviews.value[courseId] = reviewsRes.data.data
      similarCourses.value = similarRes.data.data

      // 计算评分统计
      calculateReviewStats(courseId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch course details'
      console.error('Error fetching course details:', err)
    } finally {
      isLoading.value = false
    }
  }

  const calculateReviewStats = (courseId: string) => {
    const courseReviews = reviews.value[courseId]
    if (!courseReviews || courseReviews.length === 0) {
      reviewStats.value[courseId] = {
        avgRating: 0,
        avgDifficulty: 0,
        avgGrading: 0,
        avgContent: 0,
        total: 0,
      }
      return
    }

    const stats = courseReviews.reduce(
      (acc, review) => {
        acc.totalRating += review.rating
        acc.totalDifficulty += review.difficulty
        acc.totalGrading += review.grading
        acc.totalContent += review.content
        return acc
      },
      {
        totalRating: 0,
        totalDifficulty: 0,
        totalGrading: 0,
        totalContent: 0,
        count: courseReviews.length,
      },
    )

    reviewStats.value[courseId] = {
      avgRating: stats.totalRating / stats.count,
      avgDifficulty: stats.totalDifficulty / stats.count,
      avgGrading: stats.totalGrading / stats.count,
      avgContent: stats.totalContent / stats.count,
      total: stats.count,
    }
  }

  const searchCourses = async (params: CourseSearchParams) => {
    isLoading.value = true
    try {
      const response = await axios.get<ApiResponse<Pagination<Course>>>('/api/courses/search', {
        params,
      })
      courses.value = response.data.data.items
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search courses'
      console.error('Error searching courses:', err)
    } finally {
      isLoading.value = false
    }
  }

  const submitReview = async (
    courseId: string,
    review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    isLoading.value = true
    try {
      const response = await axios.post<ApiResponse<Review>>(
        `/api/courses/${courseId}/reviews`,
        review,
      )

      // 更新本地状态
      if (!reviews.value[courseId]) {
        reviews.value[courseId] = []
      }
      reviews.value[courseId].unshift(response.data.data)

      // 重新计算统计
      calculateReviewStats(courseId)
      return response.data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit review'
      console.error('Error submitting review:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // 状态
    courses,
    courseDetail,
    reviews,
    reviewStats,
    teachers,
    similarCourses,
    isLoading,
    error,

    // 计算属性
    featuredCourses,
    topRatedCourses,

    // 方法
    fetchCourses,
    fetchCourseDetail,
    searchCourses,
    submitReview,
  }
})

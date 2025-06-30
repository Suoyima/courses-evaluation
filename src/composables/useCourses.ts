// src/composables/useCourses.ts
import { useCourseStore } from '@/stores/courseStore'

// 必须使用 export 明确导出
export const useCourses = () => {
  const store = useCourseStore()

  const loadCourses = async () => {
    await store.fetchCourses()
  }

  return {
    loadCourses,
    isLoading: store.isLoading,
  }
}

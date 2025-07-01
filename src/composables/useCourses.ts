import { ref } from 'vue'
import { useCourseStore } from '../stores/courseStore'

export function useCourses() {
  const courseStore = useCourseStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourseData = async (courseId: number) => {
    isLoading.value = true
    error.value = null
    try {
      await Promise.all([
        courseStore.fetchCourseDetail(courseId),
        courseStore.fetchSimilarCourses(courseId),
      ])
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch course data'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchCourseData,
    course: courseStore.currentCourse,
    similarCourses: courseStore.similarCourses,
  }
}

<template>
  <div class="home">
    <NavBar />
    <div class="course-list">
      <CourseCard
        v-for="course in store.courses"
        :key="course.id"
        :course="course"
        :reviews="store.reviews[course.id]"
      />
    </div>
    <FooterFilter @filter="handleFilter" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCourseStore } from '../stores/courseStore'
import NavBar from '../components/NavBar.vue'
import CourseCard from '../components/CourseCard.vue'
import FooterFilter from '../components/FooterFilter.vue'
import { useCourses } from '../composables/useCourses'

const store = useCourseStore()
const { isLoading, loadCourses } = useCourses()

const handleFilter = (filters: {
  department: string | null
  credit: string | null
  minRating: number
  maxRating: number
}) => {
  // 调用 store 中的搜索方法
  store.searchCourses({
    department: filters.department || undefined,
    credit: filters.credit ? parseInt(filters.credit) : undefined,
    minRating: filters.minRating,
    maxRating: filters.maxRating,
  })
}

onMounted(() => {
  loadCourses()
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

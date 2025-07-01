<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CourseCard from '../components/course/CourseCard.vue'
import FooterFilter from '../components/FooterFilter.vue'
import NavBar from '../components/NavBar.vue'
import { getLatestReviews, getReviewFilters } from '../api/reviews'
import type { Review } from '../types/review'

const reviews = ref<Review[]>([])
const filters = ref({
  departments: [] as string[],
  rating_ranges: [] as string[],
})
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const [reviewsRes, filtersRes] = await Promise.all([getLatestReviews(), getReviewFilters()])
    reviews.value = reviewsRes.reviews
    filters.value = filtersRes
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="home">
    <NavBar />
    <main>
      <div v-if="isLoading">加载中...</div>
      <div v-else class="review-list">
        <CourseCard
          v-for="review in reviews"
          :key="review.id"
          :course="{
            id: review.course_id,
            name: review.course_name || '未知课程', // 添加回退值
            rating: review.rating,
          }"
          :review="review"
        />
      </div>
    </main>
    <FooterFilter :filters="filters" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding: 20px;
}
.review-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>

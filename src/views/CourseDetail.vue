<template>
  <div class="course-detail">
    <div class="header">
      <img :src="course.cover || 'https://via.placeholder.com/800x400'" alt="课程封面" />
      <h1>{{ course.name }}</h1>
      <p>{{ course.department }} · {{ course.credit }}学分</p>
    </div>

    <div class="content">
      <div class="main">
        <RatingRadar :reviews="reviews" />
        <div class="reviews">
          <n-card v-for="review in reviews" :key="review.id">
            <n-rate readonly :value="review.rating" />
            <p>{{ review.comment }}</p>
          </n-card>
        </div>
      </div>

      <div class="sidebar">
        <n-card title="授课教师">
          <p v-for="teacher in teachers" :key="teacher.id">{{ teacher.name }}</p>
        </n-card>
        <n-card title="相似课程">
          <p v-for="similar in similarCourses" :key="similar.id">{{ similar.name }}</p>
        </n-card>
      </div>
    </div>

    <n-button type="primary" class="floating-button" @click="goToReview"> 写评价 </n-button>
  </div>
</template>

<script setup lang="ts">
import { NCard, NRate, NButton } from 'naive-ui'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '../stores/courseStore'
import RatingRadar from '../components/RatingRadar.vue'

const route = useRoute()
const router = useRouter()
const store = useCourseStore()

const courseId = computed(() => route.params.id as string)
const course = computed(() => store.courses.find((c) => c.id === courseId.value))
const reviews = computed(() => store.reviews[courseId.value] || [])
const teachers = computed(() => store.teachers)
const similarCourses = computed(() =>
  store.courses.filter((c) => c.department === course.value?.department && c.id !== courseId.value),
)

const goToReview = () => {
  router.push({ name: 'review-publish', query: { courseId: courseId.value } })
}

onMounted(async () => {
  await store.fetchCourseReviews(courseId.value)
})
</script>

<style scoped>
.course-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  margin-bottom: 30px;
}
.header img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
.content {
  display: flex;
  gap: 20px;
}
.main {
  flex: 3;
}
.sidebar {
  flex: 1;
}
.reviews {
  margin-top: 30px;
  display: grid;
  gap: 15px;
}
.floating-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
</style>

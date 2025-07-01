<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CourseInfo from '../components/course/CourseInfo.vue'
import ReviewCard from '../components/review/ReviewCard.vue'
import { getCourseDetail, getSimilarCourses, getCourseReviews } from '../api/courses'
import type { CourseDetail, SimilarCourse, Review } from '../types'

const route = useRoute()
const courseId = ref(Number(route.params.id))
const course = ref<CourseDetail | null>(null)
const similarCourses = ref<SimilarCourse[]>([])
const reviews = ref<Review[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const [detailRes, similarRes, reviewsRes] = await Promise.all([
      getCourseDetail(courseId.value),
      getSimilarCourses(courseId.value),
      getCourseReviews(courseId.value),
    ])

    course.value = detailRes
    similarCourses.value = similarRes.courses || []
    reviews.value = reviewsRes.reviews || []
  } catch (error) {
    console.error('Failed to fetch course data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="course-detail">
    <div v-if="isLoading">加载中...</div>
    <template v-else-if="course">
      <!-- 顶部课程信息 -->
      <CourseInfo :course="course" />

      <!-- 主要内容区域 -->
      <div class="main-content">
        <div class="left-section">
          <!-- 评分雷达图 -->
          <div class="rating-chart">
            <h3>课程评分</h3>
            <div class="rating-chart">
              <h3>课程评分</h3>
              <RatingRadar
                :stats="{
                  difficulty: course.avg_difficulty,
                  grading: course.avg_grading,
                  harvest: course.avg_harvest,
                }"
              />
            </div>
          </div>

          <!-- 评价列表 -->
          <div class="reviews-section">
            <h3>课程评价</h3>
            <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="right-section">
          <div class="similar-courses">
            <h3>相似课程</h3>
            <div v-for="similar in similarCourses" :key="similar.id" class="similar-course">
              <router-link :to="`/course/${similar.id}`">
                {{ similar.name }} ({{ similar.department }})
              </router-link>
              <span>评分: {{ similar.avg_rating.toFixed(1) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 悬浮的写评价按钮 -->
      <router-link to="/review/publish" class="floating-button"> 写评价 </router-link>
    </template>
    <div v-else>课程不存在</div>
  </div>
</template>

<style scoped>
.course-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.left-section {
  flex: 2;
}

.right-section {
  flex: 1;
}

.rating-chart {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ddd;
  margin-top: 15px;
}

.reviews-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.similar-courses {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.similar-course {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.similar-course:last-child {
  border-bottom: none;
}

.floating-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.floating-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}
</style>

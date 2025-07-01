<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createReview, getSelectableCourses } from '../api/reviews'
import type { ReviewCreatePayload } from '../types/review'

const steps = ['选择课程', '评分', '撰写评价']
const currentStep = ref(0)
const courses = ref<any[]>([])
const selectedCourse = ref<any>(null)
const searchTerm = ref('')

const reviewData = ref<ReviewCreatePayload>({
  course_id: 0,
  rating: 3,
  difficulty: 3,
  grading: 3,
  harvest: 3,
  content: '',
})

const fetchCourses = async () => {
  const response = await getSelectableCourses(searchTerm.value)
  courses.value = response.courses
}

const handleCourseSelect = (course: any) => {
  selectedCourse.value = course
  reviewData.value.course_id = course.id
  nextStep()
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitReview = async () => {
  try {
    await createReview(reviewData.value)
    alert('评价提交成功！')
    // 这里可以添加跳转逻辑
  } catch (error) {
    console.error('提交失败:', error)
    alert('评价提交失败，请重试')
  }
}

onMounted(fetchCourses)
</script>

<template>
  <div class="review-publish">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['step', { active: currentStep === index }]"
      >
        {{ step }}
      </div>
    </div>

    <div class="step-content">
      <!-- 第一步：选择课程 -->
      <div v-if="currentStep === 0" class="step-1">
        <div class="search-box">
          <input v-model="searchTerm" type="text" placeholder="搜索课程..." @input="fetchCourses" />
        </div>
        <div class="course-list">
          <div
            v-for="course in courses"
            :key="course.id"
            :class="['course-item', { selected: selectedCourse?.id === course.id }]"
            @click="handleCourseSelect(course)"
          >
            <h3>{{ course.name }}</h3>
            <span>{{ course.department }}</span>
          </div>
        </div>
      </div>

      <!-- 第二步：评分 -->
      <div v-if="currentStep === 1" class="step-2">
        <div class="rating-section">
          <h3>总体评分</h3>
          <div class="star-rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="['star', { active: star <= reviewData.rating }]"
              @click="reviewData.rating = star"
            >
              ★
            </span>
          </div>
        </div>

        <div class="radar-ratings">
          <div class="rating-item">
            <label>课程难度</label>
            <input v-model.number="reviewData.difficulty" type="range" min="1" max="5" step="0.5" />
            <span>{{ reviewData.difficulty }}</span>
          </div>

          <div class="rating-item">
            <label>给分情况</label>
            <input v-model.number="reviewData.grading" type="range" min="1" max="5" step="0.5" />
            <span>{{ reviewData.grading }}</span>
          </div>

          <div class="rating-item">
            <label>学习收获</label>
            <input v-model.number="reviewData.harvest" type="range" min="1" max="5" step="0.5" />
            <span>{{ reviewData.harvest }}</span>
          </div>
        </div>
      </div>

      <!-- 第三步：撰写评价 -->
      <div v-if="currentStep === 2" class="step-3">
        <h3>撰写评价</h3>
        <textarea
          v-model="reviewData.content"
          placeholder="请写下你对这门课程的评价..."
          rows="8"
        ></textarea>
        <div class="char-count">{{ reviewData.content.length }}/500</div>
      </div>
    </div>

    <div class="actions">
      <button v-if="currentStep > 0" class="btn-prev" @click="prevStep">上一步</button>
      <button
        v-if="currentStep < steps.length - 1"
        class="btn-next"
        :disabled="!selectedCourse && currentStep === 0"
        @click="nextStep"
      >
        下一步
      </button>
      <button
        v-if="currentStep === steps.length - 1"
        class="btn-submit"
        :disabled="!reviewData.content"
        @click="submitReview"
      >
        提交评价
      </button>
    </div>
  </div>
</template>

<style scoped>
.review-publish {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e5e7eb;
  z-index: 1;
}

.step {
  position: relative;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  z-index: 2;
}

.step.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.step-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.course-list {
  max-height: 300px;
  overflow-y: auto;
}

.course-item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.course-item:hover {
  background: #f3f4f6;
}

.course-item.selected {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.rating-section {
  margin-bottom: 30px;
}

.star-rating {
  font-size: 2em;
  margin-top: 10px;
}

.star {
  color: #e5e7eb;
  cursor: pointer;
  transition: color 0.2s;
}

.star.active {
  color: #fbbf24;
}

.radar-ratings {
  display: grid;
  gap: 20px;
}

.rating-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-item label {
  width: 80px;
}

.rating-item input[type='range'] {
  flex: 1;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.char-count {
  text-align: right;
  color: #6b7280;
  font-size: 0.8em;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-prev {
  background: #e5e7eb;
}

.btn-next,
.btn-submit {
  background: #3b82f6;
  color: white;
}

.btn-next:disabled,
.btn-submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>

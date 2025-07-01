<template>
  <n-card title="发布课程评价">
    <n-steps :current="currentStep" :status="currentStatus">
      <n-step title="选择课程" />
      <n-step title="评分" />
      <n-step title="填写评价" />
    </n-steps>

    <div v-if="currentStep === 1" class="step-content">
      <n-select
        v-model:value="selectedCourseId"
        :options="courseOptions"
        placeholder="请选择课程"
      />
    </div>

    <div v-if="currentStep === 2" class="step-content">
      <n-rate v-model:value="rating" :count="5" />
      <RatingRadar :reviews="[tempReview]" />
    </div>

    <div v-if="currentStep === 3" class="step-content">
      <n-input
        v-model:value="comment"
        type="textarea"
        placeholder="写下你的课程评价..."
        :maxlength="500"
        show-count
      />
    </div>

    <n-space justify="space-between" class="actions">
      <n-button v-if="currentStep > 1" @click="prevStep">上一步</n-button>
      <n-button v-if="currentStep < 3" type="primary" @click="nextStep">下一步</n-button>
      <n-button v-if="currentStep === 3" type="primary" @click="submitReview">提交评价</n-button>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSteps, NStep, NSelect, NRate, NInput, NButton, NSpace } from 'naive-ui'
import { ref, computed } from 'vue'
import { useCourseStore } from '../stores/courseStore'
import RatingRadar from '../components/RatingRadar.vue'
import { useRouter } from 'vue-router'

const store = useCourseStore()
const router = useRouter()

const currentStep = ref(1)
const currentStatus = ref<'process' | 'finish' | 'error'>('process')
const selectedCourseId = ref('')
const rating = ref(0)
const difficulty = ref(3)
const grading = ref(3)
const content = ref(3)
const comment = ref('')

const courseOptions = computed(() => store.courses.map((c) => ({ label: c.name, value: c.id })))

const tempReview = computed(() => ({
  id: 'temp',
  courseId: selectedCourseId.value,
  rating: rating.value,
  difficulty: difficulty.value,
  grading: grading.value,
  content: content.value,
  comment: comment.value,
}))

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const submitReview = () => {
  // 这里应该是API调用
  currentStatus.value = 'finish'
  setTimeout(() => {
    router.push({ name: 'course-detail', params: { id: selectedCourseId.value } })
  }, 1000)
}
</script>

<style scoped>
.step-content {
  margin: 30px 0;
  min-height: 300px;
}
.actions {
  margin-top: 20px;
}
</style>

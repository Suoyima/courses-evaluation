<template>
  <n-card :title="course.name" hoverable>
    <template #cover>
      <img :src="course.cover || 'https://via.placeholder.com/300x200'" alt="课程封面" />
    </template>
    <n-rate readonly :value="avgRating" />
    <p>{{ avgRating.toFixed(1) }}分</p>
    <p>{{ course.department }} · {{ course.credit }}学分</p>
    <p>{{ latestReview }}</p>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NRate } from 'naive-ui'
import { computed } from 'vue'
import type { Course, Review } from '../types'

const props = defineProps<{
  course: Course
  reviews?: Review[]
}>()

const avgRating = computed(() => {
  if (!props.reviews || props.reviews.length === 0) return 0
  return props.reviews.reduce((sum, r) => sum + r.rating, 0) / props.reviews.length
})

const latestReview = computed(() => {
  if (!props.reviews || props.reviews.length === 0) return '暂无评价'
  return props.reviews[0].comment
})
</script>

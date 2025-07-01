<script setup lang="ts">
import type { Review } from '../../types/review'

defineProps<{
  course: {
    id: number
    name: string
    rating: number
  }
  review: Review
}>()
</script>

<template>
  <div class="course-card">
    <h3>{{ course.name }}</h3>
    <div class="rating">
      <span class="stars">★★★★★</span>
      <span class="score">{{ course.rating.toFixed(1) }}</span>
    </div>
    <p class="content">{{ review.content }}</p>
    <div class="meta">
      <span class="date">{{ new Date(review.created_at).toLocaleDateString() }}</span>
      <span v-if="review.user_name">by {{ review.user_name }}</span>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: white;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rating {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.stars {
  color: #fbbf24;
  letter-spacing: 2px;
  font-size: 1.2em;
}

.score {
  margin-left: 8px;
  font-weight: bold;
  color: #4b5563;
}

.content {
  color: #4b5563;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  font-size: 0.8em;
  color: #9ca3af;
  display: flex;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
import type { Review } from '../../types/review'

defineProps<{
  review: Review
}>()
</script>

<template>
  <div class="review-card">
    <div class="header">
      <span class="user">{{ review.user_name || '匿名用户' }}</span>
      <span class="date">{{ new Date(review.created_at).toLocaleDateString() }}</span>
    </div>
    <div class="ratings">
      <div class="rating-item">
        <span>难度: </span>
        <span class="value">{{ review.difficulty?.toFixed(1) || '-' }}</span>
      </div>
      <div class="rating-item">
        <span>给分: </span>
        <span class="value">{{ review.grading?.toFixed(1) || '-' }}</span>
      </div>
      <div class="rating-item">
        <span>收获: </span>
        <span class="value">{{ review.harvest?.toFixed(1) || '-' }}</span>
      </div>
    </div>
    <div class="content">
      {{ review.content }}
    </div>
  </div>
</template>

<style scoped>
.review-card {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.review-card:last-child {
  border-bottom: none;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.9em;
  color: #6b7280;
}

.ratings {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.rating-item {
  display: flex;
  align-items: center;
}

.value {
  font-weight: bold;
  color: #4b5563;
  margin-left: 4px;
}

.content {
  color: #374151;
  line-height: 1.6;
}
</style>

<script setup lang="ts">
import type { CourseDetail } from '../../types/course'

defineProps<{
  course: CourseDetail
}>()
</script>

<template>
  <div class="course-info">
    <div
      class="cover"
      :style="{ backgroundImage: `url(${course.cover_url || '/default-course.jpg'})` }"
    ></div>
    <div class="details">
      <h1>{{ course.name }}</h1>
      <div class="meta">
        <span class="department">{{ course.department }}</span>
        <span class="credit">{{ course.credit }}学分</span>
        <span class="rating">平均评分: {{ course.avg_rating?.toFixed(1) || '暂无' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-info {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  margin-bottom: 20px;
}

.cover {
  width: 200px;
  height: 120px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.details {
  flex: 1;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 1.8em;
}

.meta {
  display: flex;
  gap: 16px;
  color: #6b7280;
}

.meta span {
  display: flex;
  align-items: center;
}

.meta span::before {
  content: '•';
  margin-right: 8px;
  color: #9ca3af;
}

.meta span:first-child::before {
  display: none;
}
</style>

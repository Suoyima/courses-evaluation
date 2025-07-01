<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  filters: {
    departments: string[]
    rating_ranges: string[]
  }
}>()

const selectedDept = ref('')
const selectedRating = ref('')
</script>

<template>
  <footer class="filter-bar">
    <div class="filter-group">
      <select v-model="selectedDept" class="filter-select">
        <option value="">全部院系</option>
        <option v-for="dept in filters.departments" :key="dept" :value="dept">
          {{ dept }}
        </option>
      </select>
    </div>
    <div class="filter-group">
      <select v-model="selectedRating" class="filter-select">
        <option value="">全部评分</option>
        <option v-for="range in filters.rating_ranges" :key="range" :value="range">
          {{ range }}分
        </option>
      </select>
    </div>
  </footer>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #4b5563;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>

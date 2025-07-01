<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { searchCourses, getSearchFilters } from '../api/search'
import CourseCard from '../components/course/CourseCard.vue'

const searchQuery = ref('')
const filters = ref({
  department: '',
  minRating: 0,
  maxRating: 5,
  credit: 0,
})
const searchResults = ref<any[]>([])
const availableFilters = ref({
  departments: [] as string[],
  credits: [] as number[],
})
const isLoading = ref(false)

const performSearch = async () => {
  isLoading.value = true
  try {
    const params = {
      keyword: searchQuery.value,
      department: filters.value.department,
      min_rating: filters.value.minRating,
      max_rating: filters.value.maxRating,
      credit: filters.value.credit || undefined,
    }
    const response = await searchCourses(params)
    searchResults.value = response.courses.map((course) => ({
      ...course,
      // 确保符合CourseCard要求的review结构
      review: {
        id: 0,
        course_id: course.id,
        course_name: course.name,
        rating: course.avg_rating,
        content: '',
        created_at: new Date().toISOString(),
      },
    }))
  } catch (error) {
    console.error('搜索失败:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const filtersRes = await getSearchFilters()
  availableFilters.value = filtersRes
  await performSearch()
})
</script>

<template>
  <div class="search-view">
    <div class="search-header">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索课程..."
        @keyup.enter="performSearch"
      />
      <button @click="performSearch">搜索</button>
    </div>

    <div class="search-container">
      <div class="filter-panel">
        <h3>筛选条件</h3>
        <div class="filter-group">
          <label>院系:</label>
          <select v-model="filters.department">
            <option value="">全部院系</option>
            <option v-for="dept in availableFilters.departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>评分范围:</label>
          <div class="range-inputs">
            <input v-model.number="filters.minRating" type="number" min="0" max="5" step="0.1" />
            <span>至</span>
            <input v-model.number="filters.maxRating" type="number" min="0" max="5" step="0.1" />
          </div>
        </div>

        <div class="filter-group">
          <label>学分:</label>
          <select v-model.number="filters.credit">
            <option :value="0">全部</option>
            <option v-for="credit in availableFilters.credits" :key="credit" :value="credit">
              {{ credit }}学分
            </option>
          </select>
        </div>

        <button class="apply-btn" @click="performSearch">应用筛选</button>
      </div>

      <div class="results-panel">
        <div v-if="isLoading" class="loading">加载中...</div>
        <div v-else-if="searchResults.length === 0" class="no-results">没有找到匹配的课程</div>
        <div v-else class="results-grid">
          <CourseCard
            v-for="result in searchResults"
            :key="result.id"
            :course="{
              id: result.id,
              name: result.name,
              rating: result.avg_rating,
            }"
            :review="result.review"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-header input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-header button {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-container {
  display: flex;
  gap: 20px;
}

.filter-panel {
  width: 250px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.filter-group select,
.filter-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.range-inputs input {
  width: 70px;
}

.apply-btn {
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.results-panel {
  flex: 1;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading,
.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>

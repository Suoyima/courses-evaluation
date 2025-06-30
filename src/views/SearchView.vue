<template>
  <div class="search-view">
    <n-input
      v-model:value="searchQuery"
      placeholder="搜索课程或教师"
      round
      clearable
      @keyup.enter="handleSearch"
    >
      <template #prefix>
        <n-icon><search-icon /></n-icon>
      </template>
    </n-input>

    <div class="search-content">
      <div class="filters">
        <n-card title="筛选条件">
          <n-space vertical>
            <n-select v-model:value="department" :options="departmentOptions" placeholder="院系" />
            <n-slider v-model:value="ratingRange" range :min="0" :max="5" :step="0.5" />
            <n-select v-model:value="credit" :options="creditOptions" placeholder="学分" />
          </n-space>
        </n-card>
      </div>

      <div class="results">
        <n-card v-for="course in filteredCourses" :key="course.id" :title="course.name">
          <CourseCard :course="course" :reviews="store.reviews[course.id]" />
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard, NInput, NIcon, NSelect, NSlider, NSpace } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { ref, computed } from 'vue'
import { useCourseStore } from '../stores/courseStore'
import CourseCard from '../components/CourseCard.vue'

const store = useCourseStore()
const searchQuery = ref('')
const department = ref('')
const ratingRange = ref([0, 5])
const credit = ref('')

const departmentOptions = computed(() => [
  { label: '计算机学院', value: '计算机学院' },
  { label: '数学学院', value: '数学学院' },
  { label: '物理学院', value: '物理学院' },
])

const creditOptions = [
  { label: '1学分', value: '1' },
  { label: '2学分', value: '2' },
  { label: '3学分', value: '3' },
  { label: '4学分', value: '4' },
]

const filteredCourses = computed(() => {
  return store.courses.filter((course) => {
    const matchesSearch =
      course.name.includes(searchQuery.value) || course.department.includes(searchQuery.value)
    const matchesDepartment = !department.value || course.department === department.value
    const matchesCredit = !credit.value || course.credit.toString() === credit.value

    return matchesSearch && matchesDepartment && matchesCredit
  })
})

const handleSearch = () => {
  // 搜索逻辑
}
</script>

<style scoped>
.search-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.search-content {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}
.filters {
  width: 250px;
}
.results {
  flex: 1;
  display: grid;
  gap: 15px;
}
</style>

<template>
  <div class="footer-filter">
    <n-space justify="center" align="center">
      <n-select
        v-model:value="selectedDepartment"
        :options="departmentOptions"
        placeholder="选择院系"
        style="width: 200px"
        clearable
      />
      <n-select
        v-model:value="selectedCredit"
        :options="creditOptions"
        placeholder="选择学分"
        style="width: 150px"
        clearable
      />
      <n-slider
        v-model:value="ratingRange"
        range
        :min="0"
        :max="5"
        :step="0.5"
        style="width: 300px"
      />
      <n-button type="primary" @click="applyFilters"> 筛选 </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NSelect, NSlider, NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'

const emit = defineEmits(['filter'])

// 筛选状态
const selectedDepartment = ref<string | null>(null)
const selectedCredit = ref<string | null>(null)
const ratingRange = ref<[number, number]>([0, 5])

// 筛选选项
const departmentOptions = [
  { label: '计算机学院', value: '计算机学院' },
  { label: '数学学院', value: '数学学院' },
  { label: '物理学院', value: '物理学院' },
  { label: '化学学院', value: '化学学院' },
  { label: '文学院', value: '文学院' },
]

const creditOptions = [
  { label: '1学分', value: '1' },
  { label: '2学分', value: '2' },
  { label: '3学分', value: '3' },
  { label: '4学分', value: '4' },
  { label: '5学分及以上', value: '5+' },
]

// 应用筛选
const applyFilters = () => {
  emit('filter', {
    department: selectedDepartment.value,
    credit: selectedCredit.value,
    minRating: ratingRange.value[0],
    maxRating: ratingRange.value[1],
  })
}
</script>

<style scoped>
.footer-filter {
  padding: 20px;
  background-color: #f7f7f7;
  border-top: 1px solid #e0e0e0;
  margin-top: 30px;
}
</style>

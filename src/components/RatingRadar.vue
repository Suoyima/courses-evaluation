<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import type { Review } from '../types'

use([CanvasRenderer, RadarChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  reviews: Review[]
}>()

const option = computed(() => ({
  title: {
    text: '课程评分分布',
  },
  tooltip: {},
  legend: {
    data: ['平均分'],
  },
  radar: {
    indicator: [
      { name: '难度', max: 5 },
      { name: '给分', max: 5 },
      { name: '收获', max: 5 },
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [avgDifficulty.value, avgGrading.value, avgContent.value],
          name: '平均分',
        },
      ],
    },
  ],
}))

const avgDifficulty = computed(() => {
  if (props.reviews.length === 0) return 0
  return props.reviews.reduce((sum, r) => sum + r.difficulty, 0) / props.reviews.length
})

const avgGrading = computed(() => {
  if (props.reviews.length === 0) return 0
  return props.reviews.reduce((sum, r) => sum + r.grading, 0) / props.reviews.length
})

const avgContent = computed(() => {
  if (props.reviews.length === 0) return 0
  return props.reviews.reduce((sum, r) => sum + r.content, 0) / props.reviews.length
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>

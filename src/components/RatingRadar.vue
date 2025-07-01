<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CourseReviewStats } from '../types/course'

const props = defineProps<{
  stats: CourseReviewStats
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  const radius = (Math.min(width, height) / 2) * 0.8

  // 绘制雷达图背景
  ctx.fillStyle = 'rgba(75, 192, 192, 0.2)'
  ctx.strokeStyle = 'rgba(75, 192, 192, 1)'
  ctx.lineWidth = 2

  // 绘制3个同心多边形
  for (let level = 1; level <= 3; level++) {
    ctx.beginPath()
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius * (level / 3)
      const y = centerY + Math.sin(angle) * radius * (level / 3)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
    if (level === 3) ctx.fill()
  }

  // 绘制轴线
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3 - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
    ctx.stroke()
  }

  // 绘制数据区域
  ctx.fillStyle = 'rgba(255, 99, 132, 0.5)'
  ctx.strokeStyle = 'rgba(255, 99, 132, 1)'
  ctx.lineWidth = 2
  ctx.beginPath()

  const stats = [props.stats.difficulty, props.stats.grading, props.stats.harvest]
  const labels = ['难度', '给分', '收获']

  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3 - Math.PI / 2
    const value = (stats[i] / 5) * radius // 5分制转换为半径比例
    const x = centerX + Math.cos(angle) * value
    const y = centerY + Math.sin(angle) * value

    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)

    // 绘制标签
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    const labelX = centerX + Math.cos(angle) * (radius + 20)
    const labelY = centerY + Math.sin(angle) * (radius + 20)
    ctx.fillText(labels[i], labelX, labelY)
  }

  ctx.closePath()
  ctx.fill()
  ctx.stroke()
})
</script>

<template>
  <div class="radar-container">
    <canvas ref="canvasRef" width="300" height="300"></canvas>
  </div>
</template>

<style scoped>
.radar-container {
  margin: 20px auto;
  max-width: 300px;
}
</style>

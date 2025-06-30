<template>
  <n-menu mode="horizontal" :options="menuOptions" />
</template>

<script setup lang="ts">
import { NMenu } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuOptions = ref([
  {
    label: '课程',
    key: 'course',
    onClick: () => router.push('/'),
  },
  {
    label: '导师',
    key: 'teacher',
    onClick: () => router.push('/search?type=teacher'),
  },
  {
    label: '我的',
    key: 'mine',
    onClick: () => router.push('/search?type=mine'),
  },
])
</script>

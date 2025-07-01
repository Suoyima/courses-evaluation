// src/api/review.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://后端地址/api',
  timeout: 5000,
})

export const submitReview = (data: { course_id: string; rating: number; comment: string }) =>
  api.post('/reviews', data)

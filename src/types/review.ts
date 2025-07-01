export interface Review {
  id: number
  course_id: number
  course_name?: string
  user_name?: string
  rating: number
  difficulty?: number
  grading?: number
  harvest?: number
  content: string
  created_at: string
}

export interface ReviewCreatePayload {
  course_id: number
  rating: number
  difficulty: number
  grading: number
  harvest: number
  content: string
}

export interface ReviewFilters {
  departments: string[]
  rating_ranges: string[]
}

export interface CourseBase {
  id: number
  name: string
  department: string
  credit?: number
  avg_rating?: number
  cover_url?: string
}

export interface CourseDetail extends CourseBase {
  avg_difficulty: number
  avg_grading: number
  avg_harvest: number
}

export interface SimilarCourse extends CourseBase {
  id: number
  name: string
  department: string
  avg_rating: number
}

export interface CourseReviewStats {
  difficulty: number
  grading: number
  harvest: number
}

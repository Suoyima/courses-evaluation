export interface Review {
  id: string
  courseId: string
  userId: string
  rating: number // 总体评分(1-5星)
  difficulty: number // 难度评分(1-5)
  grading: number // 给分情况(1-5)
  content: number // 内容收获(1-5)
  comment: string // 文字评价
  createdAt: string // 创建时间
  updatedAt: string // 更新时间
}

export interface ReviewForm {
  courseId: string
  rating: number
  difficulty: number
  grading: number
  content: number
  comment: string
}

export interface ReviewStats {
  avgRating: number
  avgDifficulty: number
  avgGrading: number
  avgContent: number
  total: number
}

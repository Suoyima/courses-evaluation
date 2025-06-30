export interface Course {
  id: string
  name: string
  department: string
  credit: number
  cover?: string
  teachers?: Teacher[]
}

export interface Teacher {
  id: string
  name: string
  department: string
  avatar?: string
}

export interface CourseSearchParams {
  keyword?: string
  department?: string
  minRating?: number
  maxRating?: number
  credit?: number
}

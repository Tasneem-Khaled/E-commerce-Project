export interface CategoriesResponse {
  results: number
  metadata: CategoriesMetadata
  data: Category[]
}

export interface CategoriesMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

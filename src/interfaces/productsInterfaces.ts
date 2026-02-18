import { Brand } from "./brandsInterfaces"
import { Category } from "./categoriesInterfaces"

export interface productsData {
  results: number
  metadata: productsMetadata
  data: product[]
}

export interface productsMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface product {
  sold?: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}
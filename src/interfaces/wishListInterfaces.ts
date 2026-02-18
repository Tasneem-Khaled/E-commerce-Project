import { product } from "./productsInterfaces"


export interface WishlisResponse {
  status: string
  message?: string
  count?: number
  data: product[]
}


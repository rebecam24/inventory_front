export interface DataResponseProduct {
  status: string
  message: string
  data: DataProduct
}

export interface DataResponseSaveOrUpdateProduct {
  status: string
  message: string
  data: DataEditProduct
}

export interface DataResponseDeleteProduct {
  status: string
  message: string
  data: []
}
export interface DataProduct {
  products: Product[]
}

export interface DataEditProduct {
  product: Product
}

export interface Product {
  id: number
  name: string
  price: number
  quantity_available: number
  IVA: number
  category_id: number
  provider_id: number
  provider: string
  category: string
}

export interface DataResponseCategory {
  status: string
  message: string
  data: DataCategory
}

export interface DataResponseSaveOrUpdateCategory {
  status: string
  message: string
  data: DataEditCategory
}

export interface DataResponseDeleteCategory {
  status: string
  message: string
  data: []
}
export interface DataCategory {
  categories: Category[]
}

export interface DataEditCategory {
  category: Category
}

export interface Category {
  id: number
  name: string
  description: string

}

export interface DataResponseDeleteCategory {
  status: string
  message: string
  data: []
}

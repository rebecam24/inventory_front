export interface DataResponseProvider {
  status: string
  message: string
  data: DataProvider
}

export interface DataResponseSaveOrUpdateProvider {
  status: string
  message: string
  data: DataEditProvider
}

export interface DataResponseDeleteProvider {
  status: string
  message: string
  data: []
}
export interface DataProvider {
  providers: Provider[]
}

export interface DataEditProvider {
  provider: Provider
}

export interface Provider {
  id: number
  name: string
  lastname: string
  id_number: number
  address: string
  phone: string
  email: string
  description: string
}

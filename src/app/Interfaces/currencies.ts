export interface DataResponseCurrency {
  status: string
  message: string
  data: DataCurrency
}

export interface DataResponseSaveOrUpdateCurrency {
  status: string
  message: string
  data: DataEditCurrency
}

export interface DataResponseDeleteCurrency {
  status: string
  message: string
  data: []
}
export interface DataCurrency {
  currencies: Currency[]
}

export interface DataEditCurrency {
  currency: Currency
}

export interface Currency {
  id: number
  name: string
  rate: number

}

export interface DataResponseDeleteCurrency {
  status: string
  message: string
  data: []
}

export interface DataResponsePayments {
  status: string
  message: string
  data: DataPayments
}

export interface DataResponseSaveOrUpdatePayments {
  status: string
  message: string
  data: DataEditPayments
}

export interface DataResponseDeletePayments {
  status: string
  message: string
  data: []
}
export interface DataPayments {
  paymentMethods: Payments[]
}

export interface DataEditPayments {
  paymentMethod: Payments
}

export interface Payments {
  id: number
  type: string

}

export interface DataResponseDeletePayments {
  status: string
  message: string
  data: []
}

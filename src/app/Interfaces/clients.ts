export interface DataResponseClient {
  status: string
  message: string
  data: DataClient
}

export interface DataResponseSaveOrUpdateClient {
  status: string
  message: string
  data: DataEditClient
}

export interface DataResponseDeleteClient {
  status: string
  message: string
  data: []
}
export interface DataClient {
  clients: Client[]
}

export interface DataEditClient {
  client: Client
}

export interface Client {
  id: number
  name: string
  lastname: string
  id_number: string
  address: string
  phone: string
}

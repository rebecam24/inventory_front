export interface DataResponse {
  status: string
  message: string
  data: Data
}

export interface DataResponseSaveOrUpdate {
  status: string
  message: string
  data: DataEdit
}

export interface DataResponseDelete {
  status: string
  message: string
  data: []
}
export interface Data {
  users: User[]
}

export interface DataEdit {
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  address: string
  birthday: string
  deleted_at: any
  gender: string
  id_number: string
  lastname: string
  phone: string
  role_id: number
  url_image: any
  work_position: string
}

export interface LoginResponse {
  status: string
  message: string
  data: DataLogin
}

export interface DataLogin {
  token: string
  user: User
}

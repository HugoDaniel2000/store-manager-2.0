export type User = {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
}

export type userUpdate = {
  id: number
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
}

export type login = {
  email: string,
  password: string
}

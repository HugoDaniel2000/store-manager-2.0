export type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  role: string,
  password?: string
}

export type userUpdateBody = {
  first_name?: string,
  last_name?: string,
  email?: string,
  role?: string,
  password?: string,
}

export type userCreate = {
  first_name: string,
  last_name: string,
  email: string,
  role?: string,
  password: string
}

export type userCreated = {
  id: number,
  firstName: string,
  lastName: string,
  role: string
  email: string,
}
export type userUpdate = {
  id: number
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
  role?: string,
}

export type login = {
  email: string,
  password: string
}

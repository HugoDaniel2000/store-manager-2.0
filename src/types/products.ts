export type product = {
  id?: number,
  name: string,
  quantity: number,
}

export type NewProduct = {
  name: string,
  quantity: number,
  role?: string,
}

export type productUpdate = {
  id: number,
  name?: string,
  quantity?: number,
}

export type productUpdateParam = {
  id: number,
  name?: string,
  quantity?: number,
  role?: string,
}

export type product = {
  id?: number,
  name: string,
  quantity: number,
}

export type productType = {
  name: string,
  quantity: number,
}

export type NewProduct = {
  products: productType[]
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

export type deleteProduct = {
  id: number,
  role: string,
}

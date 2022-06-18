export type product = {
  id?: number,
  name: string,
  imageUrl?: string,
  quantity: number,
}

export type productType = {
  name: string,
  imageUrl?:string
  quantity: number,
}

export type NewProduct = {
  products: productType[]
}

export type productUpdate = {
  id: number,
  name?: string,
  imageUrl?: string,
  quantity?: number,
}

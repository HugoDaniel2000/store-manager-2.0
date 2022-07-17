export type salesProduct = {
  id?: number,
  sale_id?: number,
  user_id: number,
  product_id: number,
  quantity: number,
}

export type salesProducts = {
  id: number
  user_id: number
  sale_id: number
  product_id: number
  quantity: number
}

export type Sales ={
  id: number,
  date?: Date
  Sales_Products: salesProduct[]
}

export type salesType = {
  product_id: number,
  quantity: number,
}

export type newSales = {
  user_id: number,
  sales: salesType[]
}

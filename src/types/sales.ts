export type salesProduct = {
  id?: number,
  sale_id?: number,
  user_id: number,
  product_id: number,
  quantity: number,
}

export type Sales ={
  id: number,
  date?: Date
  Sales_Products: salesProduct[]
}

export type newSales ={
  user_id: number,
  product_id: number,
  quantity: number,
}

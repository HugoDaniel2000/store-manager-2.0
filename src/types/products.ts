export type product = {
  id?: number,
  name: string,
  quantity: number,
}

export type productUpdate = {
  id: number,
  name?: string,
  quantity?: number,
}

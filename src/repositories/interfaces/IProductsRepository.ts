import { product, productUpdate } from '../../types/products';

export interface IProductsRepository {
  findAll(): Promise<product[]>;
  findById(id: number): Promise<product | null>;
  create(newProduct: product): Promise<product>;
  update(productAtt: productUpdate): Promise<product>;
  deleteById(id: number): Promise<void>
}

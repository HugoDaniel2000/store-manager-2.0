import { Products } from '@prisma/client';
import { product, productUpdate } from '../../types/products';

export interface IProductsRepository {
  findAll(): Promise<Products[]>;
  findByName(name: string): Promise<Products | null>
  findById(id: number): Promise<Products | null>;
  create(newProduct: product): Promise<Products>;
  update(productAtt: productUpdate): Promise<Products>;
  deleteById(id: number): Promise<void>
}

import { Sales } from '@prisma/client';
import { newSales, salesProducts, salesUpdate } from '../../types/sales';

export interface ISalesRepository {
  findAll(): Promise<Sales[]>;
  findById(id: number): Promise<Sales | null>;
  findByIdProductSales(id: number): Promise<salesProducts[]>;
  create(sales: newSales): Promise<Sales>;
  update(saleUpdt: salesUpdate): Promise<void>
  deleteById(id: number): Promise<void>
}

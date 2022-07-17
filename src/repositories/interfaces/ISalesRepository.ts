import { Sales } from '@prisma/client';
import { newSales, salesProducts } from '../../types/sales';

export interface ISalesRepository {
  findAll(): Promise<Sales[]>;
  findById(id: number): Promise<Sales | null>;
  findByIdProductSales(id: number): Promise<salesProducts[]>;
  create(sales: newSales): Promise<Sales>;
  deleteById(id: number): Promise<void>
}

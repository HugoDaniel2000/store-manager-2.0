import { Sales } from '@prisma/client';
import { newSales, salesUpdate } from '../../types/sales';

export interface ISalesRepository {
  findAll(): Promise<Sales[]>;
  findById(id: number): Promise<Sales | null>;
  create(sales: newSales): Promise<Sales>;
  update(saleUpdt: salesUpdate): Promise<void>
  deleteById(id: number): Promise<void>
}

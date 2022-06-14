import { Sales, salesProduct } from '../../types/sales';

export interface ISalesRepository {
  findAll(): Promise<Sales[]>;
  findById(id: number): Promise<Sales | null>;
  create(newSales: object): Promise<salesProduct>;
  deleteById(id: number): Promise<void>
}

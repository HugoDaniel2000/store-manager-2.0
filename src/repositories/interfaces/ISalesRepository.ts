import { Sales } from '../../types/sales';

export interface ISalesRepository {
  findAll(): Promise<Sales[]>;
  findById(id: number): Promise<Sales | null>;
  create(newUser: object): Promise<Sales>;
  deleteById(id: number): Promise<void>
}

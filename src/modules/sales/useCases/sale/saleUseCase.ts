import { Sales } from '@prisma/client';
// import errors from 'restify-errors';
import SalesRepository from '../../../../repositories/implementations/salesRepository';
import { newSales } from '../../../../types/sales';

export default class SaleUseCase {
  private salesRepository: SalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  async createSales(sales: newSales): Promise<Sales> {
    const salesCreated = await this.salesRepository.create(sales);
    return salesCreated;
  }
}

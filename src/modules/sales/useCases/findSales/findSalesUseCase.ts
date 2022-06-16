import { Sales } from '@prisma/client';
import errors from 'restify-errors';
import SalesRepository from '../../../../repositories/implementations/salesRepository';

export default class FindSalesUseCase {
  private salesRepository: SalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  async findAllSales():Promise<Sales[]> {
    const sales = await this.salesRepository.findAll();
    return sales;
  }

  async findSalesById(id: number): Promise<Sales> {
    const sale = await this.salesRepository.findById(id);
    if (!sale) {
      throw new errors.NotFoundError('Sale not found');
    }
    return sale;
  }
}

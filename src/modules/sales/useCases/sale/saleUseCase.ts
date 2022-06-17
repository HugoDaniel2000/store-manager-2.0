import { Sales } from '@prisma/client';
import errors from 'restify-errors';

import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import SalesRepository from '../../../../repositories/implementations/salesRepository';

import { newSales, salesUpdate } from '../../../../types/sales';

export default class SaleUseCase {
  private salesRepository: SalesRepository;

  private productsRepository: ProductsRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
    this.productsRepository = new ProductsRepository();
  }

  async createSales(sales: newSales): Promise<Sales> {
    const products = sales.sales.map((sale) => this.productsRepository.findById(sale.product_id));
    const productsExist = await Promise.all(products).then((data) => data);
    if (productsExist.includes(null)) {
      throw new errors.NotFoundError('Product not found');
    }
    const salesCreated = await this.salesRepository.create(sales);
    return salesCreated;
  }

  async updateSales(saleUpt: salesUpdate): Promise<object> {
    const saleExist = await this.salesRepository.findById(saleUpt.id);
    if (!saleExist) {
      throw new errors.NotFoundError('Sale not found');
    }

    await this.salesRepository.update(saleUpt);
    return { message: 'Sale updated successfully' };
  }

  async deleteSalesById(id: number): Promise<object> {
    const saleExist = await this.salesRepository.findById(id);
    if (!saleExist) {
      throw new errors.NotFoundError('Sale not found');
    }
    await this.salesRepository.deleteById(id);
    return { message: 'Sale deleted successfully' };
  }
}

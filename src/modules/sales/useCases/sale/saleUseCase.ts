import { Sales } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';

// import errors from 'restify-errors';
import SalesRepository from '../../../../repositories/implementations/salesRepository';
import { newSales } from '../../../../types/sales';

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
}

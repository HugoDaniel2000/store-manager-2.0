import { Products, Sales } from '@prisma/client';
import errors from 'restify-errors';

import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import SalesRepository from '../../../../repositories/implementations/salesRepository';

import { newSales, salesType, salesUpdate } from '../../../../types/sales';

export default class SaleUseCase {
  private salesRepository: SalesRepository;

  private productsRepository: ProductsRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
    this.productsRepository = new ProductsRepository();
  }

  private async decreaseQuantityProduct(sales: salesType[]): Promise<void> {
    const salesMap = sales.map(async (sale) => {
      const prod = await this.productsRepository.findById(sale.product_id) as unknown as Products;
      const value = prod.quantity - sale.quantity;
      return this.productsRepository.update({ id: sale.product_id, quantity: value });
    });
    await Promise.all(salesMap);
  }

  private async increasedQuantityProduct(id: number): Promise<void> {
    const salesProducts = await this.salesRepository.findByIdProductSales(id);
    const productMap = salesProducts.map(async (e) => {
      const prod = await this.productsRepository.findById(e.product_id) as unknown as Products;
      const value = prod.quantity + e.quantity;
      console.log(value);
      return this.productsRepository.update({ id: e.product_id, quantity: value });
    });
    await Promise.all(productMap);
  }

  private async productQuantityControl(sales: salesType[]): Promise<boolean> {
    const saleMap = sales.map(async (sale, index) => {
      const prod = await this.productsRepository.findById(sale.product_id) as unknown as Products;
      return (prod.quantity - sales[index].quantity) < 0;
    });
    const productMapResult = await Promise.all(saleMap).then((data) => data);
    console.log(productMapResult);
    return productMapResult.some((e) => e === true);
  }

  async createSales(sales: newSales): Promise<Sales> {
    const products = sales.sales.map((sale) => this.productsRepository.findById(sale.product_id));
    const productsExist = await Promise.all(products).then((data) => data);
    if (productsExist.includes(null)) {
      throw new errors.NotFoundError('Product not found');
    }
    const notHasStock = await this.productQuantityControl(sales.sales);
    if (notHasStock) {
      throw new errors.UnprocessableEntityError('Such quantity is not permitted to sell');
    }
    await this.decreaseQuantityProduct(sales.sales);
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
    await this.increasedQuantityProduct(id);
    await this.salesRepository.deleteById(id);
    return { message: 'Sale deleted successfully' };
  }
}

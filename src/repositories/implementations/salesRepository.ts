import { PrismaClient } from '@prisma/client';
import { newSales, Sales, salesProduct } from '../../types/sales';
import { ISalesRepository } from '../interfaces/ISalesRepository';

export default class SalesRepository implements ISalesRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findAll(): Promise<Sales[]> {
    const sales = await this.model.sales.findMany({ include: { Sales_Products: true } });
    return sales;
  }

  async findById(id: number): Promise<Sales | null> {
    const sale = await this.model.sales.findUnique({
      where: { id },
      include: { Sales_Products: true },
    });
    return sale;
  }

  async create(sales: newSales): Promise<salesProduct> {
    const date = new Date();
    const sale = await this.model.sales.create({ data: { date } });
    const saleProduct = await this.model.sales_Products.create({
      data: {
        sale_id: sale.id, ...sales,
      },
    });
    return saleProduct;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.sales.delete({ where: { id } });
  }
}

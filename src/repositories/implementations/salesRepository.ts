import { PrismaClient, Sales } from '@prisma/client';
import { newSales, salesProducts } from '../../types/sales';
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

  async findByIdProductSales(id: number): Promise<salesProducts[]> {
    const result = await this.model.sales_Products.findMany({ where: { sale_id: id } });
    return result;
  }

  async create(sales: newSales): Promise<Sales> {
    const date = new Date();
    const sale = await this.model.sales.create({ data: { date } });
    const salesmap = sales.sales.map((newSale) => this.model.sales_Products.create({
      data: {
        sale_id: sale.id, user_id: sales.user_id, ...newSale,
      },
    }));
    await Promise.all(salesmap);
    const saleCreated = await this.findById(sale.id) as Sales;
    return saleCreated;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.sales_Products.deleteMany({ where: { sale_id: id } });
    await this.model.sales.delete({ where: { id } });
  }
}

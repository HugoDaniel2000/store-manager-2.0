import { PrismaClient } from '@prisma/client';
import { Sales } from '../../types/sales';
import { ISalesRepository } from '../interfaces/ISalesRepository';

export default class SalesRepository implements ISalesRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findAll(): Promise<Sales[]> {
    const sales = await this.model.sales.findMany();
    return sales;
  }

  async findById(id: number): Promise<Sales | null> {
    const sale = await this.model.sales.findUnique({ where: { id } });
    return sale;
  }

  async create(): Promise<Sales> {
    const date = new Date();
    const productCreated = await this.model.sales.create({ data: { date } });
    return productCreated;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.sales.delete({ where: { id } });
  }
}

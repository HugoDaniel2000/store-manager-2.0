import { PrismaClient } from '@prisma/client';
import { product, productUpdate } from '../../types/products';
import { IProductsRepository } from '../interfaces/IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findAll(): Promise<product[]> {
    const products = await this.model.products.findMany();
    return products;
  }

  async findById(id: number): Promise<product | null> {
    const products = await this.model.products.findUnique({ where: { id } });
    return products;
  }

  async create(newProduct: product): Promise<product> {
    const productCreated = await this.model.products.create({ data: newProduct });
    return productCreated;
  }

  async update(productAtt: productUpdate): Promise<product> {
    const productUpdated = await this.model.products.update({
      where: { id: productAtt.id },
      data: productAtt,
    });
    return productUpdated;
  }

  async deleteById(id: number): Promise<void> {
    await this.model.products.delete({ where: { id } });
  }
}

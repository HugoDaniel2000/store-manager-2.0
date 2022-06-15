import { PrismaClient, Products } from '@prisma/client';
import { product, productUpdate } from '../../types/products';
import { IProductsRepository } from '../interfaces/IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private model: PrismaClient;

  constructor() {
    this.model = new PrismaClient();
  }

  async findByName(name: string): Promise<Products | null> {
    const products = await this.model.products.findUnique({ where: { name } });
    return products;
  }

  async findAll(): Promise<Products[]> {
    const products = await this.model.products.findMany();
    return products;
  }

  async findById(id: number): Promise<Products | null> {
    const products = await this.model.products.findUnique({ where: { id } });
    return products;
  }

  async create(newProduct: product): Promise<Products> {
    const productCreated = await this.model.products.create({ data: newProduct });
    return productCreated;
  }

  async update(productAtt: productUpdate): Promise<Products> {
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

import { Products } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';

export default class FindProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async findProductsById(id: number): Promise<Products> {
    const product = await this.productsRepository.findById(id) as Products;
    if (!product) {
      throw new errors.NotFoundError('Product not found');
    }
    return product;
  }
}

import { Products } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import { NewProduct } from '../../../../types/products';

export default class ProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async createProducts(newProduct: NewProduct): Promise<Products> {
    if (newProduct.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to create products');
    }
    const product = newProduct;
    delete product.role;
    const productCreated = await this.productsRepository.create(product);
    return productCreated;
  }
}

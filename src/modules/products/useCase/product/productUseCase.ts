import { Products } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import { NewProduct, productUpdateParam } from '../../../../types/products';

export default class ProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async createProduct(newProduct: NewProduct): Promise<Products> {
    if (newProduct.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to create products');
    }
    const productExist = await this.productsRepository.findByName(newProduct.name);
    if (productExist) {
      throw new errors.ConflictError('Product already exists');
    }
    const product = newProduct;
    delete product.role;
    const productCreated = await this.productsRepository.create(product);
    return productCreated;
  }

  async updateProduct(product: productUpdateParam): Promise<Products> {
    if (product.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to update products');
    }
    const productExist = await this.productsRepository.findById(product.id);
    if (!productExist) {
      throw new errors.NotFoundError('Product not found');
    }
    const productUpt = product;
    delete productUpt.role;
    const productUpdated = await this.productsRepository.update(productUpt);
    return productUpdated;
  }
}

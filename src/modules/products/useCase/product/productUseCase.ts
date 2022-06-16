import { Products } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import { NewProduct, productUpdate } from '../../../../types/products';

export default class ProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async createProduct(newProduct: NewProduct): Promise<Products[]> {
    const productMap = newProduct.products
      .map((product) => this.productsRepository.findByName(product.name));
    const productExist = await Promise.all(productMap).then((data) => data);
    if (!productExist.includes(null)) {
      throw new errors.ConflictError('Product already exists');
    }
    const products = newProduct.products.map((product) => this.productsRepository.create(product));

    return Promise.all(products).then((data) => data);
  }

  async updateProduct(product: productUpdate): Promise<Products> {
    const productExist = await this.productsRepository.findById(product.id);
    if (!productExist) {
      throw new errors.NotFoundError('Product not found');
    }
    const productUpdated = await this.productsRepository.update(product);
    return productUpdated;
  }

  async deleteProduct(id: number): Promise<object> {
    const productExist = await this.productsRepository.findById(id);
    if (!productExist) {
      throw new errors.NotFoundError('Product not found');
    }
    await this.productsRepository.deleteById(id);
    return { message: 'Product deleted successfully' };
  }
}

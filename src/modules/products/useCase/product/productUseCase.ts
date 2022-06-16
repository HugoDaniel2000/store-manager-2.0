import { Products } from '@prisma/client';
import errors from 'restify-errors';
import ProductsRepository from '../../../../repositories/implementations/productsRepository';
import { deleteProduct, NewProduct, productUpdateParam } from '../../../../types/products';

export default class ProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async createProduct(newProduct: NewProduct): Promise<Products[]> {
    if (newProduct.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to create products');
    }
    const productMap = newProduct.products
      .map((product) => this.productsRepository.findByName(product.name));
    const productExist = await Promise.all(productMap).then((data) => data);
    if (!productExist.includes(null)) {
      throw new errors.ConflictError('Product already exists');
    }
    const products = newProduct.products.map((product) => this.productsRepository.create(product));

    return Promise.all(products).then((data) => data);
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

  async deleteProduct(params: deleteProduct): Promise<object> {
    if (params.role !== 'admin') {
      throw new errors.UnauthorizedError('You do not have permission to delete products');
    }
    const productExist = await this.productsRepository.findById(params.id);
    if (!productExist) {
      throw new errors.NotFoundError('Product not found');
    }
    await this.productsRepository.deleteById(params.id);
    return { message: 'Product deleted successfully' };
  }
}

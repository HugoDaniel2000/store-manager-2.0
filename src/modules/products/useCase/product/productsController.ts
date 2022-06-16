import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductsUseCase from './productUseCase';

export default class ProductsController {
  private productsUseCase: ProductsUseCase;

  constructor() {
    this.productsUseCase = new ProductsUseCase();
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { products } = req.body;
      const result = await this.productsUseCase.createProduct({ products });
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = req.body;
      const result = await this.productsUseCase.updateProduct({ id: Number(id), ...product });
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.productsUseCase.deleteProduct(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

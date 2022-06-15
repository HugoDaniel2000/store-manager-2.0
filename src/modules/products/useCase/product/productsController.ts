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
      const roleUser = req.body.user.role;
      const { name, quantity } = req.body;
      const result = await this.productsUseCase.createProduct({ name, quantity, role: roleUser });
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const roleUser = req.body.user.role;
      const { name, quantity } = req.body;
      const result = await this.productsUseCase
        .updateProduct({
          id: Number(id), name, quantity, role: roleUser,
        });
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

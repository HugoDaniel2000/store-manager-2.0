import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductsUseCase from './productUseCase';

export default class ProductsController {
  private productsUseCase: ProductsUseCase;

  constructor() {
    this.productsUseCase = new ProductsUseCase();
  }

  async createProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const roleUser = req.body.user.role;
      const { name, quantity } = req.body;
      const result = await this.productsUseCase.createProducts({ name, quantity, role: roleUser });
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
}

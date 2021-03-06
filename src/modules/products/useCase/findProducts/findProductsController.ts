import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FindProductsUseCase from './findProductsUseCase';

export default class UserController {
  private findProductsUseCase: FindProductsUseCase;

  constructor() {
    this.findProductsUseCase = new FindProductsUseCase();
  }

  async findAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.findProductsUseCase.findAllProducts();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findProductsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.findProductsUseCase.findProductsById(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

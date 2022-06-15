import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FindProductsUseCase from './findProductsUseCase';

export default class UserController {
  private findProductsUseCase: FindProductsUseCase;

  constructor() {
    this.findProductsUseCase = new FindProductsUseCase();
  }

  async findProductsById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.findProductsUseCase.findProductsById(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

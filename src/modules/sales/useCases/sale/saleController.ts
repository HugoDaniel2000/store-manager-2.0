import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import SaleUseCase from './saleUseCase';

export default class SalesController {
  private saleUseCase: SaleUseCase;

  constructor() {
    this.saleUseCase = new SaleUseCase();
  }

  async createSales(req: Request, res: Response, next: NextFunction) {
    try {
      const { sales, id } = req.body;
      const result = await this.saleUseCase.createSales({ user_id: id, sales });
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
}

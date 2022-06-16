import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FindSalesUseCase from './findSalesUseCase';

export default class FindSalesController {
  private findSalesUseCase: FindSalesUseCase;

  constructor() {
    this.findSalesUseCase = new FindSalesUseCase();
  }

  async findAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.findSalesUseCase.findAllSales();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findSalesById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.findSalesUseCase.findSalesById(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import FindUserUseCase from './findUserUseCase';

export default class FindUserController {
  private findUserUseCase: FindUserUseCase;

  constructor() {
    this.findUserUseCase = new FindUserUseCase();
  }

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.findUserUseCase.findAllUsers();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.findUserUseCase.findUserById(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

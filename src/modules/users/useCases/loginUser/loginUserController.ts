import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginUserUseCase from './loginUserUseCase';

export default class LoginUserController {
  private loginUserUseCase: LoginUserUseCase;

  constructor() {
    this.loginUserUseCase = new LoginUserUseCase();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUserUseCase.login({ email, password });
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

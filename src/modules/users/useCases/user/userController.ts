import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userCreate } from '../../../../types/users';
import UserUseCase from './userUseCase';

export default class UserController {
  private userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
  }

  async findUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.userUseCase.findUserById(Number(id));
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const newUser: userCreate = req.body;
    try {
      const result = await this.userUseCase.createUser(newUser);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const userUpdate = req.body;
    try {
      const result = await this.userUseCase.updateUser({ id: Number(id), ...userUpdate });
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { user } = req.body;
    try {
      const result = await this.userUseCase.deleteUser({ id: Number(id), user });
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userCreate, userCreated } from '../../../../types/users';
import UserUseCase from './userUseCase';

export default class UserController {
  private userUseCase: UserUseCase;

  constructor() {
    this.userUseCase = new UserUseCase();
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
    const user = req.query.user as unknown as userCreated;

    const userUpdate = req.body;
    try {
      const result = await this.userUseCase.updateUser({ id: Number(id), ...userUpdate }, user);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

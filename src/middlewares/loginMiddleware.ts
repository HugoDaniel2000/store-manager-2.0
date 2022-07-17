import { NextFunction, Request, Response } from 'express';
import errors from 'restify-errors';
import validator from 'validator';

export default class LoginMiddleware {
  public static validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      throw new errors.BadRequestError('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw new errors.BadRequestError('"email" must have a valid format');
    }
    next();
  };

  public static validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      throw new errors.BadRequestError('All fields must be filled');
    }
    next();
  };
}

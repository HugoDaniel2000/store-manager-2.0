import { NextFunction, Request, Response } from 'express';
import errors from 'restify-errors';
import validator from 'validator';

export default class UserUpdateMiddleware {
  public static validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (email && !validator.isEmail(email)) {
      throw new errors.BadRequestError('Email must have a valid format');
    }
    next();
  };

  public static validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (password && password.length < 6) {
      throw new errors.BadRequestError('Password must be at least 6 characters long');
    }
    next();
  };

  public static validateFirstName = (req: Request, res: Response, next: NextFunction) => {
    const { first_name: firstName } = req.body;
    if (firstName && firstName.length < 3) {
      throw new errors.BadRequestError('First Name must be at least 3 characters long');
    }
    next();
  };

  public static validateLastName = (req: Request, res: Response, next: NextFunction) => {
    const { last_name: lastName } = req.body;
    if (lastName && lastName.length < 3) {
      throw new errors.BadRequestError('Last Name must be at least 3 characters long');
    }
    next();
  };

  public static validateUser = [
    UserUpdateMiddleware.validateEmail,
    UserUpdateMiddleware.validateLastName,
    UserUpdateMiddleware.validatePassword,
    UserUpdateMiddleware.validateFirstName,
  ];
}

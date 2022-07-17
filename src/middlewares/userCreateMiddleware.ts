import { NextFunction, Request, Response } from 'express';
import errors from 'restify-errors';
import validator from 'validator';

export default class UserCreateMiddleware {
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
    if (password.length < 6) {
      throw new errors.BadRequestError('Password must be at least 6 characters long');
    }
    next();
  };

  public static validateFirstName = (req: Request, res: Response, next: NextFunction) => {
    const { first_name: firstName } = req.body;
    if (!firstName || typeof firstName !== 'string') {
      throw new errors.BadRequestError('All fields must be filled');
    }
    if (firstName.length < 3) {
      throw new errors.BadRequestError('"first name" must be at least 3 characters long');
    }
    next();
  };

  public static validateLastName = (req: Request, res: Response, next: NextFunction) => {
    const { last_name: lastName } = req.body;
    if (!lastName || typeof lastName !== 'string') {
      throw new errors.BadRequestError('All fields must be filled');
    }
    if (lastName.length < 3) {
      throw new errors.BadRequestError('"last_name" must be at least 3 characters long');
    }
    next();
  };

  public static validRole = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
    if (role && !['customer', 'administrator'].includes(role)) {
      throw new errors.BadRequestError('"role" should be customer or administrator');
    }
    next();
  };

  public static validateUser = [
    UserCreateMiddleware.validateEmail,
    UserCreateMiddleware.validateLastName,
    UserCreateMiddleware.validatePassword,
    UserCreateMiddleware.validateFirstName,
    UserCreateMiddleware.validRole,
  ];
}

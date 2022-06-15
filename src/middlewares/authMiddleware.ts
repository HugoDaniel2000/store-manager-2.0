import errors from 'restify-errors';
import { Request, Response, NextFunction } from 'express';
import Token from '../helpers/jwt.auth';

export default class AuthMiddleware {
  public static validToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;
    if (!token) {
      throw new errors.UnauthorizedError('Token not found');
    }
    const payload = Token.validate(token);
    if (!payload) {
      throw new errors.UnauthorizedError('Invalid token');
    }
    req.body.user = payload;
    next();
  };
}

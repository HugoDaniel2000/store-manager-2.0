import errors from 'restify-errors';
import { Request, Response, NextFunction } from 'express';
import Token from '../helpers/jwt.auth';

type payloadToken = {
  id: number,
  firstName: string,
  lastName: string,
  role: string,
  iat: number,
  exp: number,
}

let user: payloadToken;

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
    user = payload as payloadToken;
    next();
  };

  public static getUserIdToken = (req: Request, res: Response, next: NextFunction) => {
    req.body.id = user.id;
    next();
  };

  public static validRoleUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (user.id !== Number(id) && user.role !== 'administrator') {
      throw new errors.UnauthorizedError('You do not have permission to update or delete this user');
    }
    next();
  };

  public static validRoleUserAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (user.role !== 'administrator') {
      throw new errors.UnauthorizedError('You do not have permission to create, update or delete products');
    }
    next();
  };
}

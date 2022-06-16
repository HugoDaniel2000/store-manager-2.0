import { NextFunction, Request, Response } from 'express';
import errors from 'restify-errors';
import { productType } from '../types/products';

export default class ProductMiddleware {
  public static validateCreateProducts = (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    products.forEach((product: productType) => {
      if (!product.name) {
        throw new errors.BadRequestError('All fields must be filled');
      }

      if (!product.quantity) {
        throw new errors.BadRequestError('All fields must be filled');
      }

      if (product.quantity < 0) {
        throw new errors.BadRequestError('Quantity must be greater than to 0');
      }
    });
    next();
  };

  public static validateUpdateProducts = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (name && name.length === 0) {
      throw new errors.BadRequestError('All fields must be filled');
    }

    next();
  };
}

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

      if (typeof product.name !== 'string') {
        throw new errors.BadRequestError('The name field must be of type string');
      }

      if (!product.quantity && typeof product.quantity !== 'number') {
        throw new errors.BadRequestError('All fields must be filled');
      }

      if (typeof product.quantity !== 'number') {
        throw new errors.BadRequestError('The name field must be of type number');
      }

      if (product.quantity < 1) {
        throw new errors.BadRequestError('Quantity must be greater than to 0');
      }
    });
    next();
  };

  public static validateUpdateProducts = (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity } = req.body;
    if (name && typeof name !== 'string') {
      throw new errors.BadRequestError('The name field must be of type string');
    }

    if (name === '') {
      throw new errors.BadRequestError('The name field must be filled');
    }

    if (typeof quantity !== 'number') {
      throw new errors.BadRequestError('The name field must be of type number');
    }

    if (quantity < 0) {
      throw new errors.BadRequestError('Quantity must be greater than or equal to 0');
    }

    next();
  };
}

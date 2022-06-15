import {
  NextFunction, Response, Request, Router,
} from 'express';

import FindProductsController from '../modules/products/useCase/findProducts/findProductsController';

const findProductsController = new FindProductsController();
const router = Router();

router.route('/')
  .get((req: Request, res: Response, next: NextFunction) => {
    findProductsController.findAllProducts(req, res, next);
  });

router.route('/:id')
  .get((req: Request, res: Response, next: NextFunction) => {
    findProductsController.findProductsById(req, res, next);
  });

export default router;

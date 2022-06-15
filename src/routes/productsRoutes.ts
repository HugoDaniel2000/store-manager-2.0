import {
  NextFunction, Response, Request, Router,
} from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';

import FindProductsController from '../modules/products/useCase/findProducts/findProductsController';
import ProductsController from '../modules/products/useCase/product/productsController';

const findProductsController = new FindProductsController();
const productsController = new ProductsController();

const router = Router();

router.route('/')
  .get((req: Request, res: Response, next: NextFunction) => {
    findProductsController.findAllProducts(req, res, next);
  })
  .post(
    AuthMiddleware.validToken,
    (req: Request, res: Response, next: NextFunction) => {
      productsController.createProduct(req, res, next);
    },
  );

router.route('/:id')
  .get((req: Request, res: Response, next: NextFunction) => {
    findProductsController.findProductsById(req, res, next);
  })
  .put(
    AuthMiddleware.validToken,
    (req: Request, res: Response, next: NextFunction) => {
      productsController.updateProduct(req, res, next);
    },
  );

export default router;

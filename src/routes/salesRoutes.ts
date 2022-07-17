import {
  NextFunction, Response, Request, Router,
} from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import FindSalesController from '../modules/sales/useCases/findSales/findSalesController';
import SalesController from '../modules/sales/useCases/sale/saleController';

const findSalesController = new FindSalesController();
const salesController = new SalesController();
const router = Router();

router.route('/')
  .get(
    AuthMiddleware.validToken,
    AuthMiddleware.validRoleUserAdmin,
    (req: Request, res: Response, next: NextFunction) => {
      findSalesController.findAllSales(req, res, next);
    },
  )
  .post(
    AuthMiddleware.validToken,
    AuthMiddleware.getUserIdToken,
    (req: Request, res: Response, next: NextFunction) => {
      salesController.createSales(req, res, next);
    },
  );

router.route('/:id')
  .get(
    AuthMiddleware.validToken,
    AuthMiddleware.validRoleUserAdmin,
    (req: Request, res: Response, next: NextFunction) => {
      findSalesController.findSalesById(req, res, next);
    },
  )
  .delete(
    AuthMiddleware.validToken,
    (req: Request, res: Response, next: NextFunction) => {
      salesController.deleteSales(req, res, next);
    },
  );

export default router;

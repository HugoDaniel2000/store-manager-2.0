import {
  NextFunction, Response, Request, Router,
} from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import FindSalesController from '../modules/sales/useCases/findSales/findSalesController';

const findSalesController = new FindSalesController();

const router = Router();

router.route('/')
  .get(
    // AuthMiddleware.validRoleUserAdmin,
    (req: Request, res: Response, next: NextFunction) => {
      findSalesController.findAllSales(req, res, next);
    },
  );

router.route('/:id')
  .get(
    AuthMiddleware.validRoleUserAdmin,
    (req: Request, res: Response, next: NextFunction) => {
      findSalesController.findSalesById(req, res, next);
    },
  );

export default router;

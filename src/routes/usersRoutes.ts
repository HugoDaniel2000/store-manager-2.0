import {
  NextFunction, Response, Request, Router,
} from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import UserMiddleware from '../middlewares/userMiddleware';

import UserController from '../modules/users/useCases/user/userController';

const userController = new UserController();
const router = Router();

router.route('/')
  .post(
    UserMiddleware.validateUser,
    (req: Request, res: Response, next: NextFunction) => {
      userController.createUser(req, res, next);
    },
  );

router.route('/:id').put(
  AuthMiddleware.validToken,
  (req, res, next) => {
    userController.updateUser(req, res, next);
  },
);

export default router;

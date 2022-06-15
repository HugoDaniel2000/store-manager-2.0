import {
  NextFunction, Response, Request, Router,
} from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import UserCreateMiddleware from '../middlewares/userCreateMiddleware';
import UserUpdateMiddleware from '../middlewares/userUpdateMiddleware';

import UserController from '../modules/users/useCases/user/userController';

const userController = new UserController();
const router = Router();

router.route('/')
  .post(
    UserCreateMiddleware.validateUser,
    (req: Request, res: Response, next: NextFunction) => {
      userController.createUser(req, res, next);
    },
  );

router.route('/:id').put(
  UserUpdateMiddleware.validateUser,
  AuthMiddleware.validToken,
  (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res, next);
  },
);

export default router;

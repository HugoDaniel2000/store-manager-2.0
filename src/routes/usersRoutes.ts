import {
  NextFunction, Response, Request, Router,
} from 'express';

import UserController from '../modules/users/useCases/user/userController';
import FindUserController from '../modules/users/useCases/findUser/findUserController';

import AuthMiddleware from '../middlewares/authMiddleware';
import UserCreateMiddleware from '../middlewares/userCreateMiddleware';
import UserUpdateMiddleware from '../middlewares/userUpdateMiddleware';

const userController = new UserController();
const findUserController = new FindUserController();
const router = Router();

router.route('/')
  .get(
    (req: Request, res: Response, next: NextFunction) => {
      findUserController.findAllUsers(req, res, next);
    },
  )
  .post(
    UserCreateMiddleware.validateUser,
    (req: Request, res: Response, next: NextFunction) => {
      userController.createUser(req, res, next);
    },
  );

router.route('/:id')
  .get((req: Request, res: Response, next: NextFunction) => {
    findUserController.findUserById(req, res, next);
  })
  .put(
    UserUpdateMiddleware.validateUser,
    AuthMiddleware.validToken,
    AuthMiddleware.validRoleUser,
    (req: Request, res: Response, next: NextFunction) => {
      userController.updateUser(req, res, next);
    },
  )
  .delete(
    AuthMiddleware.validToken,
    AuthMiddleware.validRoleUser,
    (req: Request, res: Response, next: NextFunction) => {
      userController.deleteUser(req, res, next);
    },
  );

export default router;

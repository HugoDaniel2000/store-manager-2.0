import { Router } from 'express';
// import LoginMiddleware from '../middlewares/loginMiddleware';

import UserController from '../modules/users/useCases/user/userController';

const userController = new UserController();
const router = Router();

router.route('/')
  .post(
    (req, res, next) => {
      userController.createUser(req, res, next);
    },
  );

export default router;

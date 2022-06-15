import { Router } from 'express';
import LoginMiddleware from '../middlewares/loginMiddleware';

import LoginUserController from '../modules/users/useCases/loginUser/loginUserController';

const loginController = new LoginUserController();
const router = Router();

router.route('/')
  .post(
    LoginMiddleware.validateEmail,
    LoginMiddleware.validatePassword,
    (req, res, next) => {
      loginController.login(req, res, next);
    },
  );

export default router;

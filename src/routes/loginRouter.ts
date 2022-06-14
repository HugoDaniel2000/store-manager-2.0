import { Router } from 'express';

import LoginUserController from '../modules/users/useCases/loginUser/loginUserController';

const loginController = new LoginUserController();
const router = Router();

router.route('/')
  .post((req, res, next) => {
    loginController.login(req, res, next);
  });

export default router;

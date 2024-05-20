import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/validations';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post(
  '/login',
  Validations.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);

usersRouter.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => usersController.getRole(req, res),
);

export default usersRouter;

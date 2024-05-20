import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', (req: Request, res: Response) => usersController.login(req, res));

usersRouter.get('/role', (req: Request, res: Response) => usersController.getRole(req, res));

export default usersRouter;

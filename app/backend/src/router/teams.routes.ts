import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

// const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => TeamsController.getAllController(req, res));
router.get('/:id', (req: Request, res: Response) => TeamsController.getByIdController(req, res));

export default router;

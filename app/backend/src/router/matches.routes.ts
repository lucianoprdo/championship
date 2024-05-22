import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.insertNewMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;

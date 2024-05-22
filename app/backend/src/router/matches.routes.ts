import { NextFunction, Request, Response, Router } from 'express';
import Validations from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchesController.getAllMatches(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.insertNewMatch(req, res, next),
);

router.patch('/:id', Validations.validateToken, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;

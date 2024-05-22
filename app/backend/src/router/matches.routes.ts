<<<<<<< HEAD
import { NextFunction, Request, Response, Router } from 'express';
import Validations from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';
=======
import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import MatchesController from '../controller/MatchesController';
>>>>>>> e08911d (refactor: matches routes and endpoint /matches)

const matchesController = new MatchesController();

const router = Router();

<<<<<<< HEAD
router.get('/', (req: Request, res: Response) =>
  matchesController.getAllMatches(req, res),
=======
router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
>>>>>>> e08911d (refactor: matches routes and endpoint /matches)
);

router.post(
  '/',
  Validations.validateToken,
<<<<<<< HEAD
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.insertNewMatch(req, res, next),
);

router.patch('/:id', Validations.validateToken, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res),
=======
  (req: Request, res: Response) => matchesController.insertNewMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
>>>>>>> e08911d (refactor: matches routes and endpoint /matches)
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;

import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeLeaderBoard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAwayLeaderBoard(req, res),
);

export default router;

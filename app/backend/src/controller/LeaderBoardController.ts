import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoard {
  constructor(
    private leaderBoardService: LeaderBoardService = new LeaderBoardService(),
  ) {}

  public async getHomeLeaderBoard(req: Request, res: Response): Promise<void> {
    const leaderBoard = await this.leaderBoardService.getHomeLeaderBoard();
    res.status(200).json(leaderBoard);
  }

  public async getAwayLeaderBoard(req: Request, res: Response): Promise<void> {
    const leaderBoard = await this.leaderBoardService.getAwayLeaderBoard();
    res.status(200).json(leaderBoard);
  }
}

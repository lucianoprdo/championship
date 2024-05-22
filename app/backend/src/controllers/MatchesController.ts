import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const { status, data } = await this.matchesService.getAllMatches(
        inProgress as string | null,
      );
      const code = mapStatusHTTP(status);
      return res.status(code).json(data);
    } catch (error) {
      console.error('Failed to get matches:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.matchesService.finishMatch(id);
    return res.status(200).json(result.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const match = req.body;
    const result = await this.matchesService.updateMatch(id, match);
    return res.status(200).json(result.data);
  }

  public async insertNewMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const match = req.body;

      if (match.homeTeamId === match.awayTeamId) {
        return res.status(422).json({
          message: 'It is not possible to create a match with two equal teams',
        });
      }

      const { status, data } = await this.matchesService.insertNewMatch(match);

      const statusCode =
        status === 'CREATED' ? 201 : status === 'NOT_FOUND' ? 404 : 422;
      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

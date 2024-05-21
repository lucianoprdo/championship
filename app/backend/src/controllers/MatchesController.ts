import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const { status, data } = await this.matchesService.getAllMatches(
        inProgress as string,
      );

      const code = mapStatusHTTP(status);

      return res.status(code).json(data);
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

  public async insertNewMatch(req: Request, res: Response): Promise<Response> {
    const match = req.body;
    const result = await this.matchesService.insertNewMatch(match);
    return res
      .status(result.status === 'CREATED' ? 201 : 400)
      .json(result.data);
  }
}

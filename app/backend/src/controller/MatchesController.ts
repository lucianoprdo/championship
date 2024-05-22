import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const { status, data } = await this.matchesService.getAllMatches(inProgress as string);

      const code = mapStatusHTTP(status);

      return res.status(code).json(data);
    }

    const { status, data } = await this.matchesService.getAllMatches(null);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishMatch(id);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateMatch(id, req.body);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }

  public async insertNewMatch(req: Request, res: Response) {
    const { status, data } = await this.matchesService.insertNewMatch(req.body);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }
}

import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService: TeamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.teamsService.getById(Number(id));

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }
}

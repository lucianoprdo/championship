import { Request, Response } from 'express';
import teamsService from '../services/TeamsService';

async function getAllTeamsController(_req: Request, res: Response) {
  const serviceTeams = await teamsService.getAllTeams();
  return res.status(serviceTeams.status).json(serviceTeams.data);
}

export default {
  getAllTeamsController,
};

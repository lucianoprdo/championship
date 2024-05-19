import { Request, Response } from 'express';
import teamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAllController(_req: Request, res: Response) {
  const { status, data } = await teamsService.getAllService();

  const codeStatus = mapStatusHTTP(status);

  return res.status(codeStatus).json(data);
}

async function getByIdController(req: Request, res: Response) {
  const { id } = req.params;

  const { status, data } = await teamsService.findByIdService(Number(id));

  const codeStatus = mapStatusHTTP(status);

  return res.status(codeStatus).json(data);
}

export default {
  getAllController,
  getByIdController,
};

import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const getAllMatches = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const service = new MatchesService();
  const { status, data } = await service.getAllMatches();

  return res.status(Number(status)).json(data);
};

export default {
  getAllMatches,
};

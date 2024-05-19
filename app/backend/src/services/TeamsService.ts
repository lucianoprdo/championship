import TeamsModel, { TeamsSequelizeModel } from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

async function getAllTeams(): Promise<ServiceResponse<TeamsSequelizeModel[]>> {
  const teamsDb = await TeamsModel.findAll();
  return { status: 200, data: teamsDb };
}

export default {
  getAllTeams,
};

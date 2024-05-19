import TeamsModel, { TeamsSequelizeModel } from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

async function getAllService(): Promise<
ServiceResponse<TeamsSequelizeModel[]>
> {
  const teamsDb = await TeamsModel.findAll();
  return { status: 'SUCCESSFUL', data: teamsDb };
}

async function findByIdService(
  id: number,
): Promise<ServiceResponse<TeamsSequelizeModel | null>> {
  const teamsIdDb = await TeamsModel.findByPk(Number(id));

  return { status: 'SUCCESSFUL', data: teamsIdDb };
}

export default {
  getAllService,
  findByIdService,
};

import { ITeams } from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();

    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findById(id);

    return { status: 'SUCCESSFUL', data: team };
  }
}

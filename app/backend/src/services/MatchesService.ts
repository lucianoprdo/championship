import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllMatches(inProgress: string | null): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) {
      const matches = await this.matchesModel.findAllInProgress(inProgress);
      return { status: 'SUCCESSFUL', data: matches };
    }

    const matches = await this.matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: string): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: string,
    match: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatch(id, match);

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async insertNewMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const homeTeam = await this.teamsModel.findById(match.homeTeamId);
    const awayTeam = await this.teamsModel.findById(match.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    if (homeTeam.teamName === awayTeam.teamName) {
      return {
        status: 'UNABLE_TO_PROCESS',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const insertd = await this.matchesModel.create(match);

    return { status: 'CREATED', data: insertd };
  }
}

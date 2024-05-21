import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import ModelMatches from '../models/ModelMatches';
import { IMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../database/models/TeamsModel';
import ICustomError from '../Interfaces/ICustomError';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new ModelMatches(),
    private teamsModel: any = new TeamsModel(),
  ) {}

  public async getAllMatches(
    inProgress: string | null,
  ): Promise<ServiceResponse<IMatch[]>> {
    try {
      const matches = inProgress !== null
        ? await this.matchesModel.findAllInProgress(inProgress)
        : await this.matchesModel.findAll();

      return { status: 'SUCCESSFUL', data: matches };
    } catch (error) {
      const customError: ICustomError = new Error('Failed to fetch matches');
      customError.statusCode = 500;
      throw customError;
    }
  }

  public async finishMatch(
    id: string,
  ): Promise<ServiceResponse<{ message: string }>> {
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
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    if (homeTeam.teamName === awayTeam.teamName) {
      return {
        status: 'UNABLE_TO_PROCESS',
        data: {
          message: 'It is not possible to create a match with two equal teams',
        },
      };
    }

    const inserted = await this.matchesModel.create(match);
    return { status: 'CREATED', data: inserted };
  }
}

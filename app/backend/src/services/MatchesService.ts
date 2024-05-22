import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import ModelMatches from '../models/ModelMatches';
import { IMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsService from './TeamsService';
import ICustomError from '../Interfaces/ICustomError';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new ModelMatches()) {}

  public async getAllMatches(
    inProgress: string | null,
  ): Promise<ServiceResponse<IMatch[]>> {
    try {
      if (inProgress) {
        const matches = await this.matchesModel.findAllInProgress(inProgress);
        return { status: 'SUCCESSFUL', data: matches };
      }

      const matches = await this.matchesModel.findAll();

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

  public async insertNewMatch(match: IMatch): Promise<any> {
    const homeTeam = await TeamsService.findByIdService(
      match.homeTeamId,
    ) as any;
    const awayTeam = await TeamsService.findByIdService(
      match.awayTeamId,
    ) as any;

    if (!homeTeam || !awayTeam) {
      return {
        status: 404,
        data: { message: 'There is no team with such id!' },
      };
    }

    const inserted = await this.matchesModel.create(match);
    return { status: 'CREATED', data: inserted };
  }
}

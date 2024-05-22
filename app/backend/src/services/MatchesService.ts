import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
<<<<<<< HEAD
import TeamsService from './TeamsService';
import ICustomError from '../Interfaces/ICustomError';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new ModelMatches()) {}
=======
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}
>>>>>>> e08911d (refactor: matches routes and endpoint /matches)

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

  public async insertNewMatch(match: IMatch): Promise<any> {
    const homeTeam = await TeamsService.findByIdService(
      match.homeTeamId,
    ) as any;
    const awayTeam = await TeamsService.findByIdService(
      match.awayTeamId,
    ) as any;

    if (!homeTeam || !awayTeam) {
<<<<<<< HEAD
      return {
        status: 404,
        data: { message: 'There is no team with such id!' },
      };
    }

    const inserted = await this.matchesModel.create(match);
    return { status: 'CREATED', data: inserted };
=======
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    if (homeTeam.teamName === awayTeam.teamName) {
      return {
        status: 'UNABLE_TO_PROCESS',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const insertd = await this.matchesModel.create(match);

    return { status: 'CREATED', data: insertd };
>>>>>>> e08911d (refactor: matches routes and endpoint /matches)
  }
}

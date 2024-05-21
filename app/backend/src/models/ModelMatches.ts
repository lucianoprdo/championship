import MatchesModel from '../database/models/MatchesModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import TeamsModel from '../database/models/TeamsModel';

export default class ModelMatches implements IMatchesModel {
  private model = MatchesModel;
  private mappingBoolean: Record<string, number> = { true: 1, false: 0 };

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamsModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamsModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches.map((match) => ({
      ...match.dataValues,
      inProgress: !!match.dataValues.inProgress, // Convertendo inProgress para boolean
    }));
  }

  public async findAllInProgress(inProgress: string): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: this.mappingBoolean[inProgress] },
      include: [
        { model: TeamsModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamsModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches.map((match) => ({
      ...match.dataValues,
      inProgress: !!match.dataValues.inProgress, // Convertendo inProgress para boolean
    }));
  }

  public async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id, {
      include: [
        { model: TeamsModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamsModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });

    return match
      ? { ...match.dataValues, inProgress: !!match.dataValues.inProgress } // Convertendo inProgress para boolean
      : null;
  }

  public async finishMatch(id: string): Promise<void> {
    await this.model.update({ inProgress: 0 }, { where: { id } });
  }

  public async updateMatch(
    id: string,
    match: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<void> {
    await this.model.update(match, { where: { id } });
  }

  public async create(match: IMatch): Promise<IMatch> {
    const inserted = await this.model.create({ ...match, inProgress: 1 });
    return {
      ...inserted.dataValues,
      inProgress: !!inserted.dataValues.inProgress,
    }; // Convertendo inProgress para boolean
  }
}

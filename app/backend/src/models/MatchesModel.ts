import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  private booleanMap: Record<string, number> = { true: 1, false: 0 };

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, attributes: ['teamName'], as: 'homeTeam' },
        { model: SequelizeTeams, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches.map((match) => match.dataValues);
  }

  public async findAllInProgress(inProgress: string): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: this.booleanMap[inProgress] },
      include: [
        { model: SequelizeTeams, attributes: ['teamName'], as: 'homeTeam' },
        { model: SequelizeTeams, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches.map((match) => match.dataValues);
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
    return inserted.dataValues;
  }

  public async findById(id: number): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    return match?.dataValues || null;
  }
}

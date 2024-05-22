import { Sequelize } from 'sequelize';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { subQuerieTotalDraws, subQuerieTotalLosses, subQuerieTotalVictories } from './queries';
import { IGamesStatistics, IGoalsStatistics } from '../Interfaces/leaderBoard/ILeaderBoard';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;
  private modelMatches = SequelizeMatches;
  private otherTeamMap: Record<string, string> = { home: 'away', away: 'home' };

  public async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }

  public async getGamesStatistics(homeOrAway: string): Promise<IGamesStatistics[]> {
    const otherTeam = this.otherTeamMap[homeOrAway];

    const team = await this.modelMatches.findAll({
      where: {
        inProgress: 0,
      },
      attributes: [
        [Sequelize.col(`${homeOrAway}Team.team_name`), 'name'],
        [Sequelize.fn('COUNT', Sequelize.col(`matches.${homeOrAway}_team_id`)), 'totalGames'],
        [Sequelize.literal(subQuerieTotalVictories(homeOrAway, otherTeam)), 'totalVictories'],
        [Sequelize.literal(subQuerieTotalLosses(homeOrAway, otherTeam)), 'totalLosses'],
        [Sequelize.literal(subQuerieTotalDraws(homeOrAway, otherTeam)), 'totalDraws'],
      ],
      include: [{ model: SequelizeTeams, attributes: [], as: `${homeOrAway}Team` }],
      group: [`${homeOrAway}_team_id`],
    });

    return team.map((match) => match.dataValues) as unknown as IGamesStatistics[];
  }

  public async getGolsStatistics(homeOrAway: string): Promise<IGoalsStatistics[]> {
    const otherTeam = this.otherTeamMap[homeOrAway];

    const team = await this.modelMatches.findAll({
      where: {
        inProgress: 0,
      },
      attributes: [
        [Sequelize.col(`${homeOrAway}Team.team_name`), 'name'],
        [Sequelize.fn('SUM', Sequelize.col(`matches.${homeOrAway}_team_goals`)), 'goalsFavor'],
        [Sequelize.fn('SUM', Sequelize.col(`matches.${otherTeam}_team_goals`)), 'goalsOwn'],
      ],
      include: [
        { model: SequelizeTeams, attributes: [], as: `${homeOrAway}Team` },
      ],
      group: [`${homeOrAway}_team_id`],
    });

    return team.map((match) => match.dataValues) as unknown as IGoalsStatistics[];
  }
}

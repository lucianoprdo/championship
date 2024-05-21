import { ICRUDModelReader } from '../ICRUDModel';
import { IGamesStatistics, IGoalsStatistics } from '../leaderBoard/ILeaderBoard';
import { ITeams } from './ITeams';

export type ITeamsModel = ICRUDModelReader<ITeams> & {
  getGolsStatistics(homeOrAway: string): Promise<IGoalsStatistics[]>;
  getGamesStatistics(homeOrAway: string): Promise<IGamesStatistics[]>;
};

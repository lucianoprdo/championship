import { ICRUDModelCreator, ICRUDModelReader } from '../ICRUDModel';
import { IMatch } from './IMatches';

export type IMatchesModel =
  ICRUDModelReader<IMatch>
  & ICRUDModelCreator<IMatch>
  & {
    findAllInProgress(inProgress: string): Promise<IMatch[]>;
    finishMatch(id: string): Promise<void>;
    updateMatch(id: string, match: { homeTeamGoals: number; awayTeamGoals: number }): Promise<void>;
  };

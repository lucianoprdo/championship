import IExample from '../IExample';

export interface IHomeTeam {
  homeTeamId: number;
  homeTeamGoals: number;
}

export interface IAwayTeam {
  awayTeamId: number;
  awayTeamGoals: number;
}

export interface IMatch extends IExample, IHomeTeam, IAwayTeam {
  inProgress: boolean;
}

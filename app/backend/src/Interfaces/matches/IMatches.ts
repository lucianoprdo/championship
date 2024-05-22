import { Identifiable } from '..';

export interface IHomeTeam {
  homeTeamId: number;
  homeTeamGoals: number;
}

export interface IAwayTeam {
  awayTeamId: number;
  awayTeamGoals: number;
}

export interface IMatch extends Identifiable, IHomeTeam, IAwayTeam{
  inProgress: number;
}

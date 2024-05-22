export interface ITeamName {
  name: string;
}

export interface IGoalsStatistics extends ITeamName {
  goalsFavor: number;
  goalsOwn: number;
}

export interface IGamesStatistics extends ITeamName{
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

export interface ILeaderBoard extends ITeamName, IGoalsStatistics, IGamesStatistics {
  totalPoints: number;
  goalsBalance: number;
  efficiency: string;
}

export const subQuerieTotalVictories = (homeOrAway: string, otherTeam: string) => (
  `(SELECT COUNT(*) FROM matches  
          WHERE matches.${homeOrAway}_team_goals > matches.${otherTeam}_team_goals AND
          ${homeOrAway}Team.id = matches.${homeOrAway}_team_id AND
          matches.in_progress = 0
  )`
);

export const subQuerieTotalLosses = (homeOrAway: string, otherTeam: string) => (
  `(SELECT COUNT(*) FROM matches  
          WHERE matches.${homeOrAway}_team_goals < matches.${otherTeam}_team_goals AND
          ${homeOrAway}Team.id = matches.${homeOrAway}_team_id AND
          matches.in_progress = 0
  )`
);

export const subQuerieTotalDraws = (homeOrAway: string, otherTeam: string) => (
  `(SELECT COUNT(*) FROM matches  
          WHERE matches.${homeOrAway}_team_goals = matches.${otherTeam}_team_goals AND
          ${homeOrAway}Team.id = matches.${homeOrAway}_team_id AND
          matches.in_progress = 0
          
  )`
);

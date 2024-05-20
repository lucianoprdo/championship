const allMatchesFromDB = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: 'São Paulo',
    },
    awayTeam: {
      id: 8,
      teamName: 'Grêmio',
    },
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: 'São Paulo',
    },
    awayTeam: {
      id: 9,
      teamName: 'Internacional',
    },
  },
];

const allMatchesInProgressFromDB = [
  {
    dataValues: {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        id: 16,
        teamName: 'São Paulo',
      },
      awayTeam: {
        id: 9,
        teamName: 'Internacional',
      },
    },
  },
  {
    dataValues: {
      id: 42,
      homeTeamId: 6,
      homeTeamGoals: 1,
      awayTeamId: 1,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        id: 6,
        teamName: 'Ferroviária',
      },
      awayTeam: {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
    },
  },
];

const allMatchesNotInProgressFromDB = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        id: 16,
        teamName: 'São Paulo',
      },
      awayTeam: {
        id: 8,
        teamName: 'Grêmio',
      },
    },
  },
  {
    dataValues: {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        id: 9,
        teamName: 'Internacional',
      },
      awayTeam: {
        id: 14,
        teamName: 'Santos',
      },
    },
  },
];

export default {
  allMatchesFromDB,
  allMatchesInProgressFromDB,
  allMatchesNotInProgressFromDB,
};

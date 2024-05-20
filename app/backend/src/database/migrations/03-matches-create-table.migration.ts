import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatch } from '../../Interfaces/matches/IMatches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        field: 'home_team_id',
        type: DataTypes.INTEGER,

        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'away_team_id',
      },
      awayTeamGoals: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'in_progress',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};

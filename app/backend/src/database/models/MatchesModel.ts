import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model<
InferAttributes<MatchesModel>,
InferCreationAttributes<MatchesModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

MatchesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: DataTypes.INTEGER, // Alterado aqui de boolean para integer
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: DataTypes.BOOLEAN, // Alterado aqui de integer para boolean
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    tableName: 'matches',
    sequelize: db,
    timestamps: false,
    underscored: true,
  },
);

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeGames' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayGames' });

export default MatchesModel;

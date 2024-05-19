import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { ITeams } from '../../Interfaces/teams/ITeams';

export type TeamsInputtableTypes = Optional<ITeams, 'id'>;
type TeamsSequelizeModelCreator = ModelDefined<ITeams, TeamsInputtableTypes>;
export type TeamsSequelizeModel = Model<ITeams, TeamsInputtableTypes>;

const TeamsModel: TeamsSequelizeModelCreator = db.define(
  'Teams',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default TeamsModel;

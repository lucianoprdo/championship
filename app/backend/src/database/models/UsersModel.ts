import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import { IUser } from '../../Interfaces/users/IUsers';

class UsersModel extends Model<
InferAttributes<UsersModel>,
InferCreationAttributes<UsersModel>
> implements IUser {
  declare id: CreationOptional<number>;
  declare role: string;
  declare username: string;
  declare email: string;
  declare password: string;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default UsersModel;

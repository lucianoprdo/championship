import { DataTypes, Model, QueryInterface } from 'sequelize';
import { IUsers } from '../../Interfaces/users/IUsers';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};

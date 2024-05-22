import { IUser } from '../Interfaces/users/IUser';
import { IUsersModel } from '../Interfaces/users/IUserModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;
  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return user.dataValues;
  }
}

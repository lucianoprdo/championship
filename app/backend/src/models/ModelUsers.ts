import { IUser } from '../Interfaces/users/IUsers';
import { IUsersModel } from '../Interfaces/users/IUserModel';
import UsersModel from '../database/models/UsersModel';

export default class ModelUsers implements IUsersModel {
  private model = UsersModel;

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return user.dataValues;
  }
}

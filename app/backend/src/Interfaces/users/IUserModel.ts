import { IUser } from './IUsers';

export interface IUsersModel {
  findByEmail(email: string): Promise<IUser | null>;
}

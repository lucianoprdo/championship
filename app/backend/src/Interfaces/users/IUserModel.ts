import { IUser } from './IUsers';

export type IUsersModel = {
  findByEmail(email: string): Promise<IUser | null>;
};

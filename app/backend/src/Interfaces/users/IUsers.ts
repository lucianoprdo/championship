import IExample from '../IExample';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends IExample, ILogin {
  username: string;
  role: string;
}

import * as bcrypt from 'bcryptjs';
import { IUser } from '../Interfaces/users/IUser';
import UsersModel from '../models/UsersModel';
import { IUsersModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

export default class UsersService {
  private invalidDataResponse: ServiceResponseError = {
    status: 'UNAUTHORIZED',
    data: { message: 'Invalid email or password' },
  };

  constructor(
    private usersModel: IUsersModel = new UsersModel(),
    private jwtService = JWT,
  ) {}

  public async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<IUser | { token: string }>> {
    const user = await this.usersModel.findByEmail(email);

    if (!user) return this.invalidDataResponse;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return this.invalidDataResponse;

    const token = this.jwtService.sign({ email: user.email });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.usersModel.findByEmail(email);

    return { status: 'SUCCESSFUL', data: { role: user?.role as string } };
  }
}

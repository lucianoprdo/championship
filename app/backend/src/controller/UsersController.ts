import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(
    private usersService: UsersService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { status, data } = await this.usersService.login(email, password);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }

  public async getRole(req: Request, res: Response) {
    const { email } = res.locals.auth;

    const { status, data } = await this.usersService.getRole(email);

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }
}

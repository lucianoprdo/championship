import { Request, Response, NextFunction } from 'express';
import joiValidateLogin from '../utils/joi/login';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class Validations {
  private static invalidTokenMessage = 'Token must be a valid token';

  static validateLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const { error } = joiValidateLogin(req.body);

    if (error) {
      const [status, message] = error.message.split(' | ');
      return res.status(mapStatusHTTP(status)).json({ message });
    }

    next();
  }

  static validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: Validations.invalidTokenMessage });
    }

    const validToken = JWT.verify(token);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }

    res.locals.auth = validToken;

    next();
  }
}

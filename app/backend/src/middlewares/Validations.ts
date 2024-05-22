import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';
import joiValidateLogin from '../utils/joi/login';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class Validations {
  private static invalidTokenMessage = 'Token must be a valid token';

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const { error } = joiValidateLogin(req.body);

    if (error) {
      const [status, message] = error.message.split('|');
      return res.status(mapStatusHTTP(status)).json({ message });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction):
  Response | void {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    // bearer token
    const token = req.headers.authorization.split(' ')[1]; // [ "bearer", "token" ]

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

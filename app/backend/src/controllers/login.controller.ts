import { NextFunction, Request, Response } from 'express';
import ValidateServices from '../services/validate.service';
import AuthServices from '../services/auth.service';
import UserServices from '../services/login.service';

class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body;
      await ValidateServices.validateLogin(login);
      const user = await UserServices.find(login);
      const token = AuthServices.encode(user);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw ValidateServices
          .customError('TokenNotFoundError', 'Authentication token is required');
      }
      const { role } = await ValidateServices.validateToken(token);
      res.status(200).json({ role });
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;

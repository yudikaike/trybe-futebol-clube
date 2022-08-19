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
}

export default LoginController;

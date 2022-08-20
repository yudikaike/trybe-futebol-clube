import { Request, Response } from 'express';
import { AuthService, UserService, ValidationService } from '../services';
import error from '../middlewares';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.find(email);
    if (!user || !AuthService.password(password, user.password)) {
      throw error.custom('UnauthorizedError', 'Incorrect email or password');
    }
    const token = AuthService.encode(user);
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) throw error.custom('UnauthorizedError', 'Token is required');
    const { role } = await ValidationService.token(token);
    res.status(200).json({ role });
  }
}

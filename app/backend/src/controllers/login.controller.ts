import { Request, Response } from 'express';
import { AuthService, UserService } from '../services';
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
}

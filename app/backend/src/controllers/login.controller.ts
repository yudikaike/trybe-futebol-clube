import { Request, Response } from 'express';
import AuthServices from '../services/auth.service';
import UserServices from '../services/login.service';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserServices.find({ email, password });
    const token = AuthServices.encode(user);
    res.status(200).json({ token });
  }
}

export default LoginController;

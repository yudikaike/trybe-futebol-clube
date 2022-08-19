import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import AuthServices from './auth.service';

class LoginServices {
  static async find({ email, password }: ILogin): Promise<IUser> {
    const user = await UserModel.findOne({ where: { email } });
    if (user && AuthServices.password(password, user.password)) return user;
    throw new Error('User not found');
  }
}

export default LoginServices;

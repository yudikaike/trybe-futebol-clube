import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';
import AuthServices from './auth.service';
import ValidateServices from './validate.service';

class LoginServices {
  static async find({ email, password }: ILogin): Promise<IUser> {
    const user = await UserModel.findOne({ where: { email }, raw: true });
    if (user && AuthServices.password(password, user.password)) return user;
    throw ValidateServices.customError('NotFoundError', 'Incorrect email or password');
  }
}

export default LoginServices;

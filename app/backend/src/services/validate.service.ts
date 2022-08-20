import * as Joi from 'joi';
import ILogin from '../interfaces/ILogin';
import AuthServices from './auth.service';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';

const REQUIRED_FIELD_MESSAGE = 'All fields must be filled';

class ValidateServices {
  static async validateLogin(payload: ILogin) {
    const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).messages({
      'string.empty': REQUIRED_FIELD_MESSAGE,
      'any.required': REQUIRED_FIELD_MESSAGE,
    });

    return loginSchema.validateAsync(payload);
  }

  static customError(name: string, message: string) {
    const err = new Error(message);
    err.name = name;
    return err;
  }

  static async validateToken(token: string) {
    const { data: { email } } = AuthServices.decode(token);
    const foundUser = await UserModel.findOne({ where: { email } });
    if (!foundUser) throw this.customError('UserNotFoundError', 'User not found');
    return foundUser as IUser;
  }
}

export default ValidateServices;

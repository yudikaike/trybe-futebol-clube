import * as Joi from 'joi';
import ILogin from '../interfaces/ILogin';

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

  static throwCustomError(name: string, message: string) {
    const err = new Error(message);
    err.name = name;
    throw err;
  }
}

export default ValidateServices;

import * as Joi from 'joi';
import ILogin from '../interfaces/ILogin';

class ValidateServices {
  static async validateLogin(payload: ILogin) {
    const loginSchema = Joi.object({
      email: Joi.string().required()
        .messages({
          'string.empty': 'All fields must be filled',
          'any.required': 'All fields must be filled',
        }),
      password: Joi.string(),
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

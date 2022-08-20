import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import AuthService from './auth.service';
import error from '../middlewares';
import { User } from '../interfaces';
import UserService from './user.service';

export default class ValidationService {
  static async loginBody(req: Request, _res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).messages({
      'string.empty': 'All fields must be filled',
      'any.required': 'All fields must be filled',
    });
    await schema.validateAsync(req.body);
    next();
  }

  static async token(token: string): Promise<User> {
    const { email } = AuthService.decode(token);
    const user = await UserService.find(email);
    if (!user) throw error.custom('NotFoundError', 'Invalid token');
    return user;
  }
}

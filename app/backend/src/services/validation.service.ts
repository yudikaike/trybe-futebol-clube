import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

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
}

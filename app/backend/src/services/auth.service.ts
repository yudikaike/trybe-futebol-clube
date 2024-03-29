import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import { User } from '../interfaces';

export default class AuthService {
  static password(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  static encode({ password, ...user }: User): string {
    return jwt.sign({ ...user }, process.env.JWT_SECRET || 'jwt_secret');
  }

  static decode(token: string): User {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as User;
    } catch (error: any) {
      error.message = 'Token must be a valid token';
      throw error;
    }
  }
}

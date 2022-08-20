import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
import IUser from '../interfaces/IUser';

class AuthServices {
  static password(password: string, loginPassword: string) {
    return bcrypt.compareSync(password, loginPassword);
  }

  static encode(payload: IUser) {
    const { password, ...restOfUser } = payload;
    const token = jwt.sign({ data: restOfUser }, process.env.JWT_SECRET || 'jwt_secret', {
      expiresIn: '15m',
      algorithm: 'HS256',
    });
    return token;
  }

  static decode(token: string): jwt.JwtPayload {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return user as jwt.JwtPayload;
  }
}

export default AuthServices;
